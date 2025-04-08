
export class ProductClass {
    id?: string;
    name!: string;
    description!: string;
    priceRange!: string;
    minPrice!: string;
    maxPrice!: string;
    qty!: string;
    manufactureInfo!: string;
    origin!: string;
    logistics!: string;
    packing!: string;
    variety!: string;
    testReport!: string;
    certificate!: string;
    productImage!: string;
    supplierProfileId!: string;
    categoryId!: string;

    clear() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.minPrice = '';
        this.maxPrice = '';
        this.qty = '';
        this.manufactureInfo = '';
        this.origin = '';
        this.logistics = '';
        this.packing = '';
        this.variety = '';
        this.testReport = '';
        this.certificate = '';
        this.productImage = '';
        this.supplierProfileId = '';
        this.categoryId = '';
    }
  
  
}
