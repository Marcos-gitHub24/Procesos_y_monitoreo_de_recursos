import { Component, OnInit, ViewChild } from '@angular/core';
import { RamService } from '../../services/info-ram/ram.service';
import { ram } from '../../objeto/ram'
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, baseColors } from 'ng2-charts'
@Component({
  selector: 'app-info-ram',
  templateUrl: './info-ram.component.html',
  styleUrls: ['./info-ram.component.css']
})
export class InfoRamComponent implements OnInit {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective| any;

  ram: ram = { libre: '', total: '' }
  
  public lineChartData: ChartDataset[] = [
    { data: [], label: 'Consumo de memoria RAM (MB)' },
  ];
  public lineChartLabels:string[] = [];

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  
  };
  /*public lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];*/
  public lineChartLegend = true;
  public lineChartType:ChartType = 'line';
  public lineChartPlugins = [];
  public lineChartLabel = {}


  constructor(private socket: RamService) { }

  ngOnInit(): void {
    this.ram = this.socket.getRam()
    //this.ram.libre = Number(localStorage.getItem('porcentaje'))
    
    setInterval(()=>{
      var time = new Date()
      this.lineChartData[0].data.push( this.ram.porcentaje);
      if(this.lineChartData[0].data.length >12){
        this.lineChartData[0].data.shift()
      }
      this.lineChartLabels.push(time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', second:'numeric',hour12: true }));
      if(this.lineChartLabels.length >12){
        this.lineChartLabels.shift()
      }
      
      this.chart.chart.update();
      
      console.log('-------------TIEMPO---------')
      console.log( time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', second:'numeric',hour12: true }))
    },2000)
    console.log(this.lineChartData[0].data)
  }

}
