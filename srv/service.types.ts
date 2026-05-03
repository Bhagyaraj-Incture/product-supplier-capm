export interface Order {
  ID: string;
  product: Product;
  quantity: number;
  totalAmount: number;
  status: string;
}

export interface Product {
  ID: string;
  name: string;
  price: number;
  stock: number;
  supplier: Supplier;
}

export interface Supplier {
  ID: string;
  name: string;
  email: string;
  phone: string;
  products: Product[];
}
