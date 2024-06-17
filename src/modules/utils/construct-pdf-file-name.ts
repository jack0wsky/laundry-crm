export const constructPdfFileName = (
  hotelName: string,
  month: number,
  year: number,
) => {
  const serializedHotelName = hotelName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return `Zestawienie_${serializedHotelName}_${month}_${year}.pdf`;
};
