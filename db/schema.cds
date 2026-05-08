using {
  cuid,
  managed
} from '@sap/cds/common';

namespace my.psm;

entity Suppliers : cuid {
  name     : String;

  @Validation.Pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  email    : String;

  @Validation.Pattern: '^(\\+\\d{1,3}[- ]?)?\\d{10}$'
  phone    : String;
  products : Association to many Products
               on products.supplier = $self;
}

entity Products : cuid {
  name     : String;
  price    : Decimal(10, 2);
  stock    : Integer;
  supplier : Association to Suppliers;
}

entity Orders : cuid, managed {
  product     : Association to Products;
  quantity    : Integer;
  totalAmount : Decimal(10, 2);
  status      : String;
}
