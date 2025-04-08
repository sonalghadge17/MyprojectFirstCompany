export class Jobs {
    description!: string
    label!: string
    experience!: string
    jobPosition!:string
    noOfVacancy!:string
    qualification!:string
    lastSalary!:string
    startSalary!:string
    tags!:string
  clear(){
    this.experience=''
    this.label='',
    this.description=''
    this.noOfVacancy=''
    this.qualification=''
    this.lastSalary=''
    this.startSalary=''
    this.tags=''
  }
}
