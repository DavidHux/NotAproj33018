
var fdata = {
    "nodes": [{
            "id": "LogicUI",
            "group": 1
        },
        {
            "id": "Weather",
            "group": 2,
            "color": "#2f4554"
        },
        {
            "id": "Typhoon",
            "group": 2,
            "color": "#2f4554"
        },
        {
            "id": "Hydrology",
            "group": 2,
            "color": "#2f4554"
        },
        {
            "id": "Report",
            "group": 2,
            "color": "#2f4554"
        },
        {
            "id": "广东",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "浙江",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "福建",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "江苏",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "江西",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "Hunan",
            "group": 3,
            "color": "#d48265"
        },
        {
            "id": "Shanghai",
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
            "id": "Thunder",
            "group": 5,
            "color": "#6e7074"
        },
        {
            "id": "Rain",
            "group": 5,
            "color": "#6e7074"
        },
        {
            "id": "Snow",
            "group": 5,
            "color": "#6e7074"
        },
        {
            "id": "Tiane No1",
            "group": 6,
            "color": "#749f83"
        }
    ],
    "links": [{
            "source": "LogicUI",
            "target": "Weather",
            "value": 1
        },
        {
            "source": "LogicUI",
            "target": "Typhoon",
            "value": 8
        },
        {
            "source": "LogicUI",
            "target": "Hydrology",
            "value": 10
        },
        {
            "source": "LogicUI",
            "target": "Report",
            "value": 6
        },
        {
            "source": "Hydrology",
            "target": "广东",
            "value": 6
        },
        {
            "source": "Hydrology",
            "target": "浙江",
            "value": 6
        },
        {
            "source": "Hydrology",
            "target": "福建",
            "value": 6
        },
        {
            "source": "Hydrology",
            "target": "江苏",
            "value": 6
        },
        {
            "source": "Hydrology",
            "target": "江西",
            "value": 6
        },
        {
            "source": "Hydrology",
            "target": "Hunan",
            "value": 6
        },
        {
            "source": "Hydrology",
            "target": "Shanghai",
            "value": 6
        },
        {
            "source": "Report",
            "target": "微博",
            "value": 6
        },
        {
            "source": "Report",
            "target": "CNTV",
            "value": 6
        },
        {
            "source": "Weather",
            "target": "Thunder",
            "value": 6
        },
        {
            "source": "Weather",
            "target": "Rain",
            "value": 6
        },
        {
            "source": "Weather",
            "target": "Snow",
            "value": 6
        },
        {
            "source": "Typhoon",
            "target": "Tiane No1",
            "value": 6
        }
    ]
}
module.exports = fdata