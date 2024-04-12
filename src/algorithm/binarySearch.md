---
date: 2020-10-16
category:
  - Java
  - 数据结构与算法
tag:
  - 查找
---

# 《二分查找》

> 算法描述：

+ 二分查找也称折半查找，它是一种效率较高的查找方法，要求列表中的元素首先要
进行有序排列。
+ 首先，假设表中元素是按升序排列，将表中间位置记录的关键字与查找关键字比较，
如果两者相等，则查找成功；
+ 否则利用中间位置记录将表分成前、后两个子表，如果中间位置记录的关键字大于
查找关键字，则进一步查找前一子表，否则进一步查找后一子表。
+ 重复以上过程，直到找到满足条件的记录，使查找成功，或直到子表不存在为止，
此时查找不成功。

> 代码实现

```java
public static int binarySearch(int[] arr, int left, int right, int findVal){
        if (left > right) {
            return -1;
        }

        int middleIndex = (left + right) / 2;

        if (findVal < arr[middleIndex]) {
            return binarySearch(arr,left,middleIndex,findVal);
        }else if (findVal > arr[middleIndex]) {
            return binarySearch(arr,middleIndex,right,findVal);
        }else {
            return middleIndex;
        }
    }
```