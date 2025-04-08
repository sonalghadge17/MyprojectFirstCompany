export class Payment {
        userId!: string;
        label!:string
   
        totalAmount!: number;
        paymentStatus!: string;
        shippingAndHandlingAmount!:number;
        tax!:number
        MilestoneRequest!: [];
        clear(){   
        }
      }
      export interface MilestoneRequest {
        sequence: string;
        milestoneAmount: number;
        milestoneName: string
        }
    