import { Component, Input} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-skill-chart',
  templateUrl: './skill-chart.component.html',
  styleUrls: ['./skill-chart.component.scss']
})
export class SkillChartComponent{

  constructor() { }

  showComments = false;

  @Input() set data(input: number[]){
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const grade of input){
      data[grade]++;
    }
    this.showComments = false;
    this.chartData[0].data = data;
  }

  @Input() set borderColor(input: string){
    this.chartColors[0].borderColor = input;
  }
  @Input() set backgroundColor(input: string){
   this.chartColors[0].backgroundColor = input;
  }

  @Input() title = '';

  @Input() comments: string[] = [];


  chartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Count of Lecturers' },
  ];

  chartLabels: Label[] = ['1', '2', '3', '4', '4', '5', '6', '7', '8', '9', '10'];

  chartOptions: ChartOptions  = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: false,
          labelString: 'Count of Lecturers'
        },
          ticks: {
              min: 0,
              stepSize: 1,
              maxTicksLimit: 5
          }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Evaluation'
        }
      }]
    },
    legend: {
      display: false
    }
  };

  chartColors: Color[] = [
    {
      borderWidth: 2
    },
  ];

  chartType: ChartType = 'line';

  onCommentsShow(): void{
    this.showComments = !this.showComments;
  }

}
