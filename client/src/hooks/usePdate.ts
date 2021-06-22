function usePdate() {
  const castToPersianDate = function(date: Date): string {
    return new Date(date).toLocaleString("fa-ir");
  };
  const formattedPersianDate = function(date: Date): string {
    return castToPersianDate(date)
      .split("،")
      .reverse()
      .join(" - ");
  };

  return { castToPersianDate, formattedPersianDate };
}

export { usePdate };
