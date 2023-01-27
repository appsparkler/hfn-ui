import { CheckinTypesEnum } from "@hfn-checkins/types";
import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  runTransaction,
  Transaction,
  updateDoc,
  where,
} from "firebase/firestore";
import { reduce } from "lodash/fp";
import { checkinsCollection, firestoreDb } from "../firebase";
import {
  BhandaraCheckinAPIs,
  FirestoreCollections,
  ICheckinsMetaData,
} from "../types";

const UPDATED_IN_REPORT = "updatedInReport";

const getMetaCountSnapshotWithTransaction = async (
  transaction: Transaction
): Promise<DocumentSnapshot<ICheckinsMetaData>> => {
  const metaCountDoc = doc(
    firestoreDb,
    `${FirestoreCollections.META}/count`
  ) as DocumentReference<ICheckinsMetaData>;
  const snapshot = await transaction.get(metaCountDoc);
  try {
    if (!snapshot.exists()) throw new Error("meta/count doc doesn't exist");
    return snapshot;
  } catch (error) {
    const errorRef = error as Error;
    console.log(errorRef.message);
    const initialMetaData: ICheckinsMetaData = {
      totalCheckins: 0,
      emailOrMobileCheckins: 0,
      QRCodeCheckins: 0,
      abhyasiIdCheckins: 0,
    };
    await transaction.set(metaCountDoc, {
      ...initialMetaData,
    });
    return snapshot;
  }
};

const getCheckinsDocsNotUpdatedInReportSnapshot = async () => {
  const whereMetaIsNotUpdated = where(UPDATED_IN_REPORT, "!=", true);
  const query_ = query(checkinsCollection, whereMetaIsNotUpdated);
  const checkinDocsSnapshot = (await getDocs(query_)) as QuerySnapshot<{
    type: CheckinTypesEnum;
    [UPDATED_IN_REPORT]: boolean;
    updatedInReportOnce: boolean;
  }>;
  return checkinDocsSnapshot;
};

interface IPropsInEveryCheckinDoc {
  type: CheckinTypesEnum;
  updatedInReportOnce: boolean;
  updatedInReport: boolean;
}

const updateMetaCountDocTransaction = async (
  checkinDocs: QuerySnapshot<IPropsInEveryCheckinDoc>,
  metaCountDocSnapshot: DocumentSnapshot<ICheckinsMetaData>,
  transaction: Transaction
) => {
  // get checkins that have updatedInReport = false
  // get updated meta count doc with this query
  // update the meta count doc
  const updatedMetaCountDoc = reduceCheckinsToMetaData(
    metaCountDocSnapshot.data()!
  )(checkinDocs.docs.map((doc) => doc.data()));
  const metaCountDocRef = doc(
    firestoreDb,
    `${FirestoreCollections.META}/count`
  ) as DocumentReference<ICheckinsMetaData>;
  transaction.set(metaCountDocRef, { ...updatedMetaCountDoc });
};

const setCheckinDocsWithTransaction = async (
  checkinDocs: QuerySnapshot<IPropsInEveryCheckinDoc>,
  transaction: Transaction
) => {
  await checkinDocs.docs.map((doc) => {
    return transaction.set(
      doc.ref,
      { updatedInReport: true, updatedInReportOnce: true },
      { merge: true }
    );
  });
};

const getMetaCountData = async (): Promise<ICheckinsMetaData> => {
  const docRef = doc(firestoreDb, `${FirestoreCollections.META}/count`);
  const metaCountDoc = await getDoc(docRef);
  return metaCountDoc.data() as ICheckinsMetaData;
};

const runUpdateAndGetMetadataTransaction =
  async (): Promise<ICheckinsMetaData> =>
    new Promise(async (resolve, reject) => {
      const checkinDocs = await getCheckinsDocsNotUpdatedInReportSnapshot();
      await runTransaction(firestoreDb, async (transaction) => {
        // get meta-count doc (if it doesn't exist; create it and get it)
        // get the checkin-docs that have updatedInReport = false
        // update the count doc by getting information from checkin-docs
        // set the checkins docs with merge
        // return the updated meta count doc
        const metaCountDocSnapshot = await getMetaCountSnapshotWithTransaction(
          transaction
        );
        await updateMetaCountDocTransaction(
          checkinDocs,
          metaCountDocSnapshot,
          transaction
        );
        await setCheckinDocsWithTransaction(checkinDocs, transaction);
        const metaCountData = await getMetaCountData();
        // return metaCountDoc.data()
        return metaCountData;
      });
    });

// const getMetaCountSnapshot = async (): Promise<
//   DocumentSnapshot<ICheckinsMetaData>
// > => {
//   const metaCountDoc = doc(
//     firestoreDb,
//     `${FirestoreCollections.META}/count`
//   ) as DocumentReference<ICheckinsMetaData>;
//   try {
//     const snapshot = await getDoc(metaCountDoc);
//     if (!snapshot.exists()) throw new Error("meta/count doc doesn't exist");
//     return snapshot;
//   } catch (error) {
//     const errorRef = error as Error;
//     console.log(errorRef.message);
//     const initialMetaData: ICheckinsMetaData = {
//       totalCheckins: 0,
//       emailOrMobileCheckins: 0,
//       QRCodeCheckins: 0,
//       abhyasiIdCheckins: 0,
//     };
//     await setDoc(metaCountDoc, {
//       ...initialMetaData,
//     });
//     const snapshot = await getDoc(metaCountDoc);
//     return snapshot;
//   }
// };

const reduceCheckinsToMetaData = reduce<
  { type: CheckinTypesEnum; updatedInReportOnce?: boolean },
  ICheckinsMetaData
>((acc, doc) => {
  if (doc.updatedInReportOnce) return acc;
  switch (doc.type) {
    case CheckinTypesEnum.AbhyasiId:
      return {
        ...acc,
        abhyasiIdCheckins: acc.abhyasiIdCheckins + 1,
      };
    case CheckinTypesEnum.EmailOrMobile:
      return {
        ...acc,
        emailOrMobileCheckins: acc.emailOrMobileCheckins + 1,
      };
    case CheckinTypesEnum.QR:
      return {
        ...acc,
        QRCodeCheckins: acc.QRCodeCheckins + 1,
      };
  }
});

export const updateMetaCountDoc = async (
  snapshot: DocumentSnapshot<ICheckinsMetaData>
) => {
  try {
    const currentMetaCountData = snapshot.data()!;
    const whereMetaIsNotUpdated = where(UPDATED_IN_REPORT, "!=", true);
    const query_ = query(checkinsCollection, whereMetaIsNotUpdated);
    const checkinDocsSnapshot = (await getDocs(query_)) as QuerySnapshot<{
      type: CheckinTypesEnum;
      [UPDATED_IN_REPORT]: boolean;
      updatedInReportOnce: boolean;
    }>;
    const checkins = checkinDocsSnapshot.docs.map((doc) => doc.data());
    const updatedCheckins =
      reduceCheckinsToMetaData(currentMetaCountData)(checkins);
    await updateDoc(snapshot.ref, updatedCheckins);

    // Update the checkin docs
    const promisesToUpdateCheckinDocs = checkinDocsSnapshot.docs.map(
      async (doc) => {
        await updateDoc(doc.ref, {
          [UPDATED_IN_REPORT]: true,
          updatedInReportOnce: true,
        });
      }
    );
    await Promise.all(promisesToUpdateCheckinDocs);

    return updatedCheckins;
  } catch (error) {
    console.log(error);
    return {} as ICheckinsMetaData;
  }
};

export const updateMetadata: BhandaraCheckinAPIs["updateMetadata"] =
  async () => {
    const updatedMetaData = await runUpdateAndGetMetadataTransaction();
    return updatedMetaData;
    // get the document
    // if it exists, update it
    // if it doesn't exist, create it
    // update the meta-count document
    // update the checkin docs
    // const metaCountSnapshot = await getMetaCountSnapshot();
    // const data = await updateMetaCountDoc(metaCountSnapshot);
    // return data;
  };
