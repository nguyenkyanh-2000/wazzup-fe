import dayjs from "dayjs";

export const fDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const fDateTime = (date) => {
  return dayjs(date).format("MMM D, YYYY h:mm A");
};
