package main

import "fmt"

func lengthOfLastWord(s string) int {
	n := len(s)
	foundWord := false
	l := 0

	for i := n - 1; i >= 0; i-- {
		if s[i] == ' ' && foundWord {
			return l
		}

		if s[i] != ' ' {
			foundWord = true
		}

		if foundWord {
			l++
		}
	}

	return l
}

func main() {
	fmt.Println(lengthOfLastWord("Hello World") == 5)
}
