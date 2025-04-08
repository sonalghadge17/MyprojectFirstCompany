import { Component } from '@angular/core';

@Component({
  selector: 'app-su-dashboard',
  templateUrl: './su-dashboard.component.html',
  styleUrl: './su-dashboard.component.scss'
})
export class SuDashboardComponent {
  currentDate = '10-10-2021'


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
