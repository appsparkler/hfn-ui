export interface CheckinsAggregateData {
  emailOrMobileCheckin: number;
  abhyasiIdCheckin: number;
  city: Record<string, number>;
  state: Record<string, number>;
  country: Record<string, number>;
  checkinsWithEmail: number;
  checkinsWithMobile: number;
  male: number;
  female: number;
  unspecified: number;
}
