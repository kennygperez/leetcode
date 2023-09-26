package main

import "fmt"

// https://leetcode.com/problems/plus-one/description/
func plusOne(digits []int) []int {
	// count backwards
	for i := len(digits) - 1; i >= 0; i-- {
		digit := digits[i]

		// no need todo anything
		if digit+1 < 10 {
			digits[i]++

			return digits
		}

		// add one
		digits[i] = (digits[i] + 1) % 10

		// if were at the last num cascade to the left
		if i == 0 {
			digits = append([]int{0}, digits...)
			i++
		}
	}

	return digits
}

func main() {
	fmt.Println(plusOne([]int{1, 2, 3}))
	fmt.Println(plusOne([]int{4, 3, 2, 1}))
	fmt.Println(plusOne([]int{9}))
}
