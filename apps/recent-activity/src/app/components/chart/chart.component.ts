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
} from 'ng-apexcharts';
import { ChartData } from '../../models/ChartData';
import { FlightInstructionHour } from '../../models/IRecentActivityInstructors';

type ApexXAxis = {
  type?: 'category' | 'datetime' | 'numeric';
  tickAmount?: number;
  min?: number;
  max?: number;
  axisBorder?: {
    color: string;
  };
  axisTicks?: {
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

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  theme: ApexTheme;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'cirrus-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class CirrusChartComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  private _data!: ChartData;

  @Input()
  set data(value: ChartData | null) {
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
          name: this.data?.csvRightColumnTitle,
          data:
            this.data?.data.map((a: FlightInstructionHour) => a.total) || [],
        },
      ],
      chart: {
        height: 250,
        type: 'bar',
        fontFamily: 'akzidenz-extended',
        background: '#000',
        events: {
          click: function (chart, w, e) {
            // Leaving this in case we never need to interact
          },
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: [],
          },
          export: {
            csv: {
              filename: this.data?.title,
              columnDelimiter: ',',
              headerCategory: 'Months',
              headerValue: 'Completed',
              dateFormatter(timestamp: any) {
                return new Date(timestamp).toDateString();
              },
            },
            svg: {
              filename: this.data?.title,
            },
            png: {
              filename: this.data?.title,
            },
          },
          autoSelected: 'zoom',
        },
      },

      fill: {
        type: 'gradient',
        colors: this.data?.chartColors.gradientFromColors,
        gradient: {
          type: 'vertical',
          gradientToColors: this.data?.chartColors.gradientToColors,
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
        borderColor: '#2E2E2E',
      },
      xaxis: {
        categories: this.data?.data.map((a: any) => a.month || a.range),
        labels: {
          style: {
            colors: '#E5E5E5',
            fontSize: '13px',
          },
        },
        axisBorder : {
          color: '#2E2E2E',
        },
        axisTicks : {
          color: '#2E2E2E',
        }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
      },
      theme: {
        mode: 'dark',
      },
    };
  }
}
