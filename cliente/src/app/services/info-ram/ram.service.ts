import { Injectable } from '@angular/core';
import { ram } from '../../objeto/ram'

@Injectable({
  providedIn: 'root'
})
export class RamService {
  public socket: WebSocket;
  public ram: ram = {libre:'', total:''};
  constructor() {
    this.socket = new WebSocket("ws://localhost:8080/info-cpu");
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
      console.log(msg.data)
      console.log('----------------cpu------------------------------')
      console.log(this.ram)
    }

    this.socket.onerror = (error) => {
      console.log("****************************ACA HUBO ERROR******************")
      console.log("Error:", error)
    }

    return this.ram
  }
}
