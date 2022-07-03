import Dexie from "dexie";
import {
  AbhyasiCheckinData,
  CheckinEmailOrMobileUserData,
} from "widgets/BhandaraCheckin/types";

class CheckinsDb extends Dexie {
  abhyasiIdCheckins!: Dexie.Table<AbhyasiCheckinData, number>;
  otherCheckins!: Dexie.Table<CheckinEmailOrMobileUserData, number>;
  constructor() {
    super("CheckinsDb");
    this.version(1).stores({
      abhyasiIdCheckins: "++id",
      otherCheckins: "++id",
    });
  }
}

export const db = new CheckinsDb();
