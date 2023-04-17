import dayjs from "dayjs";

export const isInThePast = (date) => {
  if (dayjs(date).isBefore(Date.now())) return true;
  return false;
};
