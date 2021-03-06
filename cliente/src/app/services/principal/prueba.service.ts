import { Injectable } from '@angular/core';
import { ram } from '../../objeto/ram'

@Injectable({
  providedIn: 'root'
})
export class PruebaService {
  public socket: WebSocket = new WebSocket("ws://localhost:8080/prueba");
  
  public ram:ram = {libre:'', total: ''};
  constructor() {
  }
  getInfo(){

    this.socket.onopen = () => {
      this.socket.send("hola desde el cliente")
    }

    this.socket.onclose = (event) => {
      console.log("conexion cerrada:", event)
    }

    this.socket.onmessage = (msg) => {
      this.ram.libre = msg.data
    }

    this.socket.onerror = (error) => {
      console.log("****************************ACA HUBO ERROR******************")
      console.log("Error:", error)
    }

    return this.ram
  }

  
    
}
