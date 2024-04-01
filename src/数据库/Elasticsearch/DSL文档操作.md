---
icon: pen-to-square
date: 2022-04-05
category:
        - Elasticsearch
tag:
        - 数据库
        - 倒排索引
        - DSL
---

# 《DSL文档操作》

        在之前的初识中，已经简单的介绍了几个基本命令操作。在这个DSL文档操作中，会介绍如下几个功能：
        1. 查询全部Document
        2. 条件查询Document
        3. 高亮查询
        4. 排序查询
        5. 分页查询
        6. 区域查询【地理查询】
        7. 相关性算分
        8. 符合查询

## 1. 查询全部Document


        GET /index_name/_search
        {
                "query":{
                        "match_all":{

                        }
                }
        }

## 2. 条件查询Document

> 方式一【多字段】

        GET /index_name/_search
        {
                "query":{
                        "multi_match":{
                                query:"condition_value",
                                "fields":["field1","field2",...]
                        }
                }
        }

> 方式二【单字段】

        GET /index_name/_search
        {
                "query":{
                        "match":{
                                "all":"condition_value"
                        }
                }
        }

## 3. 精确搜索

“精确搜索”，其实就是在query里面套了一个term

        GET /hotel/_search
        {
                "query": {
                        "term": {
                                "city": {
                                        "value": "北京"
                                }
                        }
                }
        }

## 4. 区域查询

> 矩形搜索

        GET /index_name/_search
        {
                "query":{
                        "geo_bounding_box":{
                                "FIELD":{
                                        "top_left":{
                                                "lat":31.1,
                                                "lon":121.5
                                        },
                                        "bottome_right":{
                                                "lat":30.9
                                        }
                                }
                        }
                }
        }
这里搜索就是一个矩形

> 圆形搜索

        GET /index_name/_search
        {
                "query":{
                        "geo_distance":{
                                "distance":"15km",
                                "location":"31.21,121.5"
                        }
                }
        }
这个是 地域搜索的推荐方式

## 5. 范围搜索

        GET /index_name/_search
        {
                "query":{
                        "range":{
                                "price":{
                                        "gte":100,
                                        "lte":200
                                }
                        }
                }
        }

搜索的是价格从100-200的信息

## 6. 打分

        GET /hotel/_search
        {
                "query": {
                        "function_score": {
                                "query": {
                                        "match": {
                                                "all": "外滩"
                                        }
                                },
                                "functions": [
                                        {
                                        "filter":{
                                        "term":{
                                        "brand":"如家"
                                        }
                                },
                                "weight":200
                                        }
                                ],
                                "boost_mode":"sum"
                        }
                }
        }

## 7. bool 条件查询

- must：必须匹配每个子查询，类似“与”
- should：选择性匹配子查询，类似“或”
- must_not：必须不匹配，**不参与算分**，类似“非”
- filter：必须匹配，**不参与算分**

        GET /hotel/_search
        {
                "query": {
                        "bool": {
                                "must": [
                                        {
                                                "term": {
                                                "city":"上海"
                                                }
                                        }
                                ]
                        }
                },
                "highlight": {
                        "fields": {
                                "name": {
                                        "require_field_match": "true"
                                }
                        }
                }
        }

## 8. 高亮

**注意：**

- 高亮是对关键字高亮，因此**搜索条件必须带有关键字**，而不能是范围这样的查询。
- 默认情况下，**高亮的字段，必须与搜索指定的字段一致**，否则无法高亮
- 如果要对非搜索字段高亮，则需要添加一个属性：`required_field_match=false`

## 9. 分页

        GET /hotel/_search
        {
                "query": {
                        "match_all": {}
                },
                "from": 0,
                "size": 10
        }