import { Component, Input, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  ApexFill,
  ApexAnnotations,
} from 'ng-apexcharts';

type ApexXAxis = {
  type?: 'category' | 'datetime' | 'numeric';
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'cirrus-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class CirrusChartComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  // @Input() data!: any;

  private _data!: any;

  @Input()
  set data(value: any) {
    if (value) {
      this._data = value;
      this.setChartOptions();
    }
  }

  get data() {
    return this._data;
  }

  setChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: 'distibuted',
          data: this.data.hours.map((a: any) => a.total),
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },

      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 1,
          gradientToColors: this.data.chartColors.gradientToColors,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },

      plotOptions: {
        bar: {
          columnWidth: '85%',
          distributed: true,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        formatter: function (val: number, opt) {
          return val === 0 ? '' : val;
        },
        enabled: true,
        offsetY: -20,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
      },
      xaxis: {
        categories: this.data.hours.map((a: any) => a.month),
        labels: {
          style: {
            colors: '#E5E5E5',
            fontSize: '13px',
          },
        },
      },
    };
  }
}
