export const constructPdfFileName = (
  hotelName: string,
  month: number,
  year: number,
) => {
  return `Zestawienie_${hotelName}_${month}_${year}.pdf`;
};
