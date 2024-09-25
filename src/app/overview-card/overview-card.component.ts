import { Component, ViewChild } from "@angular/core";
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexStroke, ApexYAxis, ApexGrid, ApexTitleSubtitle } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Dépenses en K",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 125] // Exemple de dépenses mensuelles
        }
      ],
      chart: {
        type: "line",
        height: 350
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep" // Mois jusqu'à présent
        ]
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + "K"; // Affichage en milliers
          }
        },
        title: {
          text: "Dépenses (en K)"
        }
      },
      grid: {
        borderColor: "#f1f1f1"
      },
      title: {
        text: "Dépenses Mensuelles",
        align: 'left'
      }
    };
  }
}
