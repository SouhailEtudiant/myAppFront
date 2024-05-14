import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { CookieService } from "ngx-cookie-service";
import { nombreUtilisateur } from "../../models/nombreUtilisateur.models";
import { EnvironmentUrlService } from "../../services/environment-url.service";
import { dashboard } from "../../models/dashboard.models";
import { dashboardMultiLine } from "../../models/dashboardMultiLine.models";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};


export type ChartOptionss = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './dashboard-v1.component.html',
  styleUrl: './dashboard-v1.component.css'
})
export class DashboardV1Component implements OnInit  {
 
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  @ViewChild("chart") charts: ChartComponent | undefined;
  public chartOptionsS: Partial<ChartOptions> | any;

  @ViewChild("chart") chartsPie: ChartComponent | undefined;
  public chartOptionsPie: Partial<ChartOptions> | any;
 

  cookieValue : string ="" ; 
  imp: nombreUtilisateur[]= [];
  nombreMembre: dashboard[]= [];
  dashboardMultiLine: dashboardMultiLine[]= [];
  strings: string[]= [];
  ListeProjet: string[]= [];
  nombers: Number[]= [];
  tacheEnCours: Number[]= [];
  tacheTermine: Number[]= [];
  tacheBug: Number[]= [];
  constructor( private  cookieService: CookieService, private router: Router, private http: HttpClient
    , private envUrl: EnvironmentUrlService, 
  ) {
 

    this.chartOptionsS = {
      series: [
        {
          name: "Income",
          type: "line",
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
        },
        {
          name: "Cashflow",
          type: "line",
          data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
        },
        {
          name: "Revenue",
          type: "line",
          data: [1.3, 4, 3.4, 2.3, 3.2, 5.4, 4.6, 5.6]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: true
      },
      // markers: {
      //   size: 5,
      //   colors: ['#5052FC', '#06CA98', "#ffba57", "#ED4C13"],
      //   opacity: 0.9,
      //   strokeWidth: 2,
      //   hover: {
      //       size: 7,
      //   }
      // },
      stroke: {
        width: [4, 4, 4]
      },
      title: {
        text: "XYZ - Stock Analysis (2009 - 2016)",
        align: "left",
        offsetX: 110
      },
    
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: "Income (thousand crores)",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              color: "#00E396"
            }
          },
          title: {
            text: "Operating Cashflow (thousand crores)",
            style: {
              color: "#00E396"
            }
          }
        },
        {
          seriesName: "Revenue",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FEB019"
          },
          labels: {
            style: {
              color: "#FEB019"
            }
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: "#FEB019"
            }
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('X-Access-Token')}`,    })
    }
  }  

  
ngOnInit()
 {
  this.cookieValue = this.cookieService.get('X-Access-Token');
  if ( this.cookieValue=="")
  {
    this.router.navigate(["/login"]) ; 
  }
  else { this.getData();this.getNumberOfUserByProject();this.getDashboardMultiLine();this.chartPie()}
 
}

getData (){
 
  this.http.get<nombreUtilisateur[]>(this.createCompleteRoute("api/Authentification/GetNumberOfUsers", this.envUrl.urlAddress), this.generateHeaders())
  .subscribe({
    next: (jou: nombreUtilisateur[]) => {this.imp = jou},
    
  }); 

}

getNumberOfUserByProject (){
 
  this.http.get<dashboard[]>(this.createCompleteRoute("api/MembreProjet/NombreEmployeeParProjet", this.envUrl.urlAddress), this.generateHeaders())
  .subscribe({
    next: (jou: dashboard[]) => {this.nombreMembre = jou
      for (let nb of this.nombreMembre) {
        this.strings.push(nb.libelle);
        this.nombers.push(nb.nombre)
          }
    },
    
  }); 



  this.chartOptions = {
    series: [
      {
        name: "Nombre",
        data: this.nombers
      }
    ],
    chart: {
      type: "bar",
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories:this.strings
    }
  };
}

getDashboardMultiLine (){
  this.http.get<dashboardMultiLine[]>(this.createCompleteRoute("api/Tache/dashboardMultiLine", this.envUrl.urlAddress), this.generateHeaders())
  .subscribe({
    next: (jou: dashboardMultiLine[]) => {this.dashboardMultiLine = jou
      for (let nb of this.dashboardMultiLine) {
        this.ListeProjet.push(nb.libelle);
        this.tacheBug.push(nb.tacheBug)
        this.tacheEnCours.push(nb.tacheEnCours)
        this.tacheTermine.push(nb.tacheTermine)
          }
          this.chartOptionsS = {
  
            series: [
              {
                name: "Tache En Cours",
                type: "line",
                data:  this.tacheEnCours
              },
              {
                name: "Tache Termine",
                type: "line",
                data:  this.tacheTermine
              },
              {
                name: "Bogue",
                type: "line",
                data: this.tacheBug
              }
            ],
            chart: {
              height: 350,
              type: "line",
              stacked: false,
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
                  reset: false  ,
                  customIcons: []
                },
                export: {
                  csv: {
                    filename: undefined,
                    columnDelimiter: ',',
                    headerCategory: 'category',
                    headerValue: 'value',
                    
                  },
                  svg: {
                    filename: undefined,
                  },
                  png: {
                    filename: undefined,
                  }
                },
                autoSelected: 'zoom' 
              },
            },
            
            markers: {
              size: 5,
              colors: ['#5052FC', '#06CA98', "#ffba57", "#ED4C13"],
              opacity: 0.9,
              strokeWidth: 2,
              hover: {
                  size: 7,
              }
            },
            stroke: {
              width: [4, 4, 4]
            },
            title: {
              text: "Nombre de type ticket par projet",
              align: "left",
              offsetX: 110
            },
          
            xaxis: {
              categories: this.ListeProjet
            },
            yaxis: [
              {
                axisTicks: {
                  show: true
                },
                axisBorder: {
                  show: true,
                  color: "#008FFB"
                },
                labels: {
                  style: {
                    color: "#008FFB"
                  }
                },
                title: {
                  text: "Nombre Tache",
                  style: {
                    color: "#008FFB"
                  }
                },
                
              },
              {
                seriesName: "Income",
                opposite: true,
                axisTicks: {
                  show: true
                },
                axisBorder: {
                  show: true,
                  color: "#00E396"
                },
                labels: {
                  style: {
                    color: "#00E396"
                  }
                },
                title: {
                  text: "Nombre Tache",
                  style: {
                    color: "#00E396"
                  }
                }
              },
             
            ],
            
           
          };
    },
    
  }); 




}

chartPie()
{
  this.chartOptionsPie = {
    series: this.nombers,
    chart: {
      type: "donut"
    },
    labels: this.strings,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
}
}

 
 
