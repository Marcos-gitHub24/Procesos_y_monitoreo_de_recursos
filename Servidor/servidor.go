package main

import (
	"fmt"
	"io/ioutil" // lectura del archivo cat es opcional
	"log"
	"net/http"
	"time"

	"os/exec" //para ejecutar comando en consola

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

/*func reader(conn *websocket.Conn) {
	for {
		out, errr := ioutil.ReadFile("/proc/memo_201903895")

		if errr != nil {
			log.Fatal(errr)
		}
		if err := conn.WriteMessage(1, []byte(out)); err != nil {
			log.Println(err)
			return
		}
		time.Sleep(2 * time.Second)
	}
}*/

func ramFunc(w http.ResponseWriter, r *http.Request) {
	go fmt.Println("Request al endpoint prueba...")

	/*cmd := exec.Command("sh", "-c", "cat /proc/memo_201903895")
	out, err := cmd.CombinedOutput()

	output := string(out[:])
	fmt.Fprintf(w, output)*/
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	log.Println("Cliente conectado")
	for {
		out, errr := ioutil.ReadFile("/proc/memo_201903895")

		if errr != nil {
			log.Fatal(errr)
		}

		cmd := exec.Command("sh", "-c", "free --mega | head -n 2 | tail -n 1 | awk '{print $6}' ")
		cache, err := cmd.CombinedOutput()

		if err != nil {
			log.Fatal(err)
		}

		resultado := string(out) + string(',') + string(cache)

		if err := ws.WriteMessage(1, []byte(resultado)); err != nil {
			log.Println(err)
			return
		}
		time.Sleep(2 * time.Second)
	}
	//writer(ws)
}

func procesosFunc(w http.ResponseWriter, r *http.Request) {
	go fmt.Println("Request al endpoint prueba...")

	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	log.Println("Cliente conectado")
	for {
		cmd := exec.Command("sh", "-c", "cat /proc/cpu_201903895")
		out, err := cmd.CombinedOutput()

		if err != nil {
			log.Fatal(err)
		}
		if err := ws.WriteMessage(1, []byte(out)); err != nil {
			log.Println(err)
			return
		}
		time.Sleep(2 * time.Second)
	}
	//writer(ws)
}

func cpuFunc(w http.ResponseWriter, r *http.Request) {
	go fmt.Println("Request al endpoint prueba...")

	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	log.Println("Cliente conectado")
	for {
		cmd := exec.Command("sh", "-c", "ps -eo pcpu | sort -k 1 -r | head -70")
		out, err := cmd.CombinedOutput()

		if err != nil {
			log.Fatal(err)
		}
		if err := ws.WriteMessage(1, []byte(out)); err != nil {
			log.Println(err)
			return
		}
		time.Sleep(2 * time.Second)
	}
}

func killFunc(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()

	mt, message, err := c.ReadMessage()
	if err != nil {
		log.Println("read:", err)

	}
	log.Print(mt)

	cmd := exec.Command("sh", "-c", "kill -9 "+string(message))
	cmd.CombinedOutput()
}

func locustFunc(w http.ResponseWriter, r *http.Request) {
	output := ""
	fmt.Fprintf(w, output)
}

func main() {
	go fmt.Println("levantando servidor...")
	//http.HandleFunc("/", homepage)
	http.HandleFunc("/prueba", procesosFunc)
	http.HandleFunc("/info-ram", ramFunc)
	http.HandleFunc("/info-cpu", cpuFunc)
	http.HandleFunc("/locust", locustFunc)
	http.HandleFunc("/kill", killFunc)
	go fmt.Println(("Servidor levantado en: 8080"))
	err := http.ListenAndServe(":8080", nil)

	if err != nil {
		log.Fatal(err)
	}

}
