---
icon: pen-to-square
date: 2022-03-30
category:
        - Elasticsearch
tag:
        - 数据库
        - 倒排索引
---

# 《Java操作》

> 引入依赖【注意版本号和实际操作版本号一致】

```xml
        <dependency>
                <groupId>org.elasticsearch.client</groupId>
                <artifactId>elasticsearch-rest-high-level-client</artifactId>
        </dependency>
```

> 创建连接客户端

```java
        RestHighLevelClient client = new RestHighLevelClient(RestClient.builder(
                HttpHost.create("http://192.168.150.101:9200")
        ));
```

> 索引的操作

```java
//创建索引
    @Test
    void testCreateIndex() throws IOException {
        CreateIndexRequest hotel = new CreateIndexRequest("hotel");
        hotel.source(MAPPING_TEMPLATE, XContentType.JSON);
        client.indices().create(hotel, RequestOptions.DEFAULT);
    }

//删除索引
    @Test
    void testDeleteIndex() throws IOException {
        DeleteIndexRequest hotel = new DeleteIndexRequest("hotel");
        client.indices().delete(hotel,RequestOptions.DEFAULT);
    }

//判断索引是否存在
    @Test
    void testExistsHotelIndex() throws IOException {
        GetIndexRequest request = new GetIndexRequest("hotel");
        boolean exists = client.indices().exists(request, RequestOptions.DEFAULT);
        System.out.println(exists ? "索引存在" : "索引不存在");
    }
```

