package main

import "fmt"

// V1
// time  O(n)
// space O(1)
func searchInsert(nums []int, target int) int {
	for i := 0; i < len(nums); i++ {
		if nums[i] >= target {
			return i
		}
	}

	// its a big number!
	return len(nums)
}

// v2
// time  O(log n)
// space O(1)
func blazingFastSearchInsert(nums []int, target int) int {
	leftIndex := 0
	rightIndex := len(nums) - 1

	for leftIndex < rightIndex {
		index := leftIndex + ((rightIndex - leftIndex) / 2)

		if nums[index] == target {
			return index
		} else if nums[index] < target {
			leftIndex = index + 1
		} else {
			rightIndex = index - 1
		}
	}

	return len(nums)
}

func main() {
	fmt.Println(searchInsert([]int{1, 3, 5, 6}, 5) == 2)
	fmt.Println(blazingFastSearchInsert([]int{1, 2, 3, 4, 5}, 4) == 3)
}
