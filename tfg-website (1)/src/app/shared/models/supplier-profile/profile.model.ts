

export class ProfileClass {
    id?: string;
    supplierNo!: string;
    supplierName!: string;
    mainProducts!: string;
    companyCategory!: string;
    enterpriseClassification!: string;
    productsCategory!: string;
    addressLine1!: string;
    addressLine2!: string;
    traceable!: boolean;
    export!: boolean;
    iso9001!: boolean;
    globalGap!: boolean;

    clear() {
        this.id = '';
        this.supplierNo = '';
        this.supplierName = '';
        this.mainProducts = '';
        this.companyCategory = '';
        this.enterpriseClassification = '';
        this.productsCategory = '';
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.traceable = false;
        this.export = false;
        this.iso9001 = false;
        this.globalGap = false;
    }
}
