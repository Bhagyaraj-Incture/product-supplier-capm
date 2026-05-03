import cds from '@sap/cds';
import { Products } from '#cds-models/NorthWindService';

export class NorthWindService extends cds.ApplicationService {
  async init() {
    const external = await cds.connect.to('NorthWind');

    this.on('READ', Products, (req) => {
      return external.run(req.query);
    });

    return super.init();
  }
}
