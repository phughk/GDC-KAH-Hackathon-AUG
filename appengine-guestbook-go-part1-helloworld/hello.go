package hello

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func init() {
	http.HandleFunc("/", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
	var myval string
	myval = funkyConnection()
	fmt.Fprint(w, myval)
}

func funkyConnection() string {
	resp, _ := http.Get("http://google.com")
	bodyBytes, _ := ioutil.ReadAll(resp.Body)
	return string(bodyBytes)
}

func findMood()
