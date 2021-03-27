import { Component, Input} from '@angular/core';
import { ChartType, ChartOptions, ChartSize, } from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  template: `<div >
                <canvas baseChart
                width=200
                height=150
                [datasets]="radarChartData"
                [labels]="radarChartLabels"
                [chartType]="radarChartType"
                [options]="options"
                [colors]="radarChartColors"
                ></canvas>
              </div>`,
})
export class RadarChartComponent{

  constructor() { }

  radarChartLabels = ['Overall', 'Ability to learn', 'Motivation', 'Extra mile' , 'Communication'];

  @Input() set data(val: number[]){
    this.radarChartData[0].data = val;
  }

  radarChartData = [
    {
      data: [0, 0, 0, 0, 0]
    }
  ];
  radarChartColors = [
    {
      backgroundColor: 'rgba(244, 162, 97, 0.3)',
      borderColor: 'rgba(244, 162, 97, 1)',
      pointBackgroundColor: 'rgba(244, 162, 97, 1)'
    }
  ];

  radarChartType: ChartType = 'radar';
  options: ChartOptions = {
    responsive: true,
    scale: {
      position: 'bottom',
      pointLabels: {
        fontSize: 10
    },
      ticks: {
          max: 10,
          min: 0,
          stepSize: 2,
          fontSize: 10
      }
    },
    legend: {
      display: false,
    },
  };

}
