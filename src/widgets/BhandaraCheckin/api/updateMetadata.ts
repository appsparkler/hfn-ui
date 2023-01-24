import { CheckinTypesEnum } from "@hfn-checkins/types";
import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
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

const getMetaCountSnapshot = async (): Promise<
  DocumentSnapshot<ICheckinsMetaData>
> => {
  const metaCountDoc = doc(
    firestoreDb,
    `${FirestoreCollections.META}/count`
  ) as DocumentReference<ICheckinsMetaData>;
  try {
    const snapshot = await getDoc(metaCountDoc);
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
    await setDoc(metaCountDoc, {
      ...initialMetaData,
    });
    const snapshot = await getDoc(metaCountDoc);
    return snapshot;
  }
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
    // get the document
    // if it exists, update it
    // if it doesn't exist, create it
    // update the meta-count document
    // update the checkin docs
    const metaCountSnapshot = await getMetaCountSnapshot();
    const data = await updateMetaCountDoc(metaCountSnapshot);
    return data;
  };
