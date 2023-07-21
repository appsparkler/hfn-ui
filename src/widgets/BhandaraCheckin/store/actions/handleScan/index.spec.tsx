import { PNRType } from "widgets/BhandaraCheckin/types";
import { getEventInfo, getPNRType } from ".";

const FREE_ACCOMODATION_TYPE_EXAMPLE =
  "96th Birth Anniversary of Pujya Shri Chariji Maharaj| Bhandara| RS-ICJF-IWJL";
const PAID_ACCOMODATION_TYPE_EXAMPLE =
  "96th Birth Anniversary of Pujya Shri Chariji Maharaj|MA-ICJM-MGSX|4461";

describe("getEventInfo", () => {
  it("should return the eventInfo for FREE ACCOMODATION", () => {
    expect(getEventInfo(FREE_ACCOMODATION_TYPE_EXAMPLE)).toEqual({
      eventName: "96th Birth Anniversary of Pujya Shri Chariji Maharaj",
      session: "Bhandara",
      pnr: "RS-ICJF-IWJL",
      pnrType: 0,
    });
  });

  it("should return the eventInfo for PAID ACCOMODATION", () => {
    expect(getEventInfo(PAID_ACCOMODATION_TYPE_EXAMPLE)).toEqual({
      eventName: "96th Birth Anniversary of Pujya Shri Chariji Maharaj",
      eventId: "4461",
      pnr: "MA-ICJM-MGSX",
      pnrType: 1,
    });
  });
});

describe("getPNRType", () => {
  it("should return type FREE_ACCOMODATION", () => {
    expect(getPNRType(FREE_ACCOMODATION_TYPE_EXAMPLE)).toEqual(
      PNRType.FREE_ACCOMODATION
    );
  });
  it("should return type PAID_ACCOMODATION", () => {
    expect(getPNRType(PAID_ACCOMODATION_TYPE_EXAMPLE)).toEqual(
      PNRType.PAID_ACCOMODATION
    );
  });
});
