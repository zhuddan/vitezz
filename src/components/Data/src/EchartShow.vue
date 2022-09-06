<script setup lang="ts">
  import * as echarts from 'echarts';

  type EChartsOption = echarts.EChartsOption;

  // const
  interface DataItem {
    name: string;
    // 小于
    lt?: number;
    // 小于等于
    lt_?: number;
    // 大于
    gt?: number;
    // 大于等于
    gt_?: number;
    data: number[];
  }
  var a: number[] = [];
  const data: DataItem[] = [
    {
      name: '小于-2',
      lt: -2,
      data: [],
    },
    {
      name: '-2-0',
      lt_: 0,
      gt: -2,
      data: [],
    },
    {
      name: '0-2',
      lt_: 2,
      gt: 0,
      data: [],
    },
    {
      name: '大于2',
      gt: 2,
      data: [],
    },
  ];

  function render() {
    for (let index = 0; index < a.length; index++) {
      const value = a[index];
      for (let i = 0; i < data.length; i++) {
        const condition = data[i];
        var { s } = test(condition, value);
        if (s) {
          condition.data.push(value);
          break;
        }
      }
    }
  }

  function test(condition: DataItem, value: number) {
    // 小于
    const ltRes = condition.lt != undefined ? value < condition.lt : true;
    // 小于等于
    const lt_Res = condition.lt_ != undefined ? value <= condition.lt_ : true;
    // 大于
    const gtRes = condition.gt != undefined ? value > condition.gt : true;
    // 大于等于
    const gt_Res = condition.gt_ != undefined ? value >= condition.gt_ : true;
    var s = ltRes && lt_Res && gtRes && gt_Res;
    return { s, condition };
  }

  const num = ref(0);

  function handleTest() {
    data.forEach((e) => {
      var res = test(e, num.value);
      console.log(res);
    });
  }

  function init() {
    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom, undefined, { renderer: 'svg' });
    var option: EChartsOption;

    option = {
      title: {
        text: '毕节2011年-2021年冰雹天气记录-三小时变压',
        left: 'center',
      },
      xAxis: {
        name: '数值区间',
        nameGap: 30,
        nameLocation: 'middle',

        type: 'category',
        data: data.map((e) => e.name),
        axisTick: {
          alignWithLabel: true,
          show: false,
        },
      },
      yAxis: {
        name: '数量',
        nameGap: 30,
        type: 'value',
        nameLocation: 'middle',
      },
      series: [
        {
          data: data.map((e) => e.data.length),
          type: 'bar',
          // showBackground: true,
          label: {
            show: true,
            position: 'top',
          },
          barWidth: 30, //柱图宽度
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    };

    option && myChart.setOption(option);
  }

  onMounted(init);
</script>

<template>
  <div id="main"> </div>
</template>

<style scoped>
  #main {
    height: 300px;
    width: 500px;
  }
</style>
