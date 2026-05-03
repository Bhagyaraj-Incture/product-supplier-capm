using { NorthWind as my } from './external/NorthWind.cds';

service NorthWindService {
  entity Products as projection on my.Products;
}