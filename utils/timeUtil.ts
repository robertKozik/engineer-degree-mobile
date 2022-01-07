import { DateTime } from "luxon";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { statEntry } from "../interfaces";

enum dateAggregates {
  day = "day",
  year = "year",
  month = "month",
  hour = "hour",
  minute = "minute",
}

const formatData = (aggregate: dateAggregates, date: DateTime) => {
  const day = date.get(dateAggregates.day);
  const year = date.get(dateAggregates.year);
  const month = date.get(dateAggregates.month);
  const hour = date.get(dateAggregates.hour);
  const minutes = date.get(dateAggregates.minute);

  switch (aggregate) {
    case dateAggregates.month:
      if (day < 10) {
        return `${year}-${month}-0${day}`;
      }
      return `${year}-${month}-${day}`;
    case dateAggregates.day:
      return `${hour}:00`;
    case dateAggregates.hour: //fallthrough
    default:
      return `${hour}:${minutes}`;
  }
};

const parseArray = (dates: Array<string>): Array<DateTime> => {
  return dates.map((date) => DateTime.fromISO(date));
};

const aggregateDates = (
  dates: Array<statEntry>,
  aggregate: dateAggregates,
  type: "soil_humidity_sensor" | "temperature_sensor" | "light_sensor"
): Object => {
  const returnObj: { [key: string | number]: any } = {};
  dates.forEach((entry) => {
    if (entry.type !== type) {
      return;
    }
    const date = DateTime.fromISO(entry.inserted_at);
    const aggregateValue = formatData(aggregate, date);
    returnObj[aggregateValue] = returnObj[aggregateValue]
      ? [...returnObj[aggregateValue], entry.value]
      : [entry.value];
  });
  return returnObj;
};

const prepareForHeatmap = (aggregateDates: any) => {
  return Object.keys(aggregateDates).map((key) => ({
    date: DateTime.fromISO(key).toFormat("yyyy-MM-dd"),
    count:
      aggregateDates[key].reduce(
        (prev: number, curr: number) => prev + curr,
        0
      ) / aggregateDates[key]?.length,
  }));
};

const prepareForLineChart = (aggregatedDates: object): LineChartData => {
  return {
    labels: Object.keys(aggregatedDates).slice(0, 8),
    datasets: [
      {
        data: Object.values(aggregatedDates)
          .map(
            (arr) =>
              arr.reduce((prev: number, curr: number) => prev + curr, 0) /
              arr?.length
          )
          .slice(0, 8),
      },
    ],
  };
};

export {
  parseArray,
  aggregateDates,
  prepareForLineChart,
  dateAggregates,
  prepareForHeatmap,
};
