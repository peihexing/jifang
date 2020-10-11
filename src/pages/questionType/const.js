let questionType = {
    radio: '1',
    checkbox: '2',
    tiankong: '3',
    juzhendanxuan: '5',
    juzhenduoxuan: '6',
    juzhenliangbiao: '7',
    juzhenhuadong: '8',
    tableNumber: '9',
    tabletiankong: '10',
    nps: '11',
    scoreradio: '12',
    scorecheckbox: '13',
    multiselect: '14',
    pageType: '00'
}
export default {
    questionType: questionType,
    questionDemo: [{
            type: questionType.radio,
            required: true, //1非必填，2必填
            content: {
                rowContent: "单选题标题", //题目标题,
                subtitle: "备注"
            },
            options: [{
                    name: "选项1"
                },
                {
                    name: "选项2"
                }
            ]
        },
        {
            type: questionType.checkbox,
            required: false, //1非必填，2必填
            content: {
                rowContent: "多选题标题", //题目标题,
                subtitle: "备注" //题目标题,
            },
            options: [{
                    name: "选项一"
                },
                {
                    name: "选项二"
                }
            ]
        },
        {
            type: questionType.tiankong,
            required: true, //1非必填，2必填
            content: {
                rowContent: "填空题标题", //题目标题,
                subtitle: "备注1"
            }
        },
        {
            type: questionType.juzhendanxuan,
            required: true, //1非必填，2必填
            content: {
                rowContent: "矩阵单选题", //题目标题,
                subtitle: "备注1",
                colContent: [{
                        rowContent: "外观"
                    },
                    {
                        rowContent: "功能"
                    }
                ]
            },
            options: [{
                    name: "很不满意"
                },
                {
                    name: "不满意"
                },
                {
                    name: "一般"
                },
                {
                    name: "满意"
                },
                {
                    name: "很满意"
                }
            ]
        },
        {
            type: questionType.juzhenduoxuan,
            required: true, //1非必填，2必填
            content: {
                rowContent: "矩阵多选标题", //题目标题,
                subtitle: "备注",
                colContent: [{
                        //行标题
                        rowContent: "外观"
                    },
                    {
                        rowContent: "功能"
                    }
                ]
            },
            options: [{
                    name: "很不满意"
                },
                {
                    name: "不满意"
                },
                {
                    name: "一般"
                },
                {
                    name: "满意"
                },
                {
                    name: "很满意"
                }
            ]
        },
        {
            type: questionType.juzhenliangbiao,
            required: true, //1非必填，2必填
            content: {
                rowContent: "矩阵量表标题", //题目标题,
                subtitle: "备注",
                colContent: [{
                        //行标题
                        rowContent: "外观"
                    },
                    {
                        rowContent: "功能"
                    }
                ]
            },
            options: [{
                    name: "1",
                    fraction: 1
                },
                {
                    name: "2",
                    fraction: 2
                },
                {
                    name: "3",
                    fraction: 3
                },
                {
                    name: "4",
                    fraction: 4
                },
                {
                    name: "5",
                    fraction: 5
                }
            ]
        },
        {
            type: questionType.juzhenhuadong,
            required: true, //1非必填，2必填
            content: {
                rowContent: "矩阵滑动题", //题目标题,
                subtitle: "备注",
                colContent: [{
                        //行标题
                        rowContent: "外观"
                    },
                    {
                        rowContent: "功能"
                    }
                ]
            },
            options: [{
                    name: "0"
                },
                {
                    name: "100"
                }
            ]
        },
        {
            type: questionType.tableNumber,
            required: true, //1非必填，2必填
            content: {
                rowContent: "表格数值", //题目标题,
                subtitle: "输入从0到10的数字",
                colContent: [{
                        //行标题
                        rowContent: "外观"
                    },
                    {
                        rowContent: "功能"
                    }
                ]
            },
            options: [{
                    name: "百度"
                },
                {
                    name: "谷歌"
                },
                {
                    name: "搜狗"
                }
            ]
        },
        {
            type: questionType.tabletiankong,
            required: true, //1非必填，2必填
            content: {
                rowContent: "表格填空", //题目标题,
                subtitle: "备注",
                colContent: [{
                        //行标题
                        rowContent: "外观"
                    },
                    {
                        rowContent: "功能"
                    }
                ]
            },
            options: [{
                    name: "百度"
                },
                {
                    name: "谷歌"
                },
                {
                    name: "搜狗"
                }
            ]
        },
        {
            type: questionType.nps,
            required: true, //1非必填，2必填
            content: {
                rowContent: "NPS量表", //题目标题,
                subtitle: "备注"
            },
            options: [{
                    name: "不可能",
                    fraction: 1
                },
                {
                    name: "1",
                    fraction: 2
                },
                {
                    name: "2",
                    fraction: 3
                },
                {
                    name: "3",
                    fraction: 4
                },
                {
                    name: "4",
                    fraction: 5
                },
                {
                    name: "极有可能",
                    fraction: 6
                }
            ]
        },
        {
            type: questionType.scoreradio,
            required: true, //1非必填，2必填
            content: {
                rowContent: "评分单选", //题目标题,
                subtitle: "备注"
            },
            options: [{
                    name: "选项1",
                    fraction: 1
                },
                {
                    name: "选项2",
                    fraction: 2
                },
                {
                    name: "选项3",
                    fraction: 3
                }
            ]
        },
        {
            type: questionType.scorecheckbox,
            required: true, //1非必填，2必填
            content: {
                rowContent: "评分多选", //题目标题,
                subtitle: "备注"
            },
            options: [{
                    name: "选项1",
                    fraction: 1
                },
                {
                    name: "选项2",
                    fraction: 2
                },
                {
                    name: "选项3",
                    fraction: 3
                }
            ]
        },
        {
            type: questionType.multiselect,
            required: true, //1非必填，2必填
            content: {
                rowContent: "多级下拉", //题目标题,
                subtitle: "备注"
            },
            options: [{
                    name: "省份/城市/区县\n湖南省/长沙市/天心区\n湖南省/长沙市/岳麓区"
                }
            ]
        }
    ]
}