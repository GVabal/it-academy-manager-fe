import { of, Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  template: `<div>
                <canvas baseChart
                width="300" height="300"
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
      backgroundColor: 'rgba(244, 162, 97, 0.2)',
      borderColor: 'rgba(244, 162, 97, 1)',
      pointBackgroundColor: 'rgba(244, 162, 97, 1)'
    }
  ];

  radarChartType: ChartType = 'radar';
  options = {
    scale: {
      ticks: {
          max: 10,
          min: 0,
          stepSize: 2,
      }
  },
  legend: {
    display: false
  }
  };
}
