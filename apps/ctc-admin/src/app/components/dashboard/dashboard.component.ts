import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CtcAdminService } from '../../app.service';
import { ITrainingCenter } from '../../models/ITrainingCenter';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ChartComponent,ApexNonAxisChartSeries,ApexTitleSubtitle,ApexPlotOptions,ApexDataLabels,ApexStroke,ApexLegend,ApexAxisChartSeries,ApexChart,ApexResponsive} from 'ng-apexcharts';
import { InitialsPipe } from '../../pipes/initials.pipe';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
};


export interface InstructorActiveClientsTableData {
  instructors: string;
  clients: number;
  
}

const instructorActiveClientsTableData: InstructorActiveClientsTableData[] = [
  {
    instructors: "Matthew Carriganson",
    clients: 12,
  },
  {
    instructors: "John Pattison",
    clients: 10,
  },
  {
    instructors: "Darius Jackson",
    clients: 9,
  },
  {
    instructors: "Darius Jackson",
    clients: 8,
  },
  {
    instructors: "Michael Thomas",
    clients: 7,
  },
  {
    instructors: "Sam Donald",
    clients: 7,
  },
  {
    instructors: "Jason Simmons",
    clients: 6,
  },
  {
    instructors: "Jake Leon",
    clients: 6,
  },
  {
    instructors: "Brian Harrison ",
    clients: 6,
  },
  {
    instructors: "Luke Workman",
    clients: 6,
  },
  {
    instructors: "Replace_Me",
    clients: 6,
  },
  {
    instructors: "Samuel Donald",
    clients: 4,
  },
  {
    instructors: "Replace_Me",
    clients: 3,
  },
  {
    instructors: "Replace_Me",
    clients: 3,
  },
];




export interface TableData {
  client: string;
  date: string;
  assessment: string;
  instructor: string;
  action: string;
}

const ELEMENT_DATA: TableData[] = [
  {
    client: "Terry Blandnesher",
    date: "2:15 PM",
    assessment: "Flight",
    instructor: "Cole Kneip",
    action: "",
  },
  {
    client: "Spencer Rysman",
    date: "Nov 11, 2022",
    assessment: "Ground",
    instructor: "Scott Mora",
    action: "remarks",
  },
  {
    client: "Willy Macintosh",
    date: "Nov 8, 2022",
    assessment: "Simulator",
    instructor: "Alexander Gomez",
    action: "remarks",
  }
];


/**
 * Represents the dashboard component of the application.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  /**
   * The title of the dashboard.
   */
  title = 'CTC Dashboard';

  /**
   * The training center data.
   */
  trainingCenter: ITrainingCenter = {} as ITrainingCenter;

  /**
   * The background hero images.
   */
  backgroundHeroImages: any;
  assessmentIcons: any;
  horizontal100Chart: any;
  displayedColumns: string[] = ['client', 'date', 'assessment', 'instructor', 'action'];
  displayedColumnsActiveClientsPerInstructor: string[] = ['instructors', 'clients'];
  dataSource = ELEMENT_DATA;
  instructorActiveClientsTableData = new MatTableDataSource<InstructorActiveClientsTableData>(instructorActiveClientsTableData);
  private subscription: Subscription = new Subscription();

  /**
   * The subscription to the current training center data.
   */
  subscriptionTrainingCenter: Subscription = new Subscription();
  // instructorActiveClientsTableData: InstructorActiveClientsTableData[] | undefined;

  @ViewChild(MatSort) sort: MatSort | undefined;
  
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsTci: Partial<ChartOptions>;
  public chartOptionsFlightHours: Partial<ChartOptions>;
  public chartOptionsDualGiven: Partial<ChartOptions>;
  public chartOptionsRecurrentstatus: Partial<ChartOptions>;


  constructor(private ctcAdminService: CtcAdminService) {
    this.instructorActiveClientsTableData = new MatTableDataSource(instructorActiveClientsTableData);

    this.chartOptions = {
      title: {
        text: "TCI's",
        align: "right",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
        },
        offsetY: 30,
        offsetX: -93,
      },
      series: [36, 101],
      labels: ["Instructor Only", "Also a Client"],
      colors: ['#2BADF6','#3D0DFC'],

      chart: {
        type: 'donut',
        foreColor: '#fff',
        height: 130,
        width: '100%',
      },
      legend: {

        offsetY: 30,
        offsetX: 5,
        horizontalAlign: 'center', 

        itemMargin: {
          horizontal: 6,
          vertical: 0
        },
        markers: {
          offsetY: 2
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80%",
            labels: {
              show: true,
              total: {
                showAlways: false,
                show: true,
                fontSize: '24px',
                fontWeight: 400,
                label: 'Total',
              },
              name: {
                show: false,
                fontSize: '24px',
                fontWeight: 400,
              },
              value: {
                fontSize: '24px',
                fontWeight: 400,
              },
            }
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
    };

    this.chartOptionsTci = {
      title: {
        text: "TCI's",
        align: "right",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
        },
        offsetY: 30,
        offsetX: -93,
      },
      series: [36, 101],
      labels: ["Instructor Only", "Also a Client"],
      colors: ['#2BADF6','#3D0DFC'],

      chart: {
        type: 'donut',
        foreColor: '#fff',
        height: "130px",
        width: '280px',
      },
      legend: {

        offsetY: 30,
        offsetX: 5,
        horizontalAlign: 'center', 

        itemMargin: {
          horizontal: 6,
          vertical: 0
        },
        markers: {
          offsetY: 2
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80%",
            labels: {
              show: true,
              total: {
                showAlways: false,
                show: true,
                fontSize: '24px',
                fontWeight: 400,
                label: 'Total',
              },
              name: {
                show: false,
                fontSize: '24px',
                fontWeight: 400,
              },
              value: {
                fontSize: '24px',
                fontWeight: 400,
              },
            }
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
    };
    
    this.chartOptionsFlightHours = {
      title: {
        text: "Flight Hours",
        align: "right",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
        },
        offsetY: 30,
        offsetX: -30,
      },
      series: [44, 55],
      labels: ["Dual Given", "Self-Training"],
      colors: ['#2BADF6','#3D0DFC'],

      chart: {
        type: 'donut',
        foreColor: '#fff',
        height: "130px",
        width: '280px',
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80%",
            labels: {
              show: true,
              total: {
                showAlways: false,
                show: true,
                fontSize: '24px',
                fontWeight: 400,
                label: 'Total',
              },
              name: {
                show: false,
                fontSize: '24px',
                fontWeight: 400,
              },
              value: {
                fontSize: '24px',
                fontWeight: 400,
              },
            }
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
    };
    
    this.chartOptionsDualGiven = {
      title: {
        text: "Dual Given",
        align: "right",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
        },
        offsetY: 30,
        offsetX: -24,
      },
      series: [44, 55,93],
      labels: ["Flight ", "Ground","Simulator"],
      colors: ['#2BADF6','#0074FC','#3D0DFC'],

      chart: {
        type: 'donut',
        foreColor: '#fff',
        height: "130px",
        width: '280px',
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80%",
            labels: {
              show: true,
              total: {
                showAlways: false,
                show: true,
                fontSize: '24px',
                fontWeight: 400,
                label: 'Total',
              },
              name: {
                show: false,
                fontSize: '24px',
                fontWeight: 400,
              },
              value: {
                fontSize: '24px',
                fontWeight: 400,
              },
            }
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
    };
    
    this.chartOptionsRecurrentstatus = {
      title: {
        text: "Recurrent Status",
        align: "right",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
        },
        offsetY: 30,
        offsetX:-6,
      },
      series: [44, 55,23],
      labels: ["Grace Period", "Expire Soon","Expired"],
      colors: ['#00B8A8','#FFD600','#E52900'],

      chart: {
        type: 'donut',
        foreColor: '#fff',
        height: "130px",
        width: '280px',
      },
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            size: "80%",
            labels: {
              show: true,
              total: {
                showAlways: false,
                show: true,
                fontSize: '24px',
                fontWeight: 400,
                label: 'Total',
              },
              name: {
                show: false,
                fontSize: '24px',
                fontWeight: 400,
              },
              value: {
                fontSize: '24px',
                fontWeight: 400,
              },
            }
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
    };

  }

  ngAfterViewInit() {
    if (this.sort) {
      this.instructorActiveClientsTableData.sort = this.sort;
    }
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.subscriptionTrainingCenter = this.ctcAdminService.currentTrainingCenter.subscribe(data => {
      this.trainingCenter = data;
    });

    this.displayedColumnsActiveClientsPerInstructor = ['instructors', 'clients'];

    this.backgroundHeroImages = [
      {
        imagePath: 'ctc-admin/assets/images/ctc-dashboard-hero-background.jpg'
      }
    ]

    this.assessmentIcons = [
      {
        flight: 'ctc-admin/assets/icons/assessment-flight.svg',
        ground: 'ctc-admin/assets/icons/assessment-ground.svg',
        simulator: 'ctc-admin/assets/icons/assessment-simulator.svg',
      }
    ]

    this.horizontal100Chart = [
      {
        circleCheck: 'ctc-admin/assets/icons/circle-check.svg',
        circlePartial: 'ctc-admin/assets/icons/circle-partial.svg',
        circle: 'ctc-admin/assets/icons/circle.svg',
        circleMinus: 'ctc-admin/assets/icons/circle-minus.svg',
        flight: 'ctc-admin/assets/icons/assessment-flight.svg',
        ground: 'ctc-admin/assets/icons/assessment-ground.svg',
        simulator: 'ctc-admin/assets/icons/assessment-simulator.svg',
      }
    ]
  }

  /**
   * Cleans up resources when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.subscriptionTrainingCenter.unsubscribe();
    this.subscription.unsubscribe();
  }


  /**
   * Returns the formatted date.
   */
  getFormattedDate(): string {
    const _currentDate = new Date();

    return _currentDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  getFormattedCirrusBucks(): string {
    let _value = this.trainingCenter.cirrus_bucks?.balance;
    _value = _value && _value > 0 ? _value : 0;
    const formattedValue = _value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return formattedValue;
  }

}
