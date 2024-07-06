import { eachMonthOfInterval } from "date-fns";

const START_TIME = new Date("2023-12-01");

const currentMonth = new Date();

const previousMonth = new Date(currentMonth.getTime());
previousMonth.setDate(0);

const timeline = eachMonthOfInterval({
  start: START_TIME,
  end: previousMonth,
})
  .map((date) => {
    const [month, year] = date
      .toLocaleString("en", {
        month: "numeric",
        year: "numeric",
      })
      .split("/");
    return {
      month,
      year: Number(year),
    };
  })
  .sort((a, b) => (a.year > b.year ? -1 : 1));

export interface Timeline {
  year: number;
  months: number[];
}

export const groupMonthsByYears = () => {
  return timeline.reduce<Timeline[]>((acc, value) => {
    if (acc.findIndex((item) => item.year === value.year) === -1) {
      acc = [...acc, { year: value.year, months: [] }];
    }

    acc[acc.findIndex((item) => item.year === value.year)].months.push(
      Number(value.month),
    );
    return acc;
  }, []);
};
