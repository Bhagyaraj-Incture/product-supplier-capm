using my.psm as my from '../db/schema';

service CatalogService {

  @(restrict: [
    {
      grant: ['READ'],
      to   : ['authenticated-user']
    },
    {
      grant: ['*'],
      to   : ['admin']
    }
  ])
  entity Suppliers as projection on my.Suppliers;

  @(restrict: [
    {
      grant: ['READ'],
      to   : ['authenticated-user']
    },
    {
      grant: ['*'],
      to   : ['admin']
    }
  ])
  entity Products  as projection on my.Products;

  @(restrict: [
    {
      grant: ['READ'],
      to   : ['authenticated-user']
    },
    {
      grant: ['*'],
      to   : ['admin']
    }
  ])
  entity Orders    as projection on my.Orders;

  @require: 'authenticated-user'
  action orderSubmit(productID: UUID,
                     quantity: Integer) returns String;

  @require: 'admin'
  action addStock(productID: UUID,
                  quantity: Integer)    returns Products;

  @require: 'admin'
  action removeStock(productID: UUID,
                     quantity: Integer) returns Products;
}
