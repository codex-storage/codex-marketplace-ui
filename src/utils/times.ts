export type TimesUnit =
  | "days"
  | "months"
  | "years"
  | "minutes"
  | "hours"
  | "seconds";

const plural = (value: number, unit: TimesUnit) =>
  value > 1 ? value + ` ${unit}` : value + ` ${unit.slice(0, -1)}`;

export const Times = {
  toSeconds(value: number, unit: TimesUnit) {
    let seconds = value;
    /* eslint-disable no-fallthrough */
    switch (unit) {
      // @ts-expect-error - We don't want to break
      case "years":
        seconds *= 365;
      // @ts-expect-error - We don't want to break
      case "months":
        seconds *= 30;
      // @ts-expect-error - We don't want to break
      case "days":
        seconds *= 24;
      // @ts-expect-error - We don't want to break
      case "hours":
        seconds *= 60;
      case "minutes":
        seconds *= 60;
    }

    return seconds;
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

  unit(value: number) {
    let seconds = 30 * 24 * 60 * 60;

    if (value >= seconds) {
      return "months";
    }

    seconds /= 30;
    if (value >= seconds) {
      return "days"
    }

    return "hours"
  },

  unitValue(unit: "hours" | "days" | "months") {
    switch (unit) {
      case "months": {
        return 30 * 24 * 60 * 60
      }
      case "days": {
        return 24 * 60 * 60
      }
      default: {
        return 60 * 60
      }
    }
  }
};
