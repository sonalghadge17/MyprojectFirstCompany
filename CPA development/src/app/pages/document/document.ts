export class Documentt {
    id:any
    name!:string
    description!:string
    userId:any
    type:any
    documentType:any
    SelecteduserId:any
    clear(){
        this.id=''
        this.name=''
        this.description=''
        this.userId=''
        this.type=''
        this.documentType=''
    }
}