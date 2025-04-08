export class Testimonial {
    id:any 
    clientName!: string
    clientDesignation!: string
    description!: string
    clear(){
        this.clientDesignation=''
        this.clientName=''
        this.description=''
    }
}
