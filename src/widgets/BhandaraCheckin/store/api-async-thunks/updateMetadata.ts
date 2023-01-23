import { BhandaraCheckinAPIs } from "widgets/BhandaraCheckin/types";

export const updateMetadata: BhandaraCheckinAPIs["updateMetadata"] =
  async () => {
    return {
      abhyasiIdCheckins: 0,
      emailOrMobileCheckins: 0,
      QRCodeCheckins: 0,
      totalCheckins: 0,
    };
  };
