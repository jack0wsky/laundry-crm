export const routes = {
  hotelDetails: {
    getPath: (laundryId: string, hotelId: string) => `/${laundryId}/${hotelId}`,
  },
  turnovers: {
    getPath: (laundryId: string) => `/${laundryId}/turnovers`,
  },
  customers: {
    getPath: (laundryId: string) => `/${laundryId}/customers`,
  },
};
