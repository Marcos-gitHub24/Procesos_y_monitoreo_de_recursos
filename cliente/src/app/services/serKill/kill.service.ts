import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class KillService {

  public killSocket:WebSocket = new WebSocket("ws://localhost:8080/kill") 

  constructor() { 
        
  }

  getInfo(){
    this.killSocket.onopen = () => {
    }

    this.killSocket.onclose = (event) => {
      console.log("conexion cerrada:", event)
    }

    this.killSocket.onmessage = (msg) => {
    }

    this.killSocket.onerror = (error) => {
      console.log("****************************ACA HUBO ERROR******************")
      console.log("Error:", error)
    }
    
  }

  kill(proceso:any){
    this.killSocket.send(proceso)

  }
}
  

  
