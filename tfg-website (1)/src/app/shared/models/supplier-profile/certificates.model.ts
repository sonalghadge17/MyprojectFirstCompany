

export class CertificatesClass {
    id?: string;
    licenseType!: string;
    issuingAuthority!: string;
    supplierName!: string;
    effectiveDate!: string;
    expirationDate!: string;
    certificateImage!: string;
    country!: string;

    clear() {
        this.id = '';
        // this.licenseType = ;
        this.issuingAuthority = '';
        this.supplierName = '';
        this.effectiveDate = '';
        this.expirationDate = '';
        this.certificateImage = '';
        this.country = '';
    }
}
