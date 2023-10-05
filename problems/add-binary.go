package main

import (
	"fmt"
)

//
// @see https://leetcode.com/problems/add-binary
//

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

func addBinary(a string, b string) string {
	max := max(len(a), len(b))
	carry := false
	result := ""

	for i := 1; i <= max; i++ {
		indexA := len(a) - i
		indexB := len(b) - i
		count := 0

		if indexA >= 0 {
			digA := a[indexA : indexA+1]

			if digA == "1" {
				count++
			}
		}

		if indexB >= 0 {
			digB := b[indexB : indexB+1]

			if digB == "1" {
				count++
			}
		}

		if carry {
			count++
		}

		if count == 0 {
			result = "0" + result
			carry = false
		}
		if count == 1 {
			result = "1" + result
			carry = false
		}
		if count == 2 {
			result = "0" + result
			carry = true
		}
		if count == 3 {
			result = "1" + result
			carry = true
		}
	}

	if carry {
		result = "1" + result
	}

	return result
}

func main() {
	output := addBinary("11", "1")
	fmt.Println("test 1:", output, output == "100")

	output = addBinary("1010", "1011")
	fmt.Println("test 2:", output, output == "10101")
}
