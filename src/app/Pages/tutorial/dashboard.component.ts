import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
// import * as js from '../../../assets/js/graph.js'
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ViewChild } from '@angular/core';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalScan: any;
  totalContact: any;
  totalMoney: any;
  smartobjects: any;
  seriess:any=[]
  @Input() chart!: ApexChart;
// @Input() annotations: ApexAnnotations;
@Input() colors!: string[];
// @Input() dataLabels: ApexDataLabels;
// @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
// @Input() stroke: ApexStroke;
@Input() labels!: string[];
// @Input() legend: ApexLegend;
// @Input() fill: ApexFill;
// @Input() tooltip: ApexTooltip;
// @Input() plotOptions: ApexPlotOptions;
// @Input() responsive: ApexResponsive[];
// @Input() xaxis: ApexXAxis;
// @Input() yaxis: ApexYAxis | ApexYAxis[];
// @Input() grid: ApexGrid;
// @Input() states: ApexStates;
// @Input() title: ApexTitleSubtitle;
// @Input() subtitle: ApexTitleSubtitle;
// @Input() theme: ApexTheme;
  // @ViewChild("chart")
  // chart!: ChartComponent;

  public chartOptions: Partial<ChartOptions> |any;
  ser=[];
  lab=[];
  series: any;
  constructor(private service:ApiService,private common:CommonService) { 
  
  }

  ngOnInit(): void {
 
    // js.doughnutChart();

    this.totalScanData();
    this.totalContactData();
    this.totalMoneySavedData();
    this.Smartobject();
   
  }
  totalScanData(){
    this.service.getTotalScans('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.totalScan=res.total
      }
      else {
        // this.common.error(res.msg);
  
      }
    })
  }
  totalContactData(){
    this.service.getTotalContact('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.totalContact=res.total
      }
      else {
        // this.common.error(res.msg);
  
      }
    })
  }
  totalMoneySavedData(){
    this.service.getTotalMoney('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.totalMoney=res.amount
      }
      else {
        // this.common.error(res.msg);
  
      }
    })
  }
Smartobject(){
    this.service.getsmartobject('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.smartobjects=res.items
        this.smartobjects.forEach((element:any)=> {
          console.log(element.tag_name,"tag_name")
          console.log(element.total,"total")
         
          this.seriess.push(element.seriess)
        //  element.total.push(this.seriess)
    // element.tag_name.push(this.lab)

        });
        this.chartOptions = {
          series: this.seriess,
          chart: {
            type: "donut"
          },
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270
            },
          },
          labels: this.lab,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width:300,
                

                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        }
      }
      else {
        // this.common.error(res.msg);
  
      }
    })
  }
 

}
