import { Injectable } from '@angular/core';
import { ram } from '../../objeto/ram'

@Injectable({
  providedIn: 'root'
})
export class RamService {
  public socket: WebSocket = new WebSocket("ws://localhost:8080/info-ram");;
  public ram: ram = {libre:'', total:''};
  constructor() {
   }

   getRam(){

    this.socket.onopen = () => {
      this.socket.send("hola desde el cliente")
    }

    this.socket.onclose = (event) => {
      console.log("conexion cerrada:", event)
    }

    this.socket.onmessage = (msg) => {
      this.ram.libre = msg.data
      var datos = String(msg.data)
      var a = datos.split(',', 3)
      console.log(a)
      var ram_datos = []
      var contador = 0
      for (let i in a){
          var numero = Number(a[contador])
          ram_datos.push(numero)
        
        contador = contador + 1 
      }
      console.log(ram_datos)
      var ram_consumida:number = ram_datos[0] - ram_datos[1] - ram_datos[2]
      console.log('total',ram_datos[0])
      console.log('libre',ram_datos[1])
      console.log('cache',ram_datos[2])
      this.ram.total = ram_datos[0]
      this.ram.libre= ram_consumida
      this.ram.porcentaje = ((ram_consumida*100)/ram_datos[0]).toPrecision(4)
    }

    this.socket.onerror = (error) => {
      console.log("****************************ACA HUBO ERROR******************")
      console.log("Error:", error)
    }

    return this.ram
  }
}
