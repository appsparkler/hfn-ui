import { QRUtils, QRType } from "./QRUtils";

describe("QRUtils", () => {
  const qrUtils = new QRUtils();
  const unpaidCheckin =
    "125th Birth Anniversary of Pujya Shri Babuji Maharaj - 2024| Bhandara Apr 2024| SU-IFBW-HAUD;16c43bcf-171a-4eae-9b54-d1b0f5583318|batch-2, batch-1|INSAAE769|SMITA ASHWIN DIWAN;0ee8fdc1-9864-41b8-a58d-a7d8a3c35e29|batch-2, batch-1|INAAAE478|Aakash Ashwin Shah;";
  const paidCheckins =
    "125th Birth Anniversary of Pujya Shri Babuji Maharaj - 2024|RA-IFED-NRZN|52352;\n" +
    "\n" +
    "c30b40ad-f6e5-421c-87e6-e1baa1736aab|batch-1|INRBAE160|Ravi Balla|batch_1-East-FF-AC|UB;\n" +
    "\n" +
    "c30b40ad-f6e5-421c-87e6-e1baa1736aab|batch-2|INRBAE160|Ravi Balla|batch_2-East-FF-AC|UB;";

  it("should parse QR checkins and more for paid accommodation", () => {
    const result = qrUtils.getQRCheckinsAndMore(paidCheckins);
    expect(result.checkins.length).toEqual(2);

    // first checkin
    const firstCheckin = result.checkins[0];
    expect(firstCheckin.fullName).toEqual("Ravi Balla");
    expect(firstCheckin.registrationId).toEqual(
      "c30b40ad-f6e5-421c-87e6-e1baa1736aab"
    );
    expect(firstCheckin.abhyasiId).toEqual("INRBAE160");
    expect(firstCheckin.batch).toEqual("batch-1");
    expect(firstCheckin.dormPreference).toEqual("batch_1-East-FF-AC");
    expect(firstCheckin.berthPreference).toEqual("UB");

    const secondCheckin = result.checkins[1];
    expect(secondCheckin.fullName).toEqual("Ravi Balla");
    expect(secondCheckin.registrationId).toEqual(
      "c30b40ad-f6e5-421c-87e6-e1baa1736aab"
    );
    expect(secondCheckin.abhyasiId).toEqual("INRBAE160");
    expect(secondCheckin.batch).toEqual("batch-2");
    expect(secondCheckin.dormPreference).toEqual("batch_2-East-FF-AC");
    expect(secondCheckin.berthPreference).toEqual("UB");
  });

  it("should parse QR checkins and more for unpaid accommodation", () => {
    const result = qrUtils.getQRCheckinsAndMore(unpaidCheckin);
    expect(result.checkins.length).toEqual(2);

    const firstCheckin = result.checkins[0];
    expect(firstCheckin.fullName).toEqual("SMITA ASHWIN DIWAN");
    expect(firstCheckin.registrationId).toEqual(
      "16c43bcf-171a-4eae-9b54-d1b0f5583318"
    );
    expect(firstCheckin.abhyasiId).toEqual("INSAAE769");
    expect(firstCheckin.batch).toEqual("batch-2, batch-1");
    expect(firstCheckin.dormPreference).toEqual("");
    expect(firstCheckin.berthPreference).toEqual("");

    const secondCheckin = result.checkins[1];
    expect(secondCheckin.fullName).toEqual("Aakash Ashwin Shah");
    expect(secondCheckin.registrationId).toEqual(
      "0ee8fdc1-9864-41b8-a58d-a7d8a3c35e29"
    );
    expect(secondCheckin.abhyasiId).toEqual("INAAAE478");
    expect(secondCheckin.batch).toEqual("batch-2, batch-1");
    expect(secondCheckin.dormPreference).toEqual("");
    expect(secondCheckin.berthPreference).toEqual("");
  });

  it("should determine QR type for paid accommodation", () => {
    const result = qrUtils.getQRType(paidCheckins);
    expect(result).toEqual(QRType.PAID_ACCOMMODATION);
  });

  it("should determine QR type for unpaid accommodation", () => {
    const result = qrUtils.getQRType(unpaidCheckin);
    expect(result).toEqual(QRType.OWN_ACCOMMODATION);
  });

  it("should get general details for own accommodation", () => {
    const generalDetails = qrUtils.getGeneralDetails(unpaidCheckin);
    expect(generalDetails.eventTitle).toEqual(
      "125th Birth Anniversary of Pujya Shri Babuji Maharaj - 2024"
    );
    expect(generalDetails.pnr).toEqual("SU-IFBW-HAUD");
    expect(generalDetails.orderId).toEqual("Bhandara Apr 2024");
  });

  it("should get general details for paid accommodation", () => {
    const generalDetails = qrUtils.getGeneralDetails(paidCheckins);
    expect(generalDetails.eventTitle).toEqual(
      "125th Birth Anniversary of Pujya Shri Babuji Maharaj - 2024"
    );
    expect(generalDetails.pnr).toEqual("RA-IFED-NRZN");
    expect(generalDetails.orderId).toEqual("52352");
  });

  it("should validate QR for paid accommodation", () => {
    const result = qrUtils.isQRValid(paidCheckins);
    expect(result).toBeTruthy();
  });

  it("should validate QR for unpaid accommodation", () => {
    const result = qrUtils.isQRValid(unpaidCheckin);
    expect(result).toBeTruthy();
  });
});
