import { CheckinAbhyasiApi } from "widgets/BhandaraCheckin/types";

let checkedInAbhyasis: string[] = [];

export const mockedCheckinAbhyasi: CheckinAbhyasiApi = (abhyasiId) =>
  new Promise((resolve, reject) => {
    checkedInAbhyasis.push(abhyasiId);
    resolve(true);
  });
