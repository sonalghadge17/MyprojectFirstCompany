import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryDetailsModalComponent } from './country-details-modal/country-details-modal.component';
import { EnvironmentSustainabilityComponent } from './environment-sustainability/environment-sustainability.component';
import { Router } from '@angular/router';
import { ChatEnum, UserEnum } from 'src/app/core/enums/enum';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { DealNowModalComponent } from '../our-product/deal-now-modal/deal-now-modal.component';
import { OurProductList } from 'src/assets/data/our-product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private root!: am5.Root;
  private rotationInterval: any;
  popoverVisible = false;
  popoverData: { name: string; latitude: number; longitude: number; flag: any } | null = null;
  popoverPosition = { top: 0, left: 0 };
  contryName: any;
  isDropdownOpen = false;
  chatNavEnum = ChatEnum;
  selectedNavbar: string = this.chatNavEnum.HOME
  isServiceFormOpen: boolean = false;
  isCongratsUi:boolean = false;
  selectedServiceItem:any
  currentUser:any;
  userTypes = UserEnum;
  isMobile: boolean = false; 

  ourProductList:any[] = [];
  dummyourProductList:any[] = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private authFakeService:AuthfakeauthenticationService
  ) { 
    const currentUser = this.authFakeService.currentUserValue
    if(currentUser){
      this.currentUser = currentUser;
    }
    this.isMobile = window.innerWidth <= 768; // Adjust the breakpoint according to your design
    window.addEventListener('resize', this.checkScreenWidth.bind(this));   
  }
  
  cities = [
    { latitude: 48.8567, longitude: 2.351, name: 'France', flag: '/assets/images/paris1.png' },
    { latitude: 7.8731, longitude: 80.7718, name: 'Sri Lanka', flag: '/assets/images/shrilanka.png' },
    { latitude: 20.5937, longitude: 78.9629, name: 'India', flag: '/assets/images/india.png' },
    { latitude: 30.3753, longitude: 69.3451, name: 'Pakistan', flag: '/assets/images/pakistan.png' },
    { latitude: 35.8617, longitude: 104.1954, name: 'China', flag: '/assets/images/china.png' }
  ];
  listOfServices = [
    {
      id: 1,
      name: 'Assessment for targeted supplier',
      description: `TFG assessment service introduction e.g. TFG experts can support you to do a comprehensive quality assessment for your target suppliers befor you make a deal, reduce your risk, make a fair trade and transparent supply chain.`
    },
    {
      id: 2,
      name: 'Testing Service',
      description: `SGS product testing service introduction e.g. SGS product testing service ensure products meet global market and consumer expectations and regulatory requirements for food quality, safety and sustainability.`
    },
    {
      id: 3,
      name: 'Product Quality Inspection Service',
      description: `e.g.SGS product inspection services ensure product quality throughout the entire consumer goods supply chain with unrivaled experience in managing all types of inspection program.`
    },
    {
      id: 4,
      name: 'Other Technical Support',
      description: `Explore our additional technical support services for expert assistance and solutions tailored to your needs.`
    }
  ]
  ngOnInit() {
    const currentUser = this.authFakeService.currentUserValue
    if(currentUser){
      this.currentUser = currentUser;
    }
    this.authFakeService.currentUserSubject.subscribe((res:any)=>{
      this.currentUser = res;
    })

    this.ourProductList = OurProductList;
    this.dummyourProductList = OurProductList.map((item:any)=>{
      item.isWishlist = false;
      return item;
    });
    this.root = am5.Root.new('chartdiv');
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    let chart = this.root.container.children.push(am5map.MapChart.new(this.root, {
      panX: 'rotateX',
      panY: 'rotateY',
      projection: am5map.geoOrthographic(),
    }));

    chart.chartContainer.get('background')?.set('interactive', false);
    chart.set('wheelY', 'none');
    chart.set('pinchZoom', false);

    let backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(this.root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color('#9AB9F3'),
      fillOpacity: 0.6,
      strokeOpacity: 0
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });

    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(this.root, {
      geoJSON: am5geodata_worldLow
    }));

    let pointSeries = chart.series.push(am5map.MapPointSeries.new(this.root, {}));
    pointSeries.bullets.push(() => {

      let redCircle = am5.Circle.new(this.root, {
        radius: 6,
        fillOpacity: 0.3,
        fill: am5.color(0xff0000),
        stroke: this.root.interfaceColors.get('background'),
        strokeWidth: 5,
      });

      let whiteCircle1 = am5.Circle.new(this.root, {
        radius: 10,
        fillOpacity: 0,
        stroke: this.root.interfaceColors.get('background'),
        strokeWidth: 5,
      });

      let whiteCircle2 = am5.Circle.new(this.root, {
        radius: 14,
        fillOpacity: 0,
        stroke: this.root.interfaceColors.get('background'),
        strokeWidth: 5,
      });

      redCircle.animate({
        key: 'fillOpacity',
        from: 0.3,
        to: 0.6,
        duration: 1000,
        loops: Infinity,
        easing: am5.ease.yoyo(am5.ease.linear)
      });

      whiteCircle1.animate({
        key: 'strokeOpacity',
        from: 0.3,
        to: 0.6,
        duration: 1000,
        loops: Infinity,
        easing: am5.ease.yoyo(am5.ease.linear)
      });

      whiteCircle2.animate({
        key: 'strokeOpacity',
        from: 0.3,
        to: 0.6,
        duration: 1000,
        loops: Infinity,
        easing: am5.ease.yoyo(am5.ease.linear)
      });

      redCircle.events.on('click', (event) => {
        const dataItem = event.target?.dataItem as am5.DataItem<am5map.IMapPointSeriesDataItem & { latitude: number; longitude: number; name: string; flag: any }>;
        if (dataItem) {
          const coords = {
            latitude: dataItem.get('latitude') as number,
            longitude: dataItem.get('longitude') as number,
            name: dataItem.get('name') as string,
            flag: dataItem.get('flag') as any,
          };
          this.showPopover(event.originalEvent, coords);
          this.showPopover1(event.originalEvent, coords);
        }
      });

      let container = am5.Container.new(this.root, {});
      container.children.push(whiteCircle2);
      container.children.push(whiteCircle1);
      container.children.push(redCircle);

      return am5.Bullet.new(this.root, {
        sprite: container,
      });
    });

    // this.addCity(pointSeries, { latitude: 48.8567, longitude: 2.351, name: 'France', flag: '/assets/images/paris1.png' });
    // this.addCity(pointSeries, { latitude: 7.8731, longitude: 80.7718, name: 'Sri Lanka', flag: '/assets/images/shrilanka.png' });
    // this.addCity(pointSeries, { latitude: 20.5937, longitude: 78.9629, name: 'India', flag: '/assets/images/india.png' });
    // this.addCity(pointSeries, { latitude: 30.3753, longitude: 69.3451, name: 'Pakistan', flag: '/assets/images/pakistan.png' });
    // this.addCity(pointSeries, { latitude: 35.8617, longitude: 104.1954, name: 'China', flag: '/assets/images/china.png' });
    this.cities.forEach(city => {
      this.addCity(pointSeries, city);
    });

    this.startEarthRotation(chart);

    chart.chartContainer.events.on('pointerdown', () => {
      if (this.rotationInterval) {
        this.stopEarthRotation();
      }
    });
  }

  addToWishlist(item:any){
    if(item.isWishlist === false){
      item.isWishlist = true
    }else{
      item.isWishlist = false;
    }
  }
     // when click to deal now button 
  dealNow(item:any){
    const modalRef = this.modalService.open(DealNowModalComponent,{backdrop:"static",centered:true,size:'lg'})
    modalRef.componentInstance.selectedItem = item;
    modalRef.result.then(()=>{}, ()=>{});
  }

  viewDetails(item:any){
    this.router.navigate(['/our-product/product-details'], { queryParams:{ itemData: JSON.stringify(item) } });
 
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 768; // Adjust the breakpoint according to your design
  }                                                // create this function

  ngAfterViewInit(): void {
    this.root = am5.Root.new('chartdiv');
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    let chart = this.root.container.children.push(am5map.MapChart.new(this.root, {
      panX: 'rotateX',
      panY: 'rotateY',
      projection: am5map.geoOrthographic(),
    }));

    chart.chartContainer.get('background')?.set('interactive', false);
    chart.set('wheelY', 'none');
    chart.set('pinchZoom', false);

    let backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(this.root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color('#9AB9F3'),
      fillOpacity: 0.6,
      strokeOpacity: 0
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });

    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(this.root, {
      geoJSON: am5geodata_worldLow
    }));

    let pointSeries = chart.series.push(am5map.MapPointSeries.new(this.root, {}));
    pointSeries.bullets.push(() => {

      let redCircle = am5.Circle.new(this.root, {
        radius: 6,
        fillOpacity: 0.3,
        fill: am5.color(0xff0000),
        stroke: this.root.interfaceColors.get('background'),
        strokeWidth: 5,
      });

      let whiteCircle1 = am5.Circle.new(this.root, {
        radius: 10,
        fillOpacity: 0,
        stroke: this.root.interfaceColors.get('background'),
        strokeWidth: 5,
      });

      let whiteCircle2 = am5.Circle.new(this.root, {
        radius: 14,
        fillOpacity: 0,
        stroke: this.root.interfaceColors.get('background'),
        strokeWidth: 5,
      });

      redCircle.animate({
        key: 'fillOpacity',
        from: 0.3,
        to: 0.6,
        duration: 1000,
        loops: Infinity,
        easing: am5.ease.yoyo(am5.ease.linear)
      });

      whiteCircle1.animate({
        key: 'strokeOpacity',
        from: 0.3,
        to: 0.6,
        duration: 1000,
        loops: Infinity,
        easing: am5.ease.yoyo(am5.ease.linear)
      });

      whiteCircle2.animate({
        key: 'strokeOpacity',
        from: 0.3,
        to: 0.6,
        duration: 1000,
        loops: Infinity,
        easing: am5.ease.yoyo(am5.ease.linear)
      });

      redCircle.events.on('click', (event) => {
        const dataItem = event.target?.dataItem as am5.DataItem<am5map.IMapPointSeriesDataItem & { latitude: number; longitude: number; name: string; flag: any }>;
        if (dataItem) {
          const coords = {
            latitude: dataItem.get('latitude') as number,
            longitude: dataItem.get('longitude') as number,
            name: dataItem.get('name') as string,
            flag: dataItem.get('flag') as any,
          };
          this.showPopover(event.originalEvent, coords);
          this.showPopover1(event.originalEvent, coords);
        }
      });

      let container = am5.Container.new(this.root, {});
      container.children.push(whiteCircle2);
      container.children.push(whiteCircle1);
      container.children.push(redCircle);

      return am5.Bullet.new(this.root, {
        sprite: container,
      });
    });

    // this.addCity(pointSeries, { latitude: 48.8567, longitude: 2.351, name: 'France', flag: '/assets/images/paris1.png' });
    // this.addCity(pointSeries, { latitude: 7.8731, longitude: 80.7718, name: 'Sri Lanka', flag: '/assets/images/shrilanka.png' });
    // this.addCity(pointSeries, { latitude: 20.5937, longitude: 78.9629, name: 'India', flag: '/assets/images/india.png' });
    // this.addCity(pointSeries, { latitude: 30.3753, longitude: 69.3451, name: 'Pakistan', flag: '/assets/images/pakistan.png' });
    // this.addCity(pointSeries, { latitude: 35.8617, longitude: 104.1954, name: 'China', flag: '/assets/images/china.png' });
    this.cities.forEach(city => {
      this.addCity(pointSeries, city);
    });

    this.startEarthRotation(chart);

    chart.chartContainer.events.on('pointerdown', () => {
      if (this.rotationInterval) {
        this.stopEarthRotation();
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onBackdropClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.selectedNavbar = this.chatNavEnum.HOME;
    this.isServiceFormOpen = false;
    this.isCongratsUi = false;


  }
  onSelect(selectedNav: string) {
    this.selectedNavbar = selectedNav
    this.isServiceFormOpen = false;
    this.isCongratsUi = false;
  }

  onSelectService(item:any) {
    this.selectedNavbar = this.chatNavEnum.HELP;
    this.selectedServiceItem = item;
    this.isServiceFormOpen = true;
  }
  onSubmitForm(){
    this.isCongratsUi = true;
    this.isServiceFormOpen = false;
  }


  ngOnDestroy(): void {
    if (this.root) {
      this.root.dispose();
    }
    this.stopEarthRotation();
  }

  private addCity(pointSeries: am5map.MapPointSeries, coords: { latitude: number; longitude: number; name: string; flag: any }) {
    pointSeries.pushDataItem({
      latitude: coords.latitude,
      longitude: coords.longitude,
      name: coords.name,
      flag: coords.flag
    } as am5map.IMapPointSeriesDataItem);
  }

  private showPopover1(event: any, coords: { latitude: number; longitude: number; name: string; flag: any }) {
    this.popoverData = coords;
    this.popoverPosition = {
      top: event.clientY,
      left: event.clientX
    };
    this.popoverVisible = true;
  }

  private showPopover(event: any, coords: { latitude: number; longitude: number; name: string; flag: any }) {
    debugger
    this.contryName = coords.name
    const popoverWidth = 60;
    const popoverHeight = 50;

    this.popoverData = coords;
    this.popoverPosition = {
      top: event.clientY - popoverHeight / 2,
      left: event.clientX - popoverWidth / 1
    };
    this.popoverVisible = true;
  }

  openModal(coords: { latitude: number; longitude: number; name: string } | null): void {
    const modalRef = this.modalService.open(CountryDetailsModalComponent, { centered: true });
    modalRef.componentInstance.countryName = coords!.name;
    modalRef.componentInstance.latitude = coords!.latitude;
    modalRef.componentInstance.longitude = coords!.longitude;
    this.popoverVisible = false;
  }

  openCountryProductDetails() {
    this.router.navigate(['country-product-details', this.popoverData?.name]);
  }

  environmentSustainabilityModal() {
    const modalRef = this.modalService.open(EnvironmentSustainabilityComponent, { size: 'xl', centered: true });
    modalRef.result.then(() => { }, () => { });
  }

  private startEarthRotation(chart: am5map.MapChart): void {
    this.rotationInterval = setInterval(() => {
      let rotationX = chart.get('rotationX') || 0;
      chart.set('rotationX', rotationX - 2);
    }, 100);
  }

  private stopEarthRotation(): void {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
      this.rotationInterval = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('#chartdiv') && !targetElement.closest('.popover-container')) {
      if (!this.rotationInterval) {
        this.startEarthRotation(this.root.container.children.getIndex(0) as am5map.MapChart);
      }
      this.popoverVisible = false;
    }
  }
}
