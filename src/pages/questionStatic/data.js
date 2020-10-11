import { jsonToHump, jsonToUnderline } from "../../api/dataFormatter";
var data = [
    {
      "content": {
        "picture": "", 
        "row_content": "单选题标题", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000385", 
      "options": [
        {
          "fraction": 0, 
          "id": "100000000000000536", 
          "name": "选项1", 
          "picture": "",
          "count":1,
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000537", 
          "name": "选项2", 
          "picture": "",
          "count":3,
        }
      ], 
      "required": 2, 
      "type": 1
    }, 
    {
      "content": {
        "picture": "", 
        "row_content": "多选题标题", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000386", 
      "options": [
        {
          "fraction": 0, 
          "id": "100000000000000538", 
          "name": "选项一", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000539", 
          "name": "选项二", 
          "picture": ""
        }
      ], 
      "required": 1, 
      "type": 2
    }, 
    {
      "content": {
        "picture": "", 
        "row_content": "填空题标题", 
        "subtitle": "备注1"
      }, 
      "id": "1000000000000000387", 
      "options": [], 
      "required": 2, 
      "type": 3
    }, 
    {
      "content": {
        "col_content": [
          {
            "id": "1000000000000000389", 
            "row_content": "外观"
          }, 
          {
            "id": "1000000000000000390", 
            "row_content": "功能"
          }
        ], 
        "picture": "", 
        "row_content": "矩阵单选题", 
        "subtitle": "备注1"
      }, 
      "id": "1000000000000000388", 
      "options": [
        {
          "fraction": 0, 
          "id": "100000000000000540", 
          "name": "很不满意", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000541", 
          "name": "不满意", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000542", 
          "name": "一般", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000543", 
          "name": "满意", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000544", 
          "name": "很满意", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 5
    }, 
    {
      "content": {
        "col_content": [
          {
            "id": "1000000000000000392", 
            "row_content": "外观"
          }, 
          {
            "id": "1000000000000000393", 
            "row_content": "功能"
          }
        ], 
        "picture": "", 
        "row_content": "矩阵多选标题", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000391", 
      "options": [
        {
          "fraction": 0, 
          "id": "100000000000000545", 
          "name": "很不满意", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000546", 
          "name": "不满意", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000547", 
          "name": "一般", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000548", 
          "name": "满意", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000549", 
          "name": "很满意", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 6
    }, 
    {
      "content": {
        "col_content": [
          {
            "id": "1000000000000000395", 
            "row_content": "外观"
          }, 
          {
            "id": "1000000000000000396", 
            "row_content": "功能"
          }
        ], 
        "picture": "", 
        "row_content": "矩阵量表标题", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000394", 
      "options": [
        {
          "fraction": 1, 
          "id": "100000000000000550", 
          "name": "1", 
          "picture": ""
        }, 
        {
          "fraction": 2, 
          "id": "100000000000000551", 
          "name": "2", 
          "picture": ""
        }, 
        {
          "fraction": 3, 
          "id": "100000000000000552", 
          "name": "3", 
          "picture": ""
        }, 
        {
          "fraction": 4, 
          "id": "100000000000000553", 
          "name": "4", 
          "picture": ""
        }, 
        {
          "fraction": 5, 
          "id": "100000000000000554", 
          "name": "5", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 7
    }, 
    {
      "content": {
        "col_content": [
          {
            "id": "1000000000000000398", 
            "row_content": "外观"
          }, 
          {
            "id": "1000000000000000399", 
            "row_content": "功能"
          }
        ], 
        "picture": "", 
        "row_content": "矩阵滑动题", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000397", 
      "options": [
        {
          "fraction": 0, 
          "id": "100000000000000555", 
          "name": "0", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000556", 
          "name": "100", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 8
    }, 
    {
      "content": {
        "col_content": [
          {
            "id": "1000000000000000401", 
            "row_content": "外观"
          }, 
          {
            "id": "1000000000000000402", 
            "row_content": "功能"
          }
        ], 
        "picture": "", 
        "row_content": "表格数值", 
        "subtitle": "输入从0到10的数字"
      }, 
      "id": "1000000000000000400", 
      "options": [
        {
          "fraction": 0, 
          "id": "100000000000000557", 
          "name": "百度", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000558", 
          "name": "谷歌", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000559", 
          "name": "搜狗", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 9
    }, 
    {
      "content": {
        "col_content": [
          {
            "id": "1000000000000000404", 
            "row_content": "外观"
          }, 
          {
            "id": "1000000000000000405", 
            "row_content": "功能"
          }
        ], 
        "picture": "", 
        "row_content": "表格填空", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000403", 
      "options": [
        {
          "fraction": 0, 
          "id": "100000000000000560", 
          "name": "百度", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000561", 
          "name": "谷歌", 
          "picture": ""
        }, 
        {
          "fraction": 0, 
          "id": "100000000000000562", 
          "name": "搜狗", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 10
    }, 
    {
      "content": {
        "picture": "", 
        "row_content": "NPS量表", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000406", 
      "options": [
        {
          "fraction": 1, 
          "id": "100000000000000563", 
          "name": "不可能", 
          "picture": ""
        }, 
        {
          "fraction": 2, 
          "id": "100000000000000564", 
          "name": "1", 
          "picture": ""
        }, 
        {
          "fraction": 3, 
          "id": "100000000000000565", 
          "name": "2", 
          "picture": ""
        }, 
        {
          "fraction": 4, 
          "id": "100000000000000566", 
          "name": "3", 
          "picture": ""
        }, 
        {
          "fraction": 5, 
          "id": "100000000000000567", 
          "name": "4", 
          "picture": ""
        }, 
        {
          "fraction": 6, 
          "id": "100000000000000568", 
          "name": "极有可能", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 11
    }, 
    {
      "content": {
        "picture": "", 
        "row_content": "评分单选", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000407", 
      "options": [
        {
          "fraction": 1, 
          "id": "100000000000000569", 
          "name": "选项1", 
          "picture": ""
        }, 
        {
          "fraction": 2, 
          "id": "100000000000000570", 
          "name": "选项2", 
          "picture": ""
        }, 
        {
          "fraction": 3, 
          "id": "100000000000000571", 
          "name": "选项3", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 12
    }, 
    {
      "content": {
        "picture": "", 
        "row_content": "评分多选", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000408", 
      "options": [
        {
          "fraction": 1, 
          "id": "100000000000000572", 
          "name": "选项1", 
          "picture": ""
        }, 
        {
          "fraction": 2, 
          "id": "100000000000000573", 
          "name": "选项2", 
          "picture": ""
        }, 
        {
          "fraction": 3, 
          "id": "100000000000000574", 
          "name": "选项3", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 13
    }, 
    {
      "content": {
        "picture": "", 
        "row_content": "多级下拉", 
        "subtitle": "备注"
      }, 
      "id": "1000000000000000409", 
      "options": [
        {
          "fraction": 0, 
          "id": "100000000000000575", 
          "name": "省份/城市/区县\n湖南省/长沙市/天心区\n湖南省/长沙市/岳麓区", 
          "picture": ""
        }
      ], 
      "required": 2, 
      "type": 14
    }
  ]
  jsonToHump(data);
export default data;