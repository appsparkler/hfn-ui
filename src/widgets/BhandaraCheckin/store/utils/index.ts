export * from "./errors";

export const getBhandaraCheckinActionName = (name: string): string =>
  `bhandara-checkin/${name}`;
