import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonService } from 'src/app/services/common/common.service';
// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as Chart from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { Router } from '@angular/router';
import * as moment from 'moment';
// import * as js from '../../../assets/js/graph.js'
//import { ChartComponent } from "ng-apexcharts";
// import { ChartOptions } from 'chart.js';
// import { Color, Label } from 'ng2-charts';

// import {
//   ApexNonAxisChartSeries,
//   ApexResponsive,
//   ApexChart
// } from "ng-apexcharts";
// import { ViewChild } from '@angular/core';
// export type ChartOptions = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   responsive: ApexResponsive[];
//   labels: any;
//   respons
// };



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // public lineChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  // ];
  // public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: (ChartOptions & { annotation?: any }) = {
  //   responsive: true,
  // };
  // public lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,0,0,0.3)',
  //   },
  // ];
  // public lineChartLegend = true;
  // public lineChartType = 'line';
  // public lineChartPlugins = [];

  // public doughnutChartLabels: Label[] = []
  public doughnutkeylist = [
    { key: "Calender", color: 'red', value:'' },
    { key: "Call sms", color: 'orange', value:'' },
    { key: "Contact", color: 'blue', value:'' },
    { key: "CV", color: '#FFA6D5', value:'' },
    { key: "Direction", color: '#9CC094', value:'' },
    { key: "E Menu", color: '#FF9292', value:'' },
    { key: "Emergency", color: '#FFF9B6', value:'' },
    { key: "Event", color: '#D8E9A8', value:'' },
    { key: "Link", color: '#D1E8E4', value:'' },
    { key: "Link Tree", color: '#B2F9FC', value:'' },
    { key: "Lost Found", color: '#334756', value:'' },
    { key: "Notes", color: '#FAEEE0', value:'' },
    { key: "Social", color: '#5C7AEA', value:'' },
    { key: "WhatsApp", color: '#345B63', value:'' },
    { key: "WIFI", color: '#316B83', value:'' }
  ];
  // public doughnutChartData: MultiDataSet = [[350, 450, 100]];
  // public doughnutChartType: ChartType = 'doughnut';
  // public doughnutChartColor:any = [];
  canvas: any;
  ctx: any;
  linechart: any;

  totalScan: any;
  totalContact: any;
  totalMoney: any = 0;
  smartobjects: any;
  seriess: any = []
  // @Input() chart!: ApexChart;
  // @Input() annotations: ApexAnnotations;
  @Input() colors!: string[];
  // @Input() dataLabels: ApexDataLabels;
  // @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  // @Input() stroke: ApexStroke;
  @Input() labels!: string[];
  month: any;
  montharray: any = []
  linevalue: any = []
  days: any = [];
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



  // public lineChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  // ];
  // public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: (ChartOptions & { annotation ?: any }) = {
  //   responsive: true,
  // };
  // public lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,0,0,0.3)',
  //   },
  // ];
  // public lineChartLegend = true;
  // public lineChartType = 'line';
  // public lineChartPlugins = [];

  // public chartOptions: Partial<ChartOptions> |any;
  // ser=[];
  // lab=[];
  // series: any;
  constructor(private service: ApiService, private common: CommonService, public router:Router) {

  }

  ngOnInit(): void {
    this.totalScanData();
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let canvasline: any = document.getElementById('areaChart_2');
    this.linechart = canvasline.getContext('2d');
  }

  totalScanData() {
    this.service.getTotalScans('').subscribe((res: any) => {
      this.totalContactData();
      this.totalMoneySavedData();
      this.Smartobject();
      this.graph()
      this.getActivity();
      if (res['success'] == 1) {
        this.totalScan = res.total
      }
      else if(res.http_status == '401'){
        this.common.error('You have been logged out for security purpose!');
        this.router.navigate(['']);
        // this.common.error(res.msg);

      }else{
        this.common.error(res.msg);
      }
    })
  }

  totalContactData() {
    this.service.getTotalContact('').subscribe((res: any) => {
      if (res['success'] == 1) {
        this.totalContact = res.total
      }
      else {
        // this.common.error(res.msg);

      }
    })
  }
  totalMoneySavedData() {
    this.service.getTotalMoney('').subscribe((res: any) => {
      if (res['success'] == 1) {
this.totalMoney =  res.amount / 100;
}
      else {
        // this.common.error(res.msg);

      }
    })
  }
  Smartobject() {
    this.service.getsmartobject('').subscribe((res: any) => {
      if (res['success'] == 1) {
        //console.log(res.items)
        this.smartobjects = res.items
        this.smartobjects.forEach((element: any) => {
          //console.log(element.tag_name, "tag_name")
          //console.log(element.total, "total")

          this.seriess.push(element.seriess)
          //  element.total.push(this.seriess)
          // element.tag_name.push(this.lab)

        });
        // this.chartOptions = {
        //   series: this.seriess,
        //   chart: {
        //     type: "donut"
        //   },
        //   plotOptions: {
        //     pie: {
        //       startAngle: -90,
        //       endAngle: 270
        //     },
        //   },
        //   labels: this.lab,
        //   responsive: [
        //     {
        //       breakpoint: 480,
        //       options: {
        //         chart: {
        //           width:300,


        //         },
        //         legend: {
        //           position: "bottom"
        //         }
        //       }
        //     }
        //   ]
        // }
      }
      else {
        // this.common.error(res.msg);

      }
    })
  }


  graph() {
    this.service.appGraph('').subscribe((res: any) => {
      //console.log(res)
      if (res['success'] == 1) {
        //console.log(this.doughnutkeylist)
        // //console.log(Object.values(res.items))
        // this.doughnutChartLabels = ["Calender", "Call sms", "Contact", "CV", "Direction", "E Menu", "Emergency", "Event","Link","Link Tree"];
        let doughnutChartData = [
          parseFloat(res.items.calendar),
          parseFloat(res.items.call_sms),
          parseFloat(res.items.contact),
          parseFloat(res.items.cv),
          parseFloat(res.items.directions),
          parseFloat(res.items.emenu),
          parseFloat(res.items.emergency),
          parseFloat(res.items.event),
          parseFloat(res.items.link),
          parseFloat(res.items.linktree),
          parseFloat(res.items.lost_found),
          parseFloat(res.items.notes),
          parseFloat(res.items.social),
          parseFloat(res.items.whatsApp),
          parseFloat(res.items.wifi)
        ]

        this.doughnutkeylist = [
          { key: "Calender", color: 'red', value:res.items.calendar },
          { key: "Call sms", color: 'orange', value:res.items.call_sms },
          { key: "Contact", color: 'blue', value:res.items.contact },
          { key: "CV", color: '#FFA6D5', value:res.items.cv },
          { key: "Direction", color: '#9CC094', value:res.items.directions },
          { key: "E Menu", color: '#FF9292', value:res.items.emenu },
          { key: "Emergency", color: '#FFF9B6', value:res.items.emergency},
          { key: "Event", color: '#D8E9A8', value:res.items.event },
          { key: "Link", color: '#D1E8E4', value:res.items.link },
          { key: "Link Tree", color: '#B2F9FC', value:res.items.linktree },
          { key: "Lost Found", color: '#334756', value:res.items.lost_found },
          { key: "Notes", color: '#FAEEE0', value:res.items.notes },
          { key: "Social", color: '#5C7AEA', value:res.items.social },
          { key: "WhatsApp", color: '#345B63', value:res.items.whatsApp },
          { key: "WIFI", color: '#316B83', value:res.items.wifi }
        ];
        //console.log(this.doughnutkeylist)
        //console.log(res['items']);
        const myChart = new Chart(this.ctx, {
          type: 'doughnut',
          data: {
            labels:
             [
              "Calender",
              "Call sms",
              "Contact",
              "CV",
              "Direction",
              "E Menu",
              "Emergency",
              "Event", 
              "Link",
              "Link Tree",
              "Lost Found",
              "Notes",
              "Social",
              "WhatsApp",
              "WIFI"],
            datasets: [{
              label: 'Total cases.',
              data: doughnutChartData,
              backgroundColor: ['red', 'orange', 'blue', '#FFA6D5', '#9CC094', '#FF9292', '#FFF9B6', '#D8E9A8', '#D1E8E4', '#B2F9FC', '#334756', '#FAEEE0', '#5C7AEA', '#345B63', '#316B83'],
              borderWidth: 0,
              weight: 5,
            }]
          },
          options: {
            legend: {
              display: false
            },
            responsive: true,
            cutoutPercentage: 78,
            maintainAspectRatio: false,
          }
        });
      }
    })
  }

  getActivity() {
    this.service.ActivityHistoryPerDay('').subscribe((res: any) => {
      console.log(res)
      if (res['success'] == 1) {
        // let last7day = res.items
         const arr = res.items.map((day: any) => day.created_on.slice(-5));
       // console.log(arr)
        this.days = arr
        for (let j = 0; j < res.items.length; j++) {
          this.linevalue.push(res.items[j].total)
        }
        // for (let i = 0; i < arr.length; i++) {
        //   switch (arr[i]) {
        //     case '01':
        //       this.month = "January";
        //       break;
        //     case '02':
        //       this.month = "February";
        //       break;
        //     case '03':
        //       this.month = "March";
        //       break;
        //     case '04':
        //       this.month = "April";
        //       break;
        //     case '05':
        //       this.month = "May";
        //       break;
        //     case '06':
        //       this.month = "June";
        //       break;
        //     case '07':
        //       this.month = "July";
        //       break;
        //     case '08':
        //       this.month = "August";
        //       break;
        //     case '09':
        //       this.month = "September";
        //       break;
        //     case '10':
        //       this.month = "October";
        //       break;
        //     case '11':
        //       this.month = "November";
        //       break;
        //     case '12':
        //       this.month = "December";
        //       break;
        //   }
        //   this.montharray.push(this.month)

        // }

        const areaChart_2gradientStroke = this.linechart.createLinearGradient(0, 1, 0, 500);
        areaChart_2gradientStroke.addColorStop(0, "rgba(20, 122, 214, 0.3)");
        areaChart_2gradientStroke.addColorStop(1, "rgba(51, 51, 64, 0.1)");

        const myChart = new Chart(this.linechart, {
          type: 'line',
          data: {
            // labels: ["Calender", "Call sms", "Contact", "CV", "Direction", "E Menu", "Emergency", "Event", "Link", "Link Tree", "Lost Found", "Notes", "Social", "WhatsApp", "WIFI"],
            labels: this.days,
            datasets: [{
              label: 'Total cases.',
              data: this.linevalue,
              borderColor: "#147AD6",
              borderWidth: 3,
              backgroundColor: areaChart_2gradientStroke
            }]
          },
          // options: {
          //   legend: {
          //     display: false
          //   },
          //   responsive: false,
          //   // display: true
          // }
          options: {
            legend: { display: false },
            scales: {
              yAxes: [{
                gridLines: {
                  display: false,
                },
                ticks: {
                  beginAtZero: true,
                  max: 50,
                  min: 0,
                  stepSize: 10,
                  padding: 5
                }

              }],
              xAxes: [{
                gridLines: {
                  display: false,
                },
                ticks: {
                  padding: 5
                }
              }]
            }
          }


        });
      }
    })
  }





}
