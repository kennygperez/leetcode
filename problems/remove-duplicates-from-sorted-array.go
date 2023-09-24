package main

import "fmt"

// https://leetcode.com/problems/remove-duplicates-from-sorted-array
func removeDuplicates(nums []int) int {
	mySet := map[int]bool{}

	for i := 0; i < len(nums); i++ {
		if mySet[nums[i]] == true {
			nums = append(nums[:i], nums[i+1:]...)
			i--
		} else {
			mySet[nums[i]] = true
		}
	}

	return len(mySet)
}

func main() {
	fmt.Println(removeDuplicates([]int{1, 1, 2}) == 2)
}
