export const errorAbhyasiNotFound = (abhyasiId: string) =>
  `Abhyasi with ID ${abhyasiId.toUpperCase()} not found.`;

export const errorServer = () =>
  "Internal Server Error!  Please try again in some time.";

export const errorAbhyasiAlreadyCheckedin = (abhyasiID: string) =>
  `Abhyasi with id ${abhyasiID.toUpperCase()} has already checked in.`;

export const errorUserAlreadyCheckedIn = () => "User has already checked in.";
