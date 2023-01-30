import { CheckinTypesEnum } from "@hfn-checkins/types";
import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  runTransaction,
  setDoc,
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

const UPDATED_IN_REPORT_ONCE = "updatedInReportOnce";

const metaCountDocRef = doc(
  firestoreDb,
  `${FirestoreCollections.META}/count`
) as DocumentReference<ICheckinsMetaData>;

const getMetaCountSnapshotWithTransaction = async (
  transaction: Transaction
): Promise<DocumentSnapshot<ICheckinsMetaData>> => {
  const metaDataCountSnapshot = await transaction.get(metaCountDocRef);
  return metaDataCountSnapshot;
};

const getCheckinsDocsNotUpdatedInReportSnapshot = async () => {
  const whereMetaIsNotUpdated = where(UPDATED_IN_REPORT, "!=", true);
  const query_ = query(checkinsCollection, whereMetaIsNotUpdated, limit(450));
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
  const metaCountDoc = await getDoc(metaCountDocRef);
  return metaCountDoc.data() as ICheckinsMetaData;
};

const ensureMetaCountDocExists = async () => {
  const metaCountDoc = await getDoc(metaCountDocRef);
  if (!metaCountDoc.exists()) {
    const initialMetaData: ICheckinsMetaData = {
      totalCheckins: 0,
      emailOrMobileCheckins: 0,
      QRCodeCheckins: 0,
      abhyasiIdCheckins: 0,
    };
    await setDoc(metaCountDocRef, { ...initialMetaData });
  }
};

const runUpdateAndGetMetadataTransaction =
  async (): Promise<ICheckinsMetaData> => {
    // get meta-count doc (if it doesn't exist; create it and get it)
    // get the checkin-docs that have updatedInReport = false
    // update the count doc by getting information from checkin-docs
    // set the checkins docs with merge
    // return the updated meta count doc
    await ensureMetaCountDocExists();
    const checkinDocs = await getCheckinsDocsNotUpdatedInReportSnapshot();
    await runTransaction(firestoreDb, async (transaction) => {
      const metaCountDocSnapshot = await getMetaCountSnapshotWithTransaction(
        transaction
      );
      await updateMetaCountDocTransaction(
        checkinDocs,
        metaCountDocSnapshot,
        transaction
      );
      await setCheckinDocsWithTransaction(checkinDocs, transaction);
    });
    const metaCountData = await getMetaCountData();
    // resolve(metaCountData);
    return metaCountData;
  };

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
          [UPDATED_IN_REPORT_ONCE]: true,
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
