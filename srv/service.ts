import cds from '@sap/cds';
import { Products, Orders } from '#cds-models/CatalogService';

export class CatalogService extends cds.ApplicationService {
  init() {
    // const { Products, Orders } = this.entities;

    this.on('orderSubmit', async (req) => {
      const { productID, quantity } = req.data as {
        productID: string;
        quantity: number;
      };

      const product = await SELECT.one.from(Products).where({ ID: productID });

      if (!product) {
        return req.error(404, 'Product not found');
      }

      if (product.stock && product.stock < quantity) {
        return req.error(400, 'Insufficient stock');
      }

      const total = (product.price || 0) * quantity;

      await UPDATE(Products)
        .set({ stock: (product.stock || 0) - quantity })
        .where({ ID: productID });

      await this.create(Orders).entries([
        {
          ID: cds.utils.uuid(),
          product: { ID: productID },
          quantity: quantity,
          totalAmount: total,
          status: 'CONFIRMED',
        },
      ] as unknown as typeof Orders);

      return 'Order placed successfully';
    });

    this.on('addStock', async (req) => {
      const { productID, quantity } = req.data as {
        productID: string;
        quantity: number;
      };

      const product = await SELECT.one.from(Products).where({ ID: productID });

      if (!product) {
        return req.error(404, 'Product not found');
      }

      await UPDATE(Products)
        .set({ stock: (product.stock || 0) + quantity })
        .where({ ID: productID });

      const updatedProduct = await SELECT.one
        .from(Products)
        .where({ ID: productID });

      return updatedProduct;
    });

    this.on('removeStock', async (req) => {
      const { productID, quantity } = req.data as {
        productID: string;
        quantity: number;
      };

      const product = await SELECT.one.from(Products).where({ ID: productID });

      if (!product) {
        return req.error(404, 'Product not found');
      }

      if (product.stock && product.stock < quantity) {
        return req.error(400, 'Insufficient stock to remove');
      }

      await UPDATE(Products)
        .set({ stock: (product.stock || 0) - quantity })
        .where({ ID: productID });

      const updatedProduct = await SELECT.one
        .from(Products)
        .where({ ID: productID });

      return updatedProduct;
    });

    return super.init();
  }
}
