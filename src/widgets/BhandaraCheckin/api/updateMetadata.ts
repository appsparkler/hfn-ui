import { CheckinTypesEnum } from "@hfn-checkins/types";
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { reduce } from "lodash/fp";
import { checkinsCollection, firestoreDb } from "../firebase";
import {
  BhandaraCheckinAPIs,
  FirestoreCollections,
  ICheckinsMetaData,
} from "../types";

export const updateMetadata: BhandaraCheckinAPIs["updateMetadata"] =
  async () => {
    const metadataDoc = doc(
      firestoreDb,
      FirestoreCollections.META
    ) as DocumentReference<ICheckinsMetaData>;

    const metaData = await getDoc(metadataDoc);
    const metaDataData: ICheckinsMetaData = metaData.data() || {
      totalCheckins: 0,
      emailOrMobileCheckins: 0,
      QRCodeCheckins: 0,
      abhyasiIdCheckins: 0,
    };
    const IS_META_UPDATED = "isMetaUpdated";
    const whereMetaIsNotUpdated = where(IS_META_UPDATED, "==", false);
    const query_ = query(checkinsCollection, whereMetaIsNotUpdated);
    const snapshot = (await getDocs(query_)) as QuerySnapshot<{
      type: CheckinTypesEnum;
    }>;
    const checkinDocs = snapshot.docs.map((doc) => doc.data());
    const reduceCheckininsToMetaData = reduce<
      { type: CheckinTypesEnum },
      ICheckinsMetaData
    >((acc, doc) => {
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
    const updatedMeta = reduceCheckininsToMetaData(metaDataData, checkinDocs);
    await setDoc(metadataDoc, updatedMeta);
    return updatedMeta;
  };
