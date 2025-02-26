export type TimesUnit =
  | "days"
  | "months"
  | "years"
  | "minutes"
  | "hours"
  | "seconds";

const plural = (value: number, unit: TimesUnit) => {
  const val = Number.isInteger(value) ? value : value.toFixed(1);
  return value > 1 ? val + ` ${unit}` : val + ` ${unit.slice(0, -1)}`;
};

export const Times = {
  toSeconds(value: number, unit: TimesUnit) {
    let val = value;
    /* eslint-disable no-fallthrough */
    switch (unit) {
      // @ts-expect-error - We don't want to break
      case "years":
        val *= 365;
      // @ts-expect-error - We don't want to break
      case "months":
        val *= 30;
      // @ts-expect-error - We don't want to break
      case "days":
        val *= 24;
      // @ts-expect-error - We don't want to break
      case "hours":
        val *= 60;
      case "minutes":
        val *= 60;
    }

    return val;
  },

  pretty(value: number) {
    let seconds = 365 * 30 * 24 * 60 * 60;
    if (value >= seconds) {
      return plural(value / seconds, "years");
    }

    seconds /= 365;
    if (value >= seconds) {
      return plural(value / seconds, "months");
    }

    seconds /= 30;
    if (value >= seconds) {
      return plural(value / seconds, "days");
    }

    seconds /= 24;
    if (value >= seconds) {
      return plural(value / seconds, "hours");
    }

    seconds /= 60;
    if (value >= seconds) {
      return plural(value / seconds, "minutes");
    }

    return plural(value, "seconds");
  },

  unit(value: number): "months" | "days" | "hours" {
    let seconds = 30 * 24 * 60 * 60;

    if (value >= seconds) {
      return "months";
    }

    seconds /= 30;
    if (value >= seconds) {
      return "days";
    }

    return "hours";
  },

  value(unit: "hours" | "days" | "months") {
    switch (unit) {
      case "months": {
        return 30 * 24 * 60 * 60;
      }
      case "days": {
        return 24 * 60 * 60;
      }
      default: {
        return 60 * 60;
      }
    }
  },
};
