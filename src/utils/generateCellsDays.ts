import dayjs from "dayjs";

const MINUMUM_SIZE = 5 * 18;

export function generateCellsDays() {
  const firstDay = dayjs().startOf("year");
  const today = new Date();

  const dates = [];
  let compareDate = firstDay;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  const complementDays =
    MINUMUM_SIZE - dates.length > 0
      ? Array.from({ length: MINUMUM_SIZE - dates.length })
      : [];

  return { dates, complementDays };
}
