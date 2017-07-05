
var fdata = {
    "nodes": [{
            "id": "监控预警系统",
            "group": 1,
            size: 20
        },
        {
            "id": "天气",
            "group": 2,
            "color": "#2f4554",
            size: 15
        },
        {
            "id": "台风",
            "group": 2,
            "color": "#2f4554",
            size: 15
        },
        {
            "id": "水文",
            "group": 2,
            "color": "#2f4554",
            size: 15
        },
        {
            "id": "信息发布",
            "group": 2,
            "color": "#2f4554",
            size: 15
        },
        // {
        //     "id": "广东水文",
        //     "group": 3,
        //     "color": "#d48265"
        // },
        // {
        //     "id": "浙江水文",
        //     "group": 3,
        //     "color": "#d48265"
        // },
        // {
        //     "id": "福建水文",
        //     "group": 3,
        //     "color": "#d48265"
        // },
        // {
        //     "id": "南京水文",
        //     "group": 3,
        //     "color": "#d48265"
        // },
        // {
        //     "id": "江西水文",
        //     "group": 3,
        //     "color": "#d48265"
        // },
        // {
        //     "id": "湖南水文",
        //     "group": 3,
        //     "color": "#d48265"
        // },
        // {
        //     "id": "上海水文",
        //     "group": 3,
        //     "color": "#d48265"
        // },,
        {
            "id": "南京水文",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "微博",
            "group": 4,
            "color": "#61a0a8"
        },
        {
            "id": "CNTV",
            "group": 4,
            "color": "#61a0a8"
        },
        {
            "id": "雷电预警",
            "group": 5,
            "color": "#6e7074"
        },
        {
            "id": "暴雨预警",
            "group": 5,
            "color": "#6e7074"
        },
        {
            "id": "暴雪预警",
            "group": 5,
            "color": "#6e7074"
        }
    ],
    "links": [{
            "source": "监控预警系统",
            "target": "天气",
            "value": 1
        },
        {
            "source": "监控预警系统",
            "target": "台风",
            "value": 8
        },
        {
            "source": "监控预警系统",
            "target": "水文",
            "value": 10
        },
        {
            "source": "监控预警系统",
            "target": "信息发布",
            "value": 6
        },
        {
            "source": "水文",
            "target": "南京水文",
            "value": 6
        },
        // {
        //     "source": "水文",
        //     "target": "广东水文",
        //     "value": 6
        // },
        // {
        //     "source": "水文",
        //     "target": "浙江水文",
        //     "value": 6
        // },
        // {
        //     "source": "水文",
        //     "target": "福建水文",
        //     "value": 6
        // },
        // {
        //     "source": "水文",
        //     "target": "江苏水文",
        //     "value": 6
        // },
        // {
        //     "source": "水文",
        //     "target": "江西水文",
        //     "value": 6
        // },
        // {
        //     "source": "水文",
        //     "target": "湖南水文",
        //     "value": 6
        // },
        // {
        //     "source": "水文",
        //     "target": "上海水文",
        //     "value": 6
        // },
        {
            "source": "信息发布",
            "target": "微博",
            "value": 6
        },
        {
            "source": "信息发布",
            "target": "CNTV",
            "value": 6
        },
        {
            "source": "天气",
            "target": "雷电预警",
            "value": 6
        },
        {
            "source": "天气",
            "target": "暴雨预警",
            "value": 6
        },
        {
            "source": "天气",
            "target": "暴雪预警",
            "value": 6
        }
    ]
}
module.exports = fdata