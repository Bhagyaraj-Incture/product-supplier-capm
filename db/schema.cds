namespace my.psm;

entity Suppliers {
  key ID       : UUID;
      name     : String;
      email    : String;
      phone    : String;
      products : Association to many Products
                   on products.supplier = $self;
}

entity Products {
  key ID       : UUID;
      name     : String;
      price    : Decimal(10, 2);
      stock    : Integer;
      supplier : Association to Suppliers;
}

entity Orders {
  key ID          : UUID;
      product     : Association to Products;
      quantity    : Integer;
      totalAmount : Decimal(10, 2);
      status      : String;
}
