using my.psm as my from '../db/schema';

service CatalogService {

  entity Suppliers as projection on my.Suppliers;
  entity Products  as projection on my.Products;
  entity Orders    as projection on my.Orders;

  action orderSubmit(
    productID : UUID,
    quantity  : Integer
  ) returns String;
}