export const Dates = {
  format(date: number) {
    if (!date) {
      return "-";
    }

    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date * 1000));
  },
};
