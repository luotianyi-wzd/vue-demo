<template>
    <div class="echart">
        <div id="map"></div>
    </div>
</template>

<script>
    // 主模块
    let echarts = require('echarts/lib/echarts')
    // 散点图
    require('echarts/lib/chart/scatter')
    // 散点图放大
    require('echarts/lib/chart/effectScatter')
    // 地图
    require('echarts/lib/chart/map')
    // 图例
    require('echarts/lib/component/legend')
    // 提示框
    require('echarts/lib/component/tooltip')
    // 地图geo
    require('echarts/lib/component/geo')
    require('echarts/map/js/china')
    export default {
        name: "Map",
        data() {
            return {
                mydata :[
                    {name: '北京',value: '100' },{name: '天津' },
                    {name: '上海' },{name: '重庆' },
                    {name: '河北' },{name: '河南' },
                    {name: '云南' },{name: '辽宁' },
                    {name: '黑龙江' },{name: '湖南' },
                    {name: '安徽' },{name: '山东' },
                    {name: '新疆' },{name: '江苏' },
                    {name: '浙江' },{name: '江西' },
                    {name: '湖北' },{name: '广西' },
                    {name: '甘肃' },{name: '山西' },
                    {name: '内蒙古' },{name: '陕西' },
                    {name: '吉林' },{name: '福建' },
                    {name: '贵州' },{name: '广东' },
                    {name: '青海' },{name: '西藏' },
                    {name: '四川' },{name: '宁夏' },
                    {name: '海南' },{name: '台湾' },
                    {name: '香港' },{name: '澳门' }
                ]
            }
        },
        computed: {
          opt(){
              let opt = {
                  // 标题
                  title: {
                      text: 'China',
                      left: 'center',
                      top: 60,
                      textStyle: {
                          color: '#333'
                      }
                  },

                  // 地图上圆点的提示
                  tooltip: {
                      show: true, //不显示提示标签
                      formatter: '{b}', //提示标签格式
                      backgroundColor:"#ff7f50",//提示标签背景颜色
                      textStyle:{color:"#fff"} //提示标签字体颜色
                  },
                  // 图例按钮 点击可选择哪些不显示
                  legend: {
                      orient: 'vertical',
                      left: 'left',
                      top: 'bottom',
                      data: ['地区热度', 'top5'],
                      textStyle: {
                          color: '#fff'
                      }
                  },
                  // 地理坐标系组件
                  geo: {
                      map: 'china',
                      label: {
                          // true会显示城市名
                          emphasis: {
                              show: true
                          }
                      },
                      itemStyle: {
                          // 地图背景色
                          normal: {
                              areaColor: '#465471',
                              borderColor: '#282F3C'
                          },
                          // 悬浮时
                          emphasis: {
                              areaColor: '#8796B4'
                          }
                      }
                  },
                  // 系列列表
                  series: [
                      {
                          name: '地区热度',
                          // 表的类型 这里是散点
                          type: 'scatter',
                          // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                          coordinateSystem: 'geo',
                          data: [],
                          // 标记的大小
                          symbolSize: 12,
                          // 鼠标悬浮的时候在圆点上显示数值
                          label: {
                              normal: {
                                  show: false
                              },
                              emphasis: {
                                  show: false
                              }
                          },
                          itemStyle: {
                              normal: {
                                  color: '#ddb926'
                              },
                              // 鼠标悬浮的时候圆点样式变化
                              emphasis: {
                                  borderColor: '#fff',
                                  borderWidth: 1
                              }
                          }
                      },
                      {
                          name: 'top5',
                          // 表的类型 这里是散点
                          type: 'effectScatter',
                          // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                          coordinateSystem: 'geo',
                          data: this.data,
                          // 标记的大小
                          symbolSize: 12,
                          showEffectOn: 'render',
                          rippleEffect: {
                              brushType: 'stroke'
                          },
                          hoverAnimation: true,
                          label: {
                              normal: {
                                  show: false
                              }
                          },
                          itemStyle: {
                              normal: {
                                  color: '#f4e925',
                                  shadowBlur: 10,
                                  shadowColor: '#333'
                              }
                          },
                          zlevel: 1
                      }
                  ]
              }
              return opt
          }
        },
        mounted() {
          this.drawMap()
        },
        methods: {
            drawMap(){
                let myChart = echarts.init(document.getElementById('map'))
                myChart.setOption(this.opt)
            },
            randomData() {
                return Math.round(Math.random()*500);
            }
        }
    }
</script>

<style scoped>
    .echart{
        width: 600px;
        height: 600px;
        margin: 0 auto;
    }
    #map{
        width: 600px;
        height: 600px;
    }
</style>