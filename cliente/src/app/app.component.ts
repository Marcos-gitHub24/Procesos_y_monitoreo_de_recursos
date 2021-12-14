import { Component, OnInit } from '@angular/core';
import { PruebaService } from './services/principal/prueba.service';
import { ram } from './objeto/ram'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cliente';
  mensaje:string = "asdasd";
  ram:ram = {libre:'', total:''}
  otro:ram = {libre:'', total: ''}

  public constructor(){
    
  }

  public ngOnInit(){
    //this.ram = this.socket.ram
  }
}
