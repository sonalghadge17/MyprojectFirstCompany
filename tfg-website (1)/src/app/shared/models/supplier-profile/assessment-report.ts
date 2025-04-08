
export class AssessmentReportClass {
    id?: string;
    assessmentType!: string;
    name!: string;
    standard!: string;
    objective!: string;
    startDate!: string;
    score!: string;
    option!: string;

    clear() {
        this.id = '';
        this.assessmentType = '';
        this.name = '';
        this.standard = '';
        this.objective = '';
        this.startDate = '';
        this.score = '';
        this.option = '';
     
    }
  
  
}
