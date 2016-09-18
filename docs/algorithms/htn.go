package main

import "fmt"
import "time"

func main() {
  for i:=0;; i++ {
  time.Sleep(time.Second);
  fmt.Printf("User %d just joined!\n", i);
  }
}
