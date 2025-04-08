

export class FactoryClass {
    id?: string;
    name!: string;
    contactNo!: string;
    addressLine1!: string;
    addressLine2!: string;
    staffQuantity!: string;
    

    clear() {
        this.id = '';
        this.name = '';
        this.contactNo = '';
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.staffQuantity = '';
    }

}
