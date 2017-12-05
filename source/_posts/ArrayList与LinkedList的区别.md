---
title: ArrayList与LinkedList的区别
date: 2017-12-05 11:58:10
tags: [jdk, java]
categories: java
keywords: java
---
### java中`ArrayList`和`LinkedList`的区别

1. <font style="color:green">`ArrayList`是实现了基于动态数组的数据结构，`LinkedList`基于链表的数据结构。</font>
1. 对于随机访问`get`和`set`，`ArrayList`觉得优于`LinkedList`，因为`LinkedList`要移动指针。
1. 对于新增和删除操作`add`和`remove`，`LinedList`比较占优势，因为`ArrayList`要移动数据。

### `ArrayList`使用动态数组存储数据，

使用无参构造函数时默认大小是`10`，初始化时动态数组是个空数组`{}`

当数组容量不够时会扩容，扩容方式是 `newCapacity=oldCapacity+(oldCapacity>>1)`, 当前数组大小*1.5
所以当插入数据量比较大时可能会浪费一部分空间，在可以确定数据量大小时给定初始化容量大小可以提高效率
在空间分配完毕后可以使用`trimToSize`去除掉多余的空间

### `LinkedList`使用链表存储数据，

内部使用一个`Node`的结构， 存储数据和前后节点信息

```java
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}
```

### 总结 

`ArrayList`和`LinkedList`在性能上各有优缺点，都有各自所适用的地方，总的说来可以描述如下： 

1．对`ArrayList`和`LinkedList`而言，在列表末尾增加一个元素所花的开销都是固定的。
  1.1 对`ArrayList`而言，主要是在内部数组中增加一项，指向所添加的元素，偶尔可能会导致对数组重新进行分配；
  1.2 而对`LinkedList`而言，这个开销是统一的，分配一个内部`Node`对象。

2．在`ArrayList`的中间插入或删除一个元素意味着这个列表中剩余的元素都会被移动；而在`LinkedList`的中间插入或删除一个元素的开销是固定的。

3．`LinkedList`不支持高效的随机元素访问。

4．`ArrayList`的空间浪费主要体现在在list列表的结尾预留一定的容量空间，而`LinkedList`的空间花费则体现在它的每一个元素都需要消耗相当的空间

可以这样说：

<font style="color:green">当操作是在一列数据的后面添加数据而不是在前面或中间,并且需要随机地访问其中的元素时,使用`ArrayList`会提供比较好的性能；</font><br/>

<font style="color:green">当你的操作是在一列数据的前面或中间添加或删除数据,并且按照顺序访问其中的元素时,就应该使用`LinkedList`了。</font>