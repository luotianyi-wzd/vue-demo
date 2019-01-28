<template>
    <div class="echart">
        <div id="myChart"></div>

    </div>
</template>

<script>
    //引入基本模板
    // let echarts = require('echarts/lib/echarts')
    //
    // // 引入饼状图组件
    // require('echarts/lib/chart/pie')
    // // 引入提示框和title组件，图例
    // require('echarts/lib/component/tooltip')
    // require('echarts/lib/component/title')
    // require('echarts/lib/component/legend')
    const echarts = equire([
        'pie',
        'line',
        'bar',
        'tooltip',
        'title',
        'legend'
    ])
    export default {
        name: "echart",
        data() {
            return {
                options: {
                    echartType: 'line',
                    labelShow: false
                }
            }
        },
        computed: {
            opt(){
                let self = this
                let labelOption = {
                    normal: {
                        show: self.options.labelShow,
                        position: 'insideBottom',
                        distance: 15,
                        align: 'left',
                        verticalAlign: 'middle',
                        rotate: 90,
                        formatter: '{c}  {name|{a}}',
                        fontSize: 16,
                        rich: {
                            name: {
                                textBorderColor: '#fff'
                            }
                        }
                    }
                }
               /* let obj = {
                    title: {
                        text: 'Customized Pie',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series : [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:274, name:'联盟广告'},
                                {value:235, name:'视频广告'},
                                {value:400, name:'搜索引擎'}
                            ].sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                }*/

               let obj = {
                   title: {
                       text: ''
                   },
                   tooltip: {
                       trigger: 'axis',
                       axisPointer: {
                           type: 'shadow'
                       }
                   },
                   legend: {
                       data: ['Forest', 'Steppe', 'Desert', 'Wetland']
                   },
                   toolbox: {
                       show: true,
                       orient: 'vertical',
                        right: 20,
                       itemGap: 30,
                       top: 'center',
                       feature: {
                           mark: {show: true},
                           dataView: {show: true, readOnly: false},
                           magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                           restore: {show: true},
                           saveAsImage: {show: true}
                       }
                   },
                   calculable: true,
                   xAxis: [
                       {
                           type: 'category',
                           axisTick: {show: false},
                           data: ['2012', '2013', '2014', '2015', '2016', '2017']
                       }
                   ],
                   yAxis: [
                       {
                           type: 'value'
                       }
                   ],
                   series: [
                       {
                           name:'邮件营销',
                           type: self.options.echartType,
                           stack: '总量',
                           barWidth:30,
                           label: labelOption,
                           data:[120, 132, 101, 134, 90, 230]
                       },
                       {
                           name:'联盟广告',
                           type: self.options.echartType,
                           stack: '总量',
                           barWidth:30,
                           label: labelOption,
                           data:[220, 182, 191, 234, 290, 330]
                       }
                   ]
               }
                return obj
            }
        },
        mounted(){
          this.drawLine()
            this.requset()
        },
        methods:{
            drawLine() {
                let myChart = echarts.init(document.getElementById('myChart'))
                myChart.setOption(this.opt)
            },
            requset() {
                this.$fetch('/api/test/', {}, 'get').then(res => {
                    this.$Message.success(res.msg)
                }).catch(err => {
                    this.$Message.info(err.msg)
                })
            }
        },

    }
</script>

<style scoped>
    .echart{
        width: 1200px;
        height: 800px;
        margin: 0 auto;
    }
    #myChart{
        width: 1200px;
        height: 800px;
    }
</style>