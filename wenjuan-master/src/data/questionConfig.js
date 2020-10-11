import CONST from '../pages/questionType/const';

var questionType = CONST.questionType;
export default {
    "custom": [
        {
            "type": questionType.radio,
            "icon": "",
            "name": "单选题"
        },{
            "type": questionType.checkbox,
            "icon": "",
            "name": "多选题"
        },{
            "type": questionType.tiankong,
            "icon": "",
            "name": "填空题"
        },{
            "type": questionType.juzhendanxuan,
            "icon": "",
            "name": "矩阵单选"
        },{
            "type": questionType.juzhenduoxuan,
            "icon": "",
            "name": "矩阵多选"
        },{
            "type": questionType.juzhenliangbiao,
            "icon": "",
            "name": "矩阵量表"
        },{
            "type": questionType.juzhenhuadong,
            "icon": "",
            "name": "矩阵滑动"
        },{
            "type": questionType.tableNumber,
            "icon": "",
            "name": "表格数值"
        },{
            "type": questionType.tabletiankong,
            "icon": "",
            "name": "表格填空"
        },{
            "type": questionType.nps,
            "icon": "",
            "name": "NPS量表"
        },{
            "type": questionType.scoreradio,
            "icon": "",
            "name": "评分单选"
        },{
            "type": questionType.scorecheckbox,
            "icon": "",
            "name": "评分多选"
        },{
            "type": questionType.multiselect,
            "icon": "",
            "name": "多级下拉"
        }
    ],
    "ceping": [
        {
            "type": 'A1',
            "icon": "",
            "name": "姓名",
            "demo": {
                type: '3',
                required: true, //1非必填，2必填
                content: {
                    rowContent: "您的姓名：", //题目标题,
                    subtitle: ""
                }
            }
        },{
            "type": 'A2',
            "icon": "",
            "name": "性别",
            "demo": {
                type: '1',
                required: true, //1非必填，2必填
                content: {
                    rowContent: "您的性别：", //题目标题,
                    subtitle: ""
                },
                options: [{
                        name: "男"
                    },
                    {
                        name: "女"
                    }
                ]
            }
        },{
            "type": 'A3',
            "icon": "",
            "name": "年龄段",
            "demo": {
                type: '1',
                required: true, //1非必填，2必填
                content: {
                    rowContent: "您的年龄段：", //题目标题,
                    subtitle: ""
                },
                options: [{
                        name: "18岁以下"
                    },
                    {
                        name: "18~25"
                    },
                    {
                        name: "26~30"
                    },
                    {
                        name: "31~40"
                    },
                    {
                        name: "41~50"
                    },
                    {
                        name: "51~60"
                    },
                    {
                        name: "60以上"
                    }
                ]
            }
        },{
            "type": 'A3',
            "icon": "",
            "name": "手机号码",
            "demo": {
                type: '3',
                required: true, //1非必填，2必填
                content: {
                    rowContent: "您的手机号码：", //题目标题,
                    subtitle: ""
                }
            }
        },{
            "type": 'A4',
            "icon": "",
            "name": "职业",
            "demo": {
                type: '14',
                required: true, //1非必填，2必填
                content: {
                    rowContent: "您目前从事的职业：", //题目标题,
                    subtitle: ""
                },
                options: [{
                        name: "请选择职业\nIT、软硬件服务、电子商务、因特网运营\n快速消费品(食品、饮料、化妆品)\n批发、零售\n服装、纺织、皮革\n其他行业"
                    }
                ]
            }
        },{
            "type": 'A4',
            "icon": "",
            "name": "行业",
            "demo": {
                type: '14',
                required: true, //1非必填，2必填
                content: {
                    rowContent: "您目前从事的行业：", //题目标题,
                    subtitle: ""
                },
                options: [{
                        name: "请选择行业\n全日制学生\n生产人员\n销售人员\n市场、公关人员\n客服人员\n行政、后勤人员\n人力资源\n财务、审计人员\n文职、办事人员\n技术、研发人员\n其他"
                    }
                ]
            }
        },{
            "type": 'A5',
            "icon": "",
            "name": "邮寄地址",
            "demo": {
                type: '3',
                required: true, //1非必填，2必填
                content: {
                    rowContent: "邮寄地址：", //题目标题,
                    subtitle: ""
                }
            }
        },{
            "type": questionType.juzhenliangbiao,
            "icon": "",
            "name": "矩阵量表"
        },{
            "type": questionType.nps,
            "icon": "",
            "name": "NPS量表"
        },{
            "type": questionType.scoreradio,
            "icon": "",
            "name": "评分单选"
        },{
            "type": questionType.scorecheckbox,
            "icon": "",
            "name": "评分多选"
        }
    ]
}