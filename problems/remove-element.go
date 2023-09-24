package main

import "fmt"

// https://leetcode.com/problems/remove-element/
func removeElement(nums []int, val int) int {
	found := 0

	for i := 0; i < len(nums); {
		if nums[i] == val {
			// edit nums in-place 2nd requirement
			nums = append(nums[:i], nums[i+1:]...)
		} else {
			// vals found 1st requirement
			found++
			i++
		}
	}

	return found
}

func main() {
	fmt.Println(removeElement([]int{3, 2, 2, 3}, 3) == 2)
}
