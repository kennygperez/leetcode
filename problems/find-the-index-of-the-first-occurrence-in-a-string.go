package main

import (
	"fmt"
	"strings"
)

// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
func strStr(haystack string, needle string) int {
	return strings.Index(haystack, needle)
}

func main() {
	fmt.Println(strStr("sadbutsad", "sad") == 0)
}
