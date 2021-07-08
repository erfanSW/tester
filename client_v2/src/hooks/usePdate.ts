function usePdate() {
  const castToPersianDate = function (date: Date): string {
    return new Date(date).toLocaleString('fa-ir');
  };
  const formattedPersianDateTime = function (date: Date): string {
    return castToPersianDate(date).split('،').reverse().join(' - ');
  };
  const formattedPersianDate = function (date: Date): string {
    return castToPersianDate(date).split('،')[0];
  };
  const formattedPersianTime = function (date: Date): string {
    return castToPersianDate(date).split('،')[1];
  };

  const diffDate = function (date: Date) {
    const normalizedDate: Date = new Date(date);
    const now: Date = new Date();
    const diffMs: number = now.getTime() - normalizedDate.getTime();
    const diffSecond: number = diffMs / 1000;
    const diffMin: number = diffSecond / 60;
    const diffHour: number = diffMin / 60;
    const diffDay: number = diffHour / 24;
    return { diffMs, diffSecond, diffMin, diffHour, diffDay };
  };

  const diffDateText = function (date: Date):string {
    const { diffSecond, diffMin, diffHour, diffDay } = diffDate(date);
    if (diffSecond < 60) {
      return `${Math.floor(diffSecond)} ثانیه قبل`;
    }
    if (diffMin < 60) {
      return `${Math.floor(diffMin)} دقیقه قبل`;
    }
    if (diffHour < 24) {
      return `${Math.floor(diffHour)} ساعت قبل`;
    }
    return `${Math.floor(diffDay)} روز قبل`;
  };

  return {
    castToPersianDate,
    formattedPersianDateTime,
    formattedPersianDate,
    formattedPersianTime,
    diffDate,
    diffDateText,
  };
}

export { usePdate };
