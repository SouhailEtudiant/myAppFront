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

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})
export class DashboardUserComponent implements OnInit {
  @ViewChild("chart") charts: ChartComponent | undefined;
  public chartOptionsS: Partial<ChartOptions> | any;
   
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;
  id : string  | null  ="" ;
  cookieValue : string ="" ; 
  imp: nombreUtilisateur[]= [];
  nombreMembre: dashboard[]= [];
  dashboardMultiLine: dashboardMultiLine[]= [];
  strings: string[]= [];
  dates: string[]= [];
  nombers: Number[]= [];
  tacheEnCours: Number[]= [];
  tacheTermine: Number[]= [];
  tacheBug: Number[]= [];
  role : string | null  =""
  constructor( private  cookieService: CookieService, private router: Router, private http: HttpClient
    , private envUrl: EnvironmentUrlService, 
  ){}

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
    this.role= localStorage.getItem('role')  ; 
   this.cookieValue = this.cookieService.get('X-Access-Token');
   this.role= localStorage.getItem('role')  ; 
   if ( this.cookieValue=="")
   {
     this.router.navigate(["/login"]) ; 
   } else if (this.role == "Adminstrateur"){this.router.navigate(["/accessDenied"]) }
   else { this.getData();this.getDashboardMultiLine();this.getNumberOfUserByProject ();}
  
 }
 
  getData (){
    this.id = localStorage.getItem('id') ;
      this.http.get<nombreUtilisateur[]>(this.createCompleteRoute("api/Tache/GetNombreOfTasks?userId="+this.id, this.envUrl.urlAddress), this.generateHeaders())
      .subscribe({
        next: (jou: nombreUtilisateur[]) => {this.imp = jou},
        
      }); 
  }

  getDashboardMultiLine (){
    this.id = localStorage.getItem('id') ;
    this.http.get<dashboardMultiLine[]>(this.createCompleteRoute("api/Tache/dashboardMultiLineUser?userId="+this.id, this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: dashboardMultiLine[]) => {this.dashboardMultiLine = jou
        for (let nb of this.dashboardMultiLine) {
          this.strings.push(nb.libelle);
          this.tacheBug.push(nb.tacheBug)
          this.tacheEnCours.push(nb.tacheEnCours)
          this.tacheTermine.push(nb.tacheTermine)
            }


            this.chartOptionsS = {
    
              series: [
                {
                  name: "Tache En Cours",
                  type: "area",
                  data:  this.tacheEnCours
                },
                {
                  name: "Tache Termine",
                  type: "area",
                  data:  this.tacheTermine
                },
                {
                  name: "Bogue",
                  type: "area",
                  data: this.tacheBug
                }
              ],
              chart: {
                height: 350,
                type: "area",
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
                categories: this.strings
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


  getNumberOfUserByProject (){
    this.id = localStorage.getItem('id') ;
    this.http.get<dashboard[]>(this.createCompleteRoute("api/Imputation/DashboardImputation?userId="+this.id, this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: dashboard[]) => {this.nombreMembre = jou
        for (let nb of this.nombreMembre) {
          this.dates.push(nb.libelle);
          this.nombers.push(nb.nombre)
            }

            this.chartOptions = {
              series: [
                {
                  name: "Nombre d'heure",
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
                categories:this.dates
              }
            };
      },
      
    }); 
  
  
  

  }

}
