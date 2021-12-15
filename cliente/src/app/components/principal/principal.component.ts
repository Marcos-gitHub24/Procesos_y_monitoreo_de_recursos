import { Component, OnInit } from '@angular/core';
import { PruebaService } from '../../services/principal/prueba.service'
import { KillService } from '../../services/serKill/kill.service'
import { ram } from '../../objeto/ram'
import { proceso } from '../../objeto/procesos'
import { proc } from '../../objeto/proc'
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  ram: ram = { libre: '', total: '' }
  render:boolean = true
  procesos: proceso = { total: 0, ejecucion: 0, suspendido: 0, detenido: 0, zombie: 0 }
  procs: proc = { pid: '', nombre: '', usuario: '', estado: '', ram: '', hijos: [] }
  public total = 0
  ejecucion = 0
  suspendidos = 0
  detenidos = 0
  zombie = 0
  vector = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  procesos_principal: any = []
  panelOpenState = false
  constructor(private socket: PruebaService, private killSocket: KillService) {

  }

  ngOnInit(): void {
    setInterval(() => {
      this.ram = this.socket.getInfo()
      this.total = 0
      var posicion = 0
      var procs: any[]
      var aux: Number = 0
      this.ejecucion = 0
      this.suspendidos = 0
      this.detenidos = 0
      this.zombie = 0
      this.procesos_principal = []
      if (this.ram.libre != NaN && this.ram.libre != '') {
        var vector: any = String(this.ram.libre).split('\n')
        while (posicion < vector.length) {

          if (vector[posicion] != NaN && vector[posicion] != '') {
            var objeto = JSON.parse(vector[posicion])
            var nuevo_proceso: proc = { pid: '', nombre: '', usuario: 'root', estado: '', ram: '0.0', hijos: [] }
            if (objeto.padre == "201903895") {
              this.total = this.total + 1
              if (objeto.estado == "0") {
                this.ejecucion = this.ejecucion + 1
                objeto.estado = 'Ejecución'
              }
              else if (objeto.estado == "1" || objeto.estado == "1026") {
                this.suspendidos = this.suspendidos + 1
                objeto.estado = 'Suspendido'
              }
              else if (objeto.estado == "4") {
                this.zombie = this.zombie + 1
                objeto.estado = 'Zombie'
              }
              else if (objeto.estado == "8") {
                this.detenidos = this.detenidos + 1
                objeto.estado = 'Detenido'
              }


              if (objeto.hasOwnProperty('ram')) {
                var cantidad = ((Number(objeto.ram) * 100) /(7716)).toFixed(6)
                nuevo_proceso.ram = cantidad
                aux = Number(aux) + Number(cantidad)

              }
              nuevo_proceso.nombre = objeto.nombre
              nuevo_proceso.pid = objeto.pid
              nuevo_proceso.usuario = objeto.usuario
              nuevo_proceso.estado = objeto.estado
              nuevo_proceso.usuario = objeto.uid

              var posicion2 = 0
              while (posicion2 < vector.length) {
                if (vector[posicion2] != NaN && vector[posicion2] != '') {
                  var objeto2 = JSON.parse(vector[posicion2])
                  if (objeto2.padre == nuevo_proceso.pid) {
                    nuevo_proceso.hijos.push(objeto2)
                  }
                }
                posicion2 = posicion2 + 1
              }
              this.procesos_principal.push(nuevo_proceso)

            }
          }

          posicion = posicion + 1

        }
      }
      this.procesos.total = this.total
      this.procesos.ejecucion = this.ejecucion
      this.procesos.detenido = this.detenidos
      this.procesos.suspendido = this.suspendidos
      this.procesos.zombie = this.zombie
    }, 3000)
  }

  esconder(){
    this.render = !this.render
  }

  kill(proceso:any){
    this.killSocket.kill(proceso)
    this.killSocket.reanudar()
  }
 
 
 
}
