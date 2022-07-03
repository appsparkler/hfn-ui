let checkedInAbhyasis: string[] = [];

interface CheckinAbhyasiApi {
  (abhyasiId: string): Promise<boolean>;
}

export const checkinAbhyasi: CheckinAbhyasiApi = (abhyasiId) =>
  new Promise((resolve, reject) => {
    checkedInAbhyasis.push(abhyasiId);
    resolve(true);
  });
