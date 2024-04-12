---
icon: /icons/tool.svg
date: 2020-10-15
category:
  - Java
  - 数据结构与算法
tag:
  - 排序
---

# 《冒泡排序》

时间复杂度：

+ 平均：O(n<sup>2</sup>)

+ 最坏：O(n<sup>2</sup>)

+ 最好：O(n)

空间复杂度：O(1)

稳定

```java
public static void bubbleSort(int[] data) {
        int dataLength = data.length;
        int temp;
        for (int i = 1; i < dataLength; i++) {
            for (int i1 = 0; i1 < dataLength - i; i1++) {
                if (data[i1] > data[i1 + 1]){
                    temp = data[i1 + 1];
                    data[i1 + 1] = data[i1];
                    data[i1] =temp;
                }
            }
        }
    }
```