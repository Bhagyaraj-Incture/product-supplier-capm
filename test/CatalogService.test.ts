import cds from '@sap/cds';
import { describe, it } from 'node:test';

const { GET, expect, axios } = cds.test(import.meta.dirname + '/..');
axios.defaults.auth = { username: 'alice', password: '' };

describe('CatalogService OData APIs', () => {
  it('serves CatalogService.Suppliers', async () => {
    const { data } =
      await GET`/odata/v4/catalog/Suppliers ${{ params: { $select: 'ID,name' } }}`;
    expect(data.value).to.containSubset([
      { ID: '22243809-67c5-4611-85de-f27737245db8', name: 'name-22243809' },
      { ID: '22243810-347e-4e2e-983a-48d2157f1f29', name: 'name-22243810' },
      { ID: '22243811-6c1e-4b0a-adc7-b1cbe4cd6f47', name: 'name-22243811' },
    ]);
  });
});
