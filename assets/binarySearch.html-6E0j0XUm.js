const e=JSON.parse('{"key":"v-03bc7937","path":"/algorithm/binarySearch.html","title":"《二分查找》","lang":"zh-CN","frontmatter":{"date":"2020-10-16T00:00:00.000Z","category":["Java","数据结构与算法"],"tag":["查找"]},"headers":[],"git":{"createdTime":1712910015000,"updatedTime":1712910015000,"contributors":[{"name":"sz-Dawson","email":"dragon.zbl@qq.com","commits":1}]},"readingTime":{"minutes":0.87,"words":260},"filePathRelative":"algorithm/binarySearch.md","localizedDate":"2020年10月16日","excerpt":"<h1> 《二分查找》</h1>\\n<blockquote>\\n<p>算法描述：</p>\\n</blockquote>\\n<ul>\\n<li>二分查找也称折半查找，它是一种效率较高的查找方法，要求列表中的元素首先要\\n进行有序排列。</li>\\n<li>首先，假设表中元素是按升序排列，将表中间位置记录的关键字与查找关键字比较，\\n如果两者相等，则查找成功；</li>\\n<li>否则利用中间位置记录将表分成前、后两个子表，如果中间位置记录的关键字大于\\n查找关键字，则进一步查找前一子表，否则进一步查找后一子表。</li>\\n<li>重复以上过程，直到找到满足条件的记录，使查找成功，或直到子表不存在为止，\\n此时查找不成功。</li>\\n</ul>"}');export{e as data};