interface GroupedReport {
  name: string;
  reports: { date: string; amount: number }[];
}

export const groupReportsByProduct = (reports: any[]): GroupedReport[] => {
  let items: any[] = [];

  reports.forEach((item) => {
    const exists = items.find((i) => i.name === item.product.name);
    if (exists) {
      items = [
        ...items.filter((i) => i.name !== item.product.name),
        {
          ...exists,
          reports: [
            ...exists.reports,
            { date: item.date, amount: item.amount },
          ].sort((a, b) => a.date.localeCompare(b.date)),
        },
      ];
    } else {
      items.push({
        name: item.product.name,
        reports: [{ date: item.date, amount: item.amount }],
      });
    }
  });

  return items;
};
