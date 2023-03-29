import { Component, Input, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexTheme,
  ApexTooltip,
  ApexYAxis,
  ChartComponent,
  ApexResponsive,
} from 'ng-apexcharts';
import {
  MostMissedTask,
  MostPassedTask,
} from '../../models/IRecentActivityInstructors';

type ApexXAxis = {
  type?: 'category' | 'datetime' | 'numeric';
  tickAmount?: number;
  min?: number;
  max?: number;
  axisBorder: {
    color: string;
  };
  axisTicks: {
    color: string;
  };
  tickPlacement?: string;
  categories?: any;
  labels?: {
    tickAmount?: number;
    type?: string;
    formatter?: any;
    style?: {
      colors?: string | string[];
      fontSize?: string;
      fontFamily?: string;
    };
  };
};

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  theme: ApexTheme;
  grid: ApexGrid;
  colors: any[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'cirrus-horizontal-chart',
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.html'],
})
export class CirrusHorizontalChartComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  private _data!: any;

  @Input()
  set data(value: any) {
    if (value) {
      this._data = value;
      this.setChartOptions(value);
    }
  }

  get data() {
    return this._data;
  }

  formatPassedNumber(passed: number, missed: number): number {
    return -Math.abs((passed / (passed + missed)) * 100);
  }

  formatMissedNumber(missed: number, passed: number): number {
    const passedNum = (passed / (missed + passed)) * 100;
    return 100 - passedNum;
  }

  setChartOptions(data: any) {
    this.chartOptions = {
      series: [
        {
          name: 'Passed',
          data: this.data.data.map((arr: MostMissedTask) =>
            this.formatPassedNumber(arr.success_count, arr.failed_count)
          ),
        },
        {
          name: 'Missed',
          data: this.data.data.map((arr: MostPassedTask) =>
            this.formatMissedNumber(arr.failed_count, arr.success_count)
          ),
        },
      ],

      fill: {
        type: 'gradient',
        colors: this.data.chartColors.gradientFromColors,
        gradient: {
          type: 'horizontal',
          gradientToColors: this.data.chartColors.gradientToColors,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },

      chart: {
        type: 'bar',
        width: '100%',
        height: this.data.data.length === 1 ? 150 : this.data.data.length * 100,
        stacked: true,
      },

      legend: { show: false },

      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },

      grid: {
        borderColor: '#3a3a3a',
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        shared: false,
        enabled: true,
        theme: 'dark',

        x: {
          formatter: function (val) {
            return val.toString();
          },
        },
        y: {
          formatter: function (val, seriesIndex) {
            const { success_count } = data.data[seriesIndex.dataPointIndex];
            const { failed_count } = data.data[seriesIndex.dataPointIndex];
            return val > 0 ? failed_count : success_count;
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#D1D1D1',
            fontSize: '.813rem',
            fontFamily: 'akzidenz-extended',
          },
        },
        min: -100,
        max: 100,
      },
      xaxis: {
        axisBorder: {
          color: '#3a3a3a',
        },
        axisTicks: {
          color: '#3a3a3a',
        },
        categories: this.data.data.map(
          (a: MostMissedTask | MostPassedTask) => a.task?.name
        ),
        tickAmount: 4,
        labels: {
          formatter: function (val: any) {
            return Math.abs(val.toFixed(0)) + '%';
          },
          style: {
            colors: '#D1D1D1',
            fontSize: '.813rem',
            fontFamily: 'akzidenz-extended',
          },
        },
      },
      responsive: [
        {
          breakpoint: 360,
          options: {
            chart: {
              width: 264,
            },
          },
        },
        {
          breakpoint: 420,
          options: {
            chart: {
              width: 300,
            },
          },
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 363,
            },
          },
        },
        {
          breakpoint: 720,
          options: {
            chart: {
              width: 426,
            },
          },
        },
        {
          breakpoint: 960,
          options: {
            chart: {
              width: 540,
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: 625,
            },
          },
        },
        {
          breakpoint: 1400,
          options: {
            chart: {
              width: 414,
            },
          },
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 500,
            },
          },
        },
      ],
    };
  }
}
