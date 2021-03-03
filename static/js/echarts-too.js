// One echatrs
var chart;
// var tree;
// var pei;
// var ci;
// var qiu;
$(function () {
  echarts_2();
});



function echarts_1 () {
  let dashedPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC';
  let color = ['#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4'];
  let chartData = [{
    name: "农       界",
    value: 865,
  },
  {
    name: "苦       力",
    value: 166,
  }, {
    name: "商       界",
    value: 276,
  }, {
    name: "未       详",
    value: 264,
  }, {
    name: "工       界",
    value: 208,
  }, {
    name: "无       业",
    value: 153,
  }, {
    name: "防疫人员",
    value: 73,
  },
  {
    name: "绅       学",
    value: 62,
  },
  {
    name: "军       人",
    value: 33,
  }
  ];
  let arrName = [];
  let arrValue = [];
  let sum = 0;
  let pieSeries = [],
    lineYAxis = [];

  // 数据处理
  chartData.forEach((v, i) => {
    arrName.push(v.name);
    arrValue.push(v.value);
    sum = sum + v.value;
  })

  // 图表option整理
  chartData.forEach((v, i) => {
    pieSeries.push({
      name: '',
      type: 'pie',
      clockWise: false,
      hoverAnimation: true,
      radius: [60 - i * 7 + '%', 25 - i * 7 + '%'],
      center: ["23%", "45%"],
      label: {
        show: false
      },
      data: [{
        value: v.value,
        name: v.name
      }, {
        value: sum - v.value,
        name: '',
        itemStyle: {
          color: "rgba(0,0,0,0)"
        },
        tooltip: {
          show: false
        }
      }]
    });
    pieSeries.push({
      name: '',
      type: 'pie',
      silent: true,
      z: 1,
      clockWise: false, //顺时加载
      hoverAnimation: false, //鼠标移入变大
      radius: [69 - i * 7 + '%', 56 - i * 7 + '%'],
      center: ["23%", "45%"],
      label: {
        show: false
      },
      data: [{
        value: 2.5,
        itemStyle: {
          color: 'rgba(0,0,0,0.1)'
        },
        tooltip: {
          show: false
        }
      }, {
        value: 2.5,
        name: '',
        itemStyle: {
          color: "rgba(0,0,0,0)"
        },
        tooltip: {
          show: false
        },
      }]
    });

    v.percent = (v.value / sum * 100).toFixed(1) + "%";
    lineYAxis.push({
      value: i,
      textStyle: {
        rich: {
          circle: {
            color: color[i],
            padding: [0, 5]
          }
        }
      }
    });
  })

  var myChart = echarts.init(document
    .getElementById('ech-1'));

  option = {
    backgroundColor: '#363636',
    title: [{
      text: '奉天各属疫毙人数职业比较',
      subtext: '数据来源：《东三省疫事报告书》奉天防疫总局，1911年',
      textAlign: "center",
      left: "32%",
      bottom: '3%',
      textStyle: {
        color: '#fff',
        fontSize: 10,
      },
      subtextStyle: {
        fontSize: 10,
      }
    }, {
      text: '备注',
      subtext: '一、奉天全省统辖 51 属，右表仅列有疫之 28 属，余则从略。\n\n二、右表绅学一栏，统士绅学生各项上流社会而言之。\n\n三、右表既就职业上区分疫死之多寡，故妇女疫毙者未为列入。\n\n       统计男子死者 5400 人，妇女死者 1558 人，共 6958 人。\n\n       就此表观之，农及苦力占最多数，其次工商无业者占 1/20 ，\n\n       防疫人员居 1/100 ，绅学军人占最少数。\n\n       若以男女比较，则女占 1/4 而弱，男占 3/4 而强。',
      //textAlign: "center",
      left: "27%",
      bottom: '18%',
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderRadius: 10,
      padding: 18,
      textStyle: {
        color: '#fff',
        fontSize: 10,
      },
      subtextStyle: {
        fontSize: 10,
      }
    }],
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{b}<br>{c}人 ({d}%)",
      fontSize: 12
    },
    color: color,
    grid: {
      top: '0.5%',
      bottom: '74%',
      left: "27%",
      containLabel: true
    },
    yAxis: [{
      type: 'category',
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function (params) {
          let item = chartData[params];
          // console.log(item)
          return '{line|}{circle|●}{name|' + ' ' + item.name + ' ' + '}{bd||}{percent|' + ' ' + item.percent + ' ' + '}{value|' + item.value + '}'
        },
        interval: 0,
        inside: true,
        textStyle: {
          color: "#333",
          fontSize: 10,
          rich: {
            line: {
              width: 100,
              height: 3,
              backgroundColor: {
                image: dashedPic
              }
            },
            name: {
              color: 'white',
              fontSize: 10,
            },
            bd: {
              color: 'white',
              padding: [0, 2],
              fontSize: 10,
            },
            percent: {
              color: 'white',
              fontSize: 10,
            },
            value: {
              color: 'white',
              fontSize: 10,
              fontWeight: 100,
              padding: [0, 0, 0, 5]
            },
          }
        },
        show: true
      },
      data: lineYAxis
    }],
    xAxis: [{
      show: false
    }],
    series: pieSeries
  };
  myChart.setOption(option);
  window.onresize = function () {
    myChart.resize();
  }

}

function echarts_2 () {
  var eleChart = document.getElementById('ech-2');
  var myChart = echarts.init(eleChart);
  // 折线图
  var dataone;
  var datatwo;
  var dataThree;
  // 饼图
  var legendData;
  var seriesData;

  // 词云
  var data;

  // 热点
  let datas
  $.ajax({
    type: "post",
    url: basepath + "/PublicOpinion/Report/Echarts",
    // data: "data",
    dataType: "json",
    async: false,
    success: function (response) {
      console.log(response)
      // 折线
      dataone = response.VisualHour.KeyListAll;
      datatwo = response.VisualHour.XList;
      dataThree = response.VisualHour.hour_dictList;
      // 饼图
      legendData = response.SearchShuxing.TitleList;
      seriesData = response.SearchShuxing.shuxing_dictList;
      // 词云
      data = response.guanjianzi_dict;
      // 热点
      datas = response.seg_dict
    }
  });
  const driectionMap = new Map(
    dataone
  )
  // console.log(dataThree)
  option = {
    backgroundColor: '#363636',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(0, 255, 233,0)'
            }, {
              offset: 0.5,
              color: 'rgba(255, 255, 255,1)'
            }, {
              offset: 1,
              color: 'rgba(0, 255, 233,0)'
            }],
            global: false
          }
        }
      }
    },

    grid: {
      'x': 50,
      'y': 10,
      'x2': 30,
      'y2': 40,
      'bottom': 60,
      'borderWidth': 1
    },
    xAxis: [{
      type: 'category',
      'gridIndex': 0,
      'axisLabel': {
        'show': true,
        'color': '#FFFFFF'
      },
      'axisLine': {
        'lineStyle': {
          'color': '#007279'
        }
      },
      axisLabel: {
        // formatter: '{value} ml',

        interval: 0,
        formatter: function (params) {
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = 2;
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = "";
              var start = p * provideNumber;
              var end = start + provideNumber;
              if (p == rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber);
              } else {
                tempStr = params.substring(start, end) + "\n";
              }
              newParamsName += tempStr;
            }

          } else {
            newParamsName = params;
          }
          return newParamsName
        },
        textStyle: {
          fontSize: 14,
          color: "#fff"
        },
      },
      splitArea: {
        // show: true,
        color: '#f00',
        lineStyle: {
          color: '#f00'
        }
      },
      splitLine: {
        show: false
      },
      boundaryGap: false,
      data: datatwo

    }],

    yAxis: [{
      type: 'value',
      min: 0,
      // max: 140,
      splitNumber: 4,
      'splitLine': { 'show': true, 'lineStyle': { 'color': '#007279' } },
      'axisLabel': { 'color': 'rgba(255,255,255,0)' },
      'axisLine': { 'lineStyle': { 'color': '#007279' } },
      axisTick: {
        show: true
      },
      axisLabel: {
        // formatter: '{value} ml',
        textStyle: {
          fontSize: 12,
          color: "#fff"
        },
      }

    }],
    series: [{
      smooth: true,
      name: '时刻点',
      type: 'line',
      showAllSymbol: true,
      symbol (value, params) {
        // console.log(params.data.durection)
        return `image://${driectionMap.get(params.data.durection)}`

      },
      symbolSize: 25,
      lineStyle: {
        normal: {
          color: '#6c50f3',
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 5,
          shadowOffsetX: 5
        }
      },
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#6c50f3',
          fontSize: 18,
        }
      },
      itemStyle: {
        color: '#6c50f3',
        borderColor: '#fff',
        borderWidth: 3,
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowBlur: 0,
        shadowOffsetY: 2,
        shadowOffsetX: 2
      },
      tooltip: {
        show: true
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(108,80,243,0.3)'
          },
          {
            offset: 1,
            color: 'rgba(108,80,243,0)'
          }
          ], false),
          shadowColor: 'rgba(108,80,243, 0.9)',
          shadowBlur: 20
        }
      },
      data: dataThree
    }

    ]
  }



  myChart.setOption(option);

  window.onresize = function () {
    myChart.resize();
  }

  // 饼图


  var eleChart = document.getElementById('ech-3');
  chart = echarts.init(eleChart);


  var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'];
  option = {
    backgroundColor: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#0f2c70' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#363636' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    title: {
      // text: '品种',
      x: 'center',
      y: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    // animation: false,
    tooltip: {
      trigger: 'item',
      borderColor: 'rgba(255,255,255,.3)',
      backgroundColor: 'rgba(13,5,30,.6)',
      borderWidth: 1,
      padding: 5,
      formatter: function (parms) {
        var str = parms.marker + "" + parms.data.name + "</br>" +
          "数量：" + parms.data.value + "个</br>" +
          "占比：" + parms.percent + "%";
        return str;
      }
    },
    legend: {
      type: "scroll",
      orient: 'vertical',
      left: 'left',
      align: 'auto',
      top: 'bottom',
      textStyle: {
        color: '#fff'
      },
      data: legendData
    },
    series: [{
      type: 'pie',
      z: 3,
      center: ['50%', '50%'],
      radius: ['25%', '45%'],
      clockwise: true,
      avoidLabelOverlap: true,
      hoverOffset: 15,
      itemStyle: {
        normal: {
          color: function (params) {
            return colorList[params.dataIndex]
          },
          // label: { 
          textStyle: {
            fontWeight: 200,
            fontSize: 22   //文字的字体大小
          },

          // },
        },

      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{a|{b}：{d}%}\n{hr|}',
        rich: {
          hr: {
            backgroundColor: 't',
            borderRadius: 3,
            width: 3,
            height: 3,
            padding: [3, 3, 0, -12]
          },
          a: {
            padding: [-30, 15, -20, 15]
          }
        }
      },
      labelLine: {
        normal: {
          length: 20,
          length2: 30,
          lineStyle: {
            width: 1
          }
        }
      },
      data: seriesData
    }, {
      name: '第一层环',
      type: 'pie',
      z: 2,
      tooltip: {
        show: false
      },
      center: ['50%', '50%'],
      radius: ['45%', '58%'],
      hoverAnimation: false,
      clockWise: false,
      itemStyle: {
        normal: {
          // shadowBlur: 40,
          // shadowColor: 'rgba(0, 255, 255,.3)',
          color: 'rgba(1,15,80,.4)',
        },
        emphasis: {
          color: 'rgba(1,15,80,.4)',
        }
      },
      label: {
        show: false
      },
      data: [100]
    }, {
      name: '第二层环',
      type: 'pie',
      z: 1,
      tooltip: {
        show: false
      },
      center: ['50%', '50%'],
      radius: ['58%', '76%'],
      hoverAnimation: false,
      clockWise: false,
      itemStyle: {
        normal: {
          // shadowBlur: 40,
          // shadowColor: 'rgba(0, 255, 255,.3)',
          color: 'rgba(0,15,69,.2)',
        },
        emphasis: {
          color: 'rgba(0,15,69,.2)',
        }
      },
      label: {
        show: false
      },
      data: [100]
    }]
  };
  chart.setOption(option);
  // window.onresize = function () {
  //   chart.resize();
  // }

  window.addEventListener("resize", function () {
    chart.resize();
  });


  // 词云图

  var colorList = [
    [
      '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
      '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
      '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
      '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5'
    ],
    [
      '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
      '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
      '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
      '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
    ],
    [
      '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
      '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51',
      '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe',
      '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
    ]
  ][2];

  var myChart2 = echarts.init(document
    .getElementById('ech-6'));
  var option = {
    backgroundColor: '#363636',
    // 图表标题
    title: {
      show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
      // text: '敏感词词云', //主标题文本，'\n'指定换行
      x: 'center', // 水平安放位置，默认为左对齐，可选为：
      // 'center' ¦ 'left' ¦ 'right'
      // ¦ {number}（x坐标，单位px）
      y: 'center', // 垂直安放位置，默认为全图顶端，可选为：
      // 'top' ¦ 'bottom' ¦ 'center'
      // ¦ {number}（y坐标，单位px）
      //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
      // backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#ccc', // 标题边框颜色
      borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
      padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
      // 接受数组分别设定上右下左边距，同css
      itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
      textStyle: {
        fontSize: 24,
        fontWeight: 'bolder',
        color: '#333' // 主标题文字颜色
      },
      subtextStyle: {
        color: '#aaa' // 副标题文字颜色
      }
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    // backgroundColor: "#1A1835",
    tooltip: {},
    animationDurationUpdate: function (idx) {
      // 越往后的数据延迟越大
      return idx * 100;
    },
    animationEasingUpdate: 'bounceIn',
    color: ['#fff', '#fff', '#fff'],
    series: [{
      type: 'graph',
      layout: 'force',

      textStyle: {
        fontSize: 30,
        fontWeight: 'bolder',
        color: '#333' // 主标题文字颜色
      },
      force: {
        repulsion: 150,
        edgeLength: 50
      },
      roam: true,
      label: {
        normal: {
          show: true,
          fontSize: 16,
        }
      },
      data: data,
    }]

  }
  myChart2.setOption(option);
  // window.onresize = function () {
  //   myChart1.resize();
  // }

  window.addEventListener("resize", function () {
    myChart2.resize();
  });
  myChart2.on('click', function (params) {
    console.log(params.name);
    window.open(params.data.url);
    // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.value));
  });




  // console.log(datas)
  var maskImage = new Image();
  maskImage.src = "data:image/png;base64,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"
  var eleChart = document.getElementById('ech-4');
  var myChart1 = echarts.init(eleChart);
  option = {
    backgroundColor: '#363636',
    // backgroundColor: '#000',
    tooltip: {
      show: true,
      position: 'top',
      textStyle: {
        fontSize: 30
      }
    },
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    series: [{
      type: "wordCloud",
      // 网格大小，各项之间间距
      gridSize: 20,
      // 形状 circle 圆，cardioid  心， diamond 菱形，
      // triangle-forward 、triangle 三角，star五角星
      shape: 'circle',
      // 字体大小范围
      sizeRange: [20, 40],
      // 文字旋转角度范围
      rotationRange: [-45, 0, 45, 90],
      // 旋转步值
      rotationStep: 45,
      // 自定义图形
      // maskImage: maskImage,
      left: 'center',
      top: 'center',
      right: null,
      bottom: null,
      // 画布宽
      width: '90%',
      // 画布高
      height: '90%',
      //自定义图
      //   maskImage: maskImage,
      // 是否渲染超出画布的文字
      drawOutOfBound: true,
      textStyle: {
        normal: {
          color: function (params) {
            var index_color = params.name;
            if (index_color == "健康宝") {
              return '#FFFF00';
            }
            if (index_color == "手机号码") {
              return '#FF7F00';
            }
            if (index_color == "绿码") {
              return '#8B00FF';
            }
            if (index_color == "绑定") {
              return '#00FF00';
            }
            if (index_color == "验证码") {
              return '#00FFFF';
            }
            if (index_color == "健康码") {
              return '#0000FF';
            }
            return 'rgb(' + [
              Math.round(Math.random() * 200 + 55),
              Math.round(Math.random() * 200 + 55),
              Math.round(Math.random() * 200 + 55)
            ].join(',') + ')';
          }
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: '#2ac'
        }
      },
      data: datas
    }]
  };
  myChart1.setOption(option);
  // window.onresize = function () {
  //   myChart1.resize();
  // }
  window.addEventListener("resize", function () {
    myChart1.resize();
  });


  setTimeout(function () {
    // 想后端发送图片参数
    var tree = myChart.getDataURL({ type: 'png', backgroundColor: '041c5b' });
    var pei = chart.getDataURL({ type: 'png', backgroundColor: '041c5b' });
    var ci = myChart2.getDataURL({ type: 'png', backgroundColor: '041c5b' });
    var qiu = myChart1.getDataURL({ type: 'png', backgroundColor: '041c5b' });
    $.ajax({
      type: 'post',
      url: basepath + '/PublicOpinion/Uploader/upload',
      data: {
        'Time': tree,
        'Classification': pei,
        'HotIssue': ci,
        'HotWord': qiu,
      },
      // dataType: "text",
      success: function (data) {
        console.log("发送图片成功")
        $("#printall").removeAttr("disabled");  //启用按钮
      },
      error: function (error, status) {
        console.log("发送失败")
      }
    });
  }, 3000)   //1秒后执行



}









