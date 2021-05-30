---
title: leetcode-01-两数之和
permalink: leetcode-01-两数之和
tags:
  - leetcode
categories:
  - leetcode
  - 算法
keywords: 'null'
toc: false
date: 2021-05-30 18:51:42
---

[1. 两数之和 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/two-sum/)


解题思路：
x+y=target；

解题1：

用双重循环的方式

```golang
func twoSum(nums []int, target int) []int {
  for i, x := range nums {
    for j, y := range nums {
      if i == j {
        continue
      }
      if x + y == target {
        return []int{x, y};
      }
    }
  }
  return nil
}
```

解题2

上面根据x查找y是使用暴力法遍历查找

用 map 的方式优化根据 x 查找 y 的流程

```golang
func twoSum1(nums []int, target int) []int {
	targetMap := map[int]int{}
	for i, x := range nums {
		if _, ok := targetMap[target-x]; ok {
			return []int{i, targetMap[target-x]}
		}
		targetMap[x] = i
	}
	return nil
}
```

