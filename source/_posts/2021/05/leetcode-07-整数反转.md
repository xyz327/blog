---
title: leetcode-07-整数反转
permalink: leetcode-07-整数反转
tags:
  - leetcode
categories:
  - leetcode
  - 算法
keywords: 'null'
toc: false
date: 2021-05-30 23:09:57
---

[7. 整数反转 - 力扣（LeetCode） (leetcode-cn.com)](https://leetcode-cn.com/problems/reverse-integer/)

用以10取模的方式依次把x的最小位的数字取出，然后以*10的方式累加

![1.jpg](https://pic.leetcode-cn.com/be35cb60bec9a9ae794abad671e6618abb5664780bc7ee30ca93ca423884a666-1.jpg)


```golang
func reverse(x int) int {
	res := 0
	for x != 0 {
		// 判断数据是否溢出
		if x > 0 && res > (math.MaxInt32 - x % 10) / 10 {
			return 0
		}
		if x < 0 && res < (math.MinInt32 - x % 10) / 10 {
			return 0
		}
		// res * 10 + x 的最后一位数
		res = res * 10 + x % 10
		x = x / 10
	}
	return res
}
```

