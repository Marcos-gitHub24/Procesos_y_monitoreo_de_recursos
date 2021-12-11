import { Component, OnInit } from '@angular/core';
import { PruebaService } from '../../services/principal/prueba.service'
import { ram } from '../../objeto/ram'
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  ram:ram = {libre:'', total:''}
  constructor(private socket: PruebaService) {
    this.ram = this.socket.getRam()
   }

  ngOnInit(): void {
  }

}
