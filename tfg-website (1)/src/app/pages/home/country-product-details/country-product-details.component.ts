import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryListService } from 'src/app/core/services/country-list.service';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import * as am5geodata_world from "@amcharts/amcharts5-geodata/worldLow";
import * as am5geodata_india from "@amcharts/amcharts5-geodata/indiaLow"; // For India's map
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-country-product-details',
  templateUrl: './country-product-details.component.html',
  styleUrl: './country-product-details.component.scss'
})
export class CountryProductDetailsComponent {
  private root!: am5.Root;
  popoverVisible = false;
  popoverData: { state: string; latitude: number; longitude: number; } | null = null;
  popoverPosition = { top: 0, left: 0 };
  countryName: string | null = null;
  selectedCardIndex: number | null = null;
  currentStep: number = 1;
  state: any;

  cards = [
    {
      image: './../../../../assets/home_food.png',
      title: 'Processed Food',
      volume: '300MT',
      value: '$3.5B',
      suppliers: 2340,
    },
    {
      image: './../../../../assets/home_dairy.png',
      title: 'Dairy & Eggs',
      volume: '300MT',
      value: '$3.5B',
      suppliers: 2340,
    },
    {
      image: './../../../../assets/home_meat.png',
      title: 'Meat & Poultry',
      volume: '300MT',
      value: '$3.5B',
      suppliers: 2340,
    },
    {
      image: './../../../../assets/home_fruit.png',
      title: 'Fruits & Vegetables',
      volume: '300MT',
      value: '$3.5B',
      suppliers: 2340,
    },
    {
      image: './../../../../assets/home_fish.png',
      title: 'Fish',
      volume: '300MT',
      value: '$3.5B',
      suppliers: 2340,
    },
  ];

  topSupplierCards = [
    {
      id: 1,
      imgSupplier: './../../../assets/supplier_naing_shang.png',
      nameSupplier: 'Naing Shang Pin Food Co.Ltd',
    },
    {
      id: 2,
      imgSupplier: './../../../assets/supplier_arvind.png',
      nameSupplier: 'Fresh Veg India Ltd',
    },
    {
      id: 3,
      imgSupplier: './../../../assets/supplier_ahemad.png',
      nameSupplier: 'Ahemad & Co.',
    },
    {
      id: 4,
      imgSupplier: './../../../assets/supplier_manjunatha.png',
      nameSupplier: 'Manjunatha & Co.',
    },
    {
      id: 5,
      imgSupplier: './../../../assets/supplier_maniland.png',
      nameSupplier: 'Maniland Fruits & Co.',
    },
    {
      id: 5,
      imgSupplier: './../../../assets/supplier_akram.png',
      nameSupplier: 'Akram Veg & Co.',
    },
  ]

  steps = [
    'Global GAP',
    'Organic',
    'IFS',
    'BRC',
    'FSSC22000',
    'HACCP',
    'ISO9001',
    'ESG',
  ];

  countries: any[] = [];

  selectedCountry: any;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countryListService: CountryListService
  ) {
    this.countries = countryListService.getCountries();
  }

  ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get('countryName');

    this.createMap();
  }

  ngAfterViewInit() {
    this.createMap();
  }

  createMap() {
    this.root = am5.Root.new("chartdiv");

    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);

    let chart = this.root.container.children.push(am5map.MapChart.new(this.root, {
      // panX: "rotateX",
      // panY: "rotateY",
      projection: am5map.geoMercator()
    }));
    chart.chartContainer.get('background')?.set('interactive', false);
    chart.set('wheelY', 'none');
    chart.set('pinchZoom', false);

    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(this.root, {
      geoJSON: am5geodata_india.default 
    }));

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0x6771dc),
      stroke: am5.color(0xffffff)
    });

    // Add custom popover when a region is clicked
    // polygonSeries.mapPolygons.template.events.on("click", (ev) => {
    //   this.showCustomPopover(ev.target.dataItem?.dataContext);
    //   this.zoomToRegion(chart, ev.target.dataItem);
    // });

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
        const dataItem = event.target?.dataItem as am5.DataItem<am5map.IMapPointSeriesDataItem & { latitude: number; longitude: number; state: string }>;
        if (dataItem) {
          const coords = {
            latitude: dataItem.get('latitude') as number,
            longitude: dataItem.get('longitude') as number,
            state: dataItem.get('state') as string,
          };
          this.showPopover(event.originalEvent, coords);
          // this.showPopover1(event.originalEvent, coords);
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

    this.addState(pointSeries, { latitude: 19.7515, longitude: 75.7139, state: 'Maharashtra' });
    this.addState(pointSeries, { latitude: 22.6708, longitude: 71.5724, state: 'Gujarat' });
    this.addState(pointSeries, { latitude: 22.9734, longitude: 78.6569, state: 'Madhya Pradesh' });
    this.addState(pointSeries, { latitude: 31.1471, longitude: 75.3412, state: 'Punjab' });
    this.addState(pointSeries, { latitude: 11.1271, longitude: 78.6569, state: 'Tamil Nadu' });
  }

  // Function to display the custom popover
  // showCustomPopover(data: any) {
  //   // Display a custom popover with the country-specific data
  //   const popoverContent = `
  //     <div class="custom-popover">
  //       <h4>${data.name}</h4>
  //       <p><strong>Category:</strong> Fruits & Vegetables</p>
  //       <p><strong>300MT Volume</strong></p>
  //       <p><strong>$3.5B Value</strong></p>
  //       <p><strong>2340 Suppliers</strong></p>
  //     </div>`;
  //   // Position and style the popover dynamically
  //   document.getElementById('popover-container')!.innerHTML = popoverContent;
  // }

  // Function to zoom in to the clicked region using zoomToGeoPoint
  // zoomToRegion(chart: am5map.MapChart, dataItem: any) {
  //   const centroid = dataItem.get("geometry").coordinates;
  //   const longitude = centroid[0];  // Longitude from the coordinates
  //   const latitude = centroid[1];   // Latitude from the coordinates

  //   // Zoom to the geographic point (long, lat)
  //   chart.zoomToGeoPoint({ longitude, latitude }, 2);  // Zoom level 2 (adjust if needed)
  // }

  private addState(pointSeries: am5map.MapPointSeries, coords: { latitude: number; longitude: number; state: string; }) {
    pointSeries.pushDataItem({
      latitude: coords.latitude,
      longitude: coords.longitude,
      state: coords.state
    } as am5map.IMapPointSeriesDataItem);
  }

  private showPopover(event: any, coords: { latitude: number; longitude: number; state: string; }) {
    debugger
    this.state = coords.state

    this.popoverData = coords;
    this.popoverPosition = {
      top: event.clientY - 250,
      left: event.clientX - 1010
    };
    this.popoverVisible = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('#chartdiv') && !targetElement.closest('.popover-container')) {
      this.popoverVisible = false;
    }
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }

  selectCard(index: number) {
    this.selectedCardIndex = index;
  }

  getWidth(index: number): string {
    const widths = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'];
    return widths[index] || 'auto';
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  nextStep(): void {
    if (this.currentStep < 9) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isCountryProductDetailsScreen() {
    return this.router.url.includes('/country-product-details');
  }

}
