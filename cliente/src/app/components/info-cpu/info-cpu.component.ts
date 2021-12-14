import { Component, OnInit, ViewChild } from '@angular/core';
import { CpuService } from '../../services/info-cpu/cpu.service';
import { ram } from '../../objeto/ram'
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, baseColors } from 'ng2-charts'
@Component({
  selector: 'app-info-cpu',
  templateUrl: './info-cpu.component.html',
  styleUrls: ['./info-cpu.component.css']
})
export class InfoCpuComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective| any;

  ram: ram = { libre: '', total: '' }
  
  public lineChartData: ChartDataset[] = [
    { data: [], label: 'Porcentaje de CPU utilizado' },
  ];
  public lineChartLabels:string[] = [];

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
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

  constructor(private socket: CpuService) {
    //this.ram = this.socket.getCpu()

    
  }

  ngOnInit(): void {
    this.ram = this.socket.getCpu()
    this.ram.libre = Number(localStorage.getItem('porcentaje'))
    
    setInterval(()=>{
      var time = new Date()
      this.lineChartData[0].data.push( this.ram.libre);
      if (this.lineChartData[0].data.length >12){
        this.lineChartData[0].data.shift()
      }
      this.lineChartLabels.push(time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', second:'numeric',hour12: true }));
      if (this.lineChartLabels.length >12){
        this.lineChartLabels.shift()
      }
      this.chart.chart.update();
      
      console.log('-------------TIEMPO---------')
      console.log( time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', second:'numeric',hour12: true }))
    },2000)
    console.log(this.lineChartData[0].data)
  }

}
