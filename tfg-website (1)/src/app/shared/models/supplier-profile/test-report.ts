export class TestReportClass {
    id?: string;
    name!: string;
    effectiveDate!: string;
    validityPeriod!: string;
    uploadFile!: string;

    clear() {
        this.id = '';
        this.name = '';
        this.effectiveDate = '';
        this.validityPeriod = '';
        this.uploadFile = '';
    }
  
}
