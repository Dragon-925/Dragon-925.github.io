---
date: 2020-10-16
category:
  - Java
  - 数据结构与算法
tag:
  - 排序
---

# 《快速排序》

时间复杂度：

+ 平均：O(nlog<sub>2</sub>n)

+ 最坏：O(n<sup>2</sup>)

+ 最好：O(nlog<sub>2</sub>n)

空间复杂度：O(nlog<sub>2</sub>n)

不稳定

> 算法描述：

使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：
+ 从数列中挑出一个元素，称为 “基准”（pivot）
+ 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆
在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的
中间位置。这个称为分区（partition）操作；
+ 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

> 代码实现

```java
public static void quickSort(int[] data, int low, int high) {
        int i, j, temp, t;
        if (low > high) {
            return;
        }
        i = low;
        j = high;
        temp = data[low];
        while (i < j){
            while (data[j] >= temp && i < j) {
                j--;
            }
            while (data[i] <= temp && i < j) {
                i++;
            }
            if (i < j) {
                t = data[j];
                data[j] = data[i];
                data[i] = t;
            }
        }
        data[low] = data[i];
        data[i] = temp;

        quickSort(data,low,j - 1);
        quickSort(data,j + 1,high);
    }
```