import { getEnv } from "../utils";

export const FirestoreCollections = {
  ABHYASI_ID_CHECKINS: "abhyasiId-checkins",
  OTHER_CHECKINS: "other-checkins",
  CHECKINS: `checkins-${getEnv().NODE_ENV}`,
};

export enum CheckinTypesEnum {
  AbhyasiId = "AbhyasiId",
  EmailOrMobile = "EmailOrMobile",
}
