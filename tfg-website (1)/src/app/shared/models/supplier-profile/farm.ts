export class FarmClass {
    id?: string;
    name!: string;
    representative!: string;
    category!: string;
    code!: string;
    area!: string;
    address!: string;
    unitOutput!: string;
    staffQty!: string;
    testReport!: string;

    clear() {
        this.id = '';
        this.name = '';
        this.representative = '';
        this.category = '';
        this.code = '';
        this.area = '';
        this.address = '';
        this.unitOutput = '';
        this.staffQty = '';
        this.testReport = '';
    }
  
}
