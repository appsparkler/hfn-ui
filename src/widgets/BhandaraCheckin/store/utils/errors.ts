export const abhyasiNotFoundError = (abhyasiId: string) =>
  `Abhyasi with ID ${abhyasiId} not found.`;

export const serverError = () => "Server Error! Please try again in some time.";

export const abhyasiAlreadyCheckedIn = (abhyasiID: string) =>
  `Abhyasi with id ${abhyasiID} has already checked in.`;

export const userAlreadyCheckedIn = () => "User has already checked in.";
