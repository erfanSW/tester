interface ChartData {
  x: number;
  y: number;
  r: number;
}

export function options(data:ChartData[]): object {
  return {
    datasets: [
      {
        label: "آزمایش",
        backgroundColor: "green",
        borderWidth: 1,
        data
      }
    ]
  };
}
