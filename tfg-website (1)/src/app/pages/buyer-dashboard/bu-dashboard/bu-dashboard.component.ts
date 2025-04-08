import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bu-dashboard',
  templateUrl: './bu-dashboard.component.html',
  styleUrl: './bu-dashboard.component.scss'
})
export class BuDashboardComponent implements OnInit {
  currentDate!: string | null;
  constructor(private datePipe:DatePipe){

  }
  ngOnInit(): void {
    const date = new Date()
    this.currentDate = this.datePipe.transform(date,'yyyy-MM-dd');
  }


  recentDeals = [
    {
      id:'1',
      name:'Apple',
      imgUrl:'assets/buyer-dashboard/recent-deals/apple.png',
      price:'$ 2290 MT',
      dateTime:'9 Aug 2024  |  12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Completed'
    },
    {
      id:'2',
      name:'Banana',
      imgUrl:'assets/buyer-dashboard/recent-deals/banana.png',
      price:'$ 2290 MT',
      dateTime:'9 Aug 2024  |  12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Completed'
    },
    {
      id:'3',
      name:'Muskmelon',
      imgUrl:'assets/buyer-dashboard/recent-deals/muskmelon.png',
      price:'$ 2290 MT',
      dateTime:'9 Aug 2024  |  12:00PM IST',
      totalWeight:'2MT',
      dealPrice:'$ 2290 MT',
      status:'Completed'
    },
  ]
}
