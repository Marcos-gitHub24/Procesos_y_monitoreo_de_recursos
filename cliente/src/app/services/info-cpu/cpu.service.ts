import { Injectable } from '@angular/core';
import { ram } from '../../objeto/ram'

@Injectable({
  providedIn: 'root'
})
export class CpuService {
  public socket: WebSocket;
  public ram: ram = {libre:'', total:''};
  constructor() {
    this.socket = new WebSocket("ws://localhost:8080/info-cpu");
   }

   getCpu(){

    this.socket.onopen = () => {
      this.socket.send("hola desde el cliente")
    }

    this.socket.onclose = (event) => {
      console.log("conexion cerrada:", event)
    }

    this.socket.onmessage = (msg) => {
      this.ram.libre = msg.data
      var datos = String(msg.data)
      var a = datos.split('\n', 51)
      var procesos = []
      
      var contador = 0
      var porcentaje = 0
      for (let i in a){
        if (contador != 0){
          var numero = Number(a[contador])
          procesos.push(numero)
          porcentaje = porcentaje + numero
        }
        contador = contador + 1 
      }
      console.log('----------------Porcentaje-----------------------')
      console.log(porcentaje)
      this.ram.libre = porcentaje
      localStorage.setItem('porcentaje', String(porcentaje))
      console.log(this.ram.libre)
      porcentaje = 0
    }

    this.socket.onerror = (error) => {
      console.log("****************************ACA HUBO ERROR******************")
      console.log("Error:", error)
    }
    
    return this.ram
  }
}
