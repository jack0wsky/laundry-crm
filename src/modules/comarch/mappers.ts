import {
  ComarchCustomer,
  ComarchCustomerReadModel,
} from "@/modules/comarch/types";

export const mapComarchCustomerToComarchCustomerReadModel = (
  customers: ComarchCustomer[],
): ComarchCustomerReadModel[] => {
  return customers.map((customer) => ({
    id: customer.Id,
    name: customer.Name,
    countryCode: customer.CountryCode,
    customerTaxNumber: customer.CustomerTaxNumber,
    customerCode: customer.CustomerCode,
    mail: customer.Mail,
    phoneNumber: customer.PhoneNumber,
    customerType: customer.CustomerType,
    address: {
      street: customer.Address.Street,
      buildingNumber: customer.Address.BuildingNumber,
      flatNumber: customer.Address.FlatNumber,
      city: customer.Address.City,
      postalCode: customer.Address.PostalCode,
      id: customer.Address.Id,
    },
    customerStatus: customer.CustomerStatus,
  }));
};
