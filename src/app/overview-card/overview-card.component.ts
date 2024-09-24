import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss'],
  standalone: true,
  imports: [BaseChartDirective]
})
export class OverviewCardComponent  implements OnInit {


  

  ngOnInit() {}

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Années'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Valeurs'
        }
      }
    }
  };

  public lineChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public lineChartType: string = 'line'; // Changer 'bar' à 'line'
  public lineChartLegend: boolean = true;

  public lineChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Série A' },
  
  ];

  // Événements
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  constructor() { }



}
