<template>
  <ion-page>
    <ion-header :translucent="true" class="header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Negocio</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="transparent-content">
      <ion-grid class="h-full">
        <ion-row class="row-height">
          <!-- ChartJS: Crecimiento de usuarios -->
          <ion-col size="12" size-md="6" class="col-height">
            <div class="chart-container">
              <canvas ref="lineChart"></canvas>
            </div>
          </ion-col>

          <!-- ApexCharts: Usuarios activos -->
          <ion-col size="12" size-md="6" class="col-height">
            <div class="chart-container">
            <apexchart
              type="bar"
              height="100%"
              :options="stackedBarOptions"
              :series="stackedBarSeries"
            ></apexchart>
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="row-height">
          <!-- ApexCharts: Rutina cumplida -->
          <ion-col size="12" size-md="4" class="col-height">
            <div class="chart-container">
              <DonutChart/>
            </div>
          </ion-col>

          <!-- ECharts: Uso de funcionalidad -->
          <ion-col size="12" size-md="4" class="col-height">
            <div class="chart-container">
            <v-chart
              class="w-full h-full"
              :option="horizontalBarOptions"
              autoresize
            />
          </div>
          </ion-col>

          <!-- ECharts: Subida de imágenes -->
          <ion-col size="12" size-md="4" class="col-height">
            <div class="chart-container">
            <v-chart class="w-full h-full" :option="paretoOptions" autoresize />
          </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import VueApexCharts from 'vue3-apexcharts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCol,
  IonRow,
  IonGrid
} from "@ionic/vue";

import DonutChart from '@/views/components/negocio/charts/DonutChart.vue'

// Registro de componentes ApexCharts
const apexchart = VueApexCharts;

// Configuración ECharts
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
]);

// ChartJS: Crecimiento de usuarios
const lineChart = ref<HTMLCanvasElement>();
onMounted(() => {
  if (lineChart.value) {
    new Chart(lineChart.value!, {
  type: 'line',
  data: {
    labels: ['Ene ’25', 'Feb ’25', 'Mar ’25', 'Abr ’25', 'May ’25'],
    datasets: [{
      label: 'Usuarios registrados',
      data: [1200, 1800, 2400, 3200, 3900],
      borderColor: '#E09915',
      backgroundColor: 'rgba(224, 153, 21, 0.2)',  // color de relleno opcional
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Crecimiento de usuarios',
        color: '#ffffff',             // título en blanco
        font: { size: 18 }
      },
      legend: {
        labels: {
          color: '#ffffff'            // leyenda en blanco
        }
      },
      tooltip: {
        titleColor: '#000',           // opcional: color de texto del tooltip
        bodyColor: '#000'
      }
    },
    scales: {
      x: {
        grid: {
          display: false              // quita líneas de fondo verticales
        },
        ticks: {
          color: '#ffffff'            // etiquetas ejes en blanco
        }
      },
      y: {
        grid: {
          display: false              // quita líneas de fondo horizontales
        },
        ticks: {
          color: '#ffffff'
        }
      }
    }
  }
});
  }})

// ApexCharts: Usuarios activos
const stackedBarOptions = ref({
  chart: {
    type: 'bar',
    stacked: true,
    height: '100%',
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%'
    }
  },
  title: {
    text: 'Usuarios activos a 4 meses',
    align: 'center',
    style: { color: '#ffffff' }       // título en blanco
  },
  colors: ['#E09915', '#FFB700'],     // tus colores
  xaxis: {
    categories: ['Dic ’24', 'Ene ’25', 'Feb ’25'],
    labels: { style: { colors: '#ffffff' } }
  },
  yaxis: {
    labels: { style: { colors: '#ffffff' } }
  },
  grid: {
    show: false                       // quita todas las líneas de grid
  },
  legend: {
    labels: { colors: '#ffffff' }
  },
  responsive: [ /* ... */ ]
});


const stackedBarSeries = ref([
  { name: 'Activos', data: [320, 400, 480] },
  { name: 'Total alta', data: [800, 1000, 1200] }
]);

// ECharts: Uso de funcionalidad
const horizontalBarOptions = ref({
  title: {
    text: 'Uso de funcionalidad específica',
    left: 'center',
    textStyle: { color: '#ffffff' }
  },
  tooltip: { trigger: 'axis' },
  grid: { show: false, containLabel: true },
  xAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#ffffff' } },
    axisLabel: { color: '#ffffff', formatter: '{value}%' },
    splitLine: { show: false }      // quita líneas
  },
  yAxis: {
    type: 'category',
    data: ['Freemium', 'Essentials', 'Premium', 'Enterprise'],
    axisLine: { lineStyle: { color: '#ffffff' } },
    axisLabel: { color: '#ffffff' }
  },
  series: [{
    name: 'Uso',
    type: 'bar',
    data: [40, 55, 75, 90],
    itemStyle: {
      color: (params) => {
        // puedes devolver diferente color según índice
        const paleta = ['#E09915', '#E09915', '#E09915', '#E09915'];
        return paleta[params.dataIndex];
      }
    },
    label: {
      show: true,
      position: 'insideRight',
      color: '#ffffff'               // texto en blanco
    }
  }]
});


// ECharts: Pareto
const paretoOptions = ref({
  title: {
    text: 'Subida de imágenes',
    left: 'center',
    textStyle: { color: '#ffffff' }
  },
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['Subidas', 'Acumulado'],
    top: 'bottom',
    textStyle: { color: '#ffffff' }
  },
  xAxis: {
    data: ['U1', 'U2', 'U3', 'U4', 'U5'],
    axisLine: { lineStyle: { color: '#ffffff' } },
    axisLabel: { color: '#ffffff' },
    splitLine: { show: false }
  },
  yAxis: [
    {
      type: 'value',
      name: 'Subidas',
      axisLine: { lineStyle: { color: '#ffffff' } },
      axisLabel: { color: '#ffffff' },
      splitLine: { show: false }
    },
    {
      type: 'value',
      name: 'Acumulado %',
      min: 0,
      max: 100,
      axisLine: { lineStyle: { color: '#ffffff' } },
      axisLabel: { color: '#ffffff' },
      splitLine: { show: false }
    }
  ],
  series: [
    {
      name: 'Subidas',
      type: 'bar',
      data: [120, 90, 50, 30, 20],
      itemStyle: { color: '#FED300' },
      label: { show: true, position: 'top', color: '#ffffff' }
    },
    {
      name: 'Acumulado',
      type: 'line',
      yAxisIndex: 1,
      data: [38, 66, 81, 91, 100],
      itemStyle: { color: '#FF9800' },
      lineStyle: { width: 2 },
      label: { show: true, color: '#ffffff' }
    }
  ]
});
</script>

<style scoped>
.transparent-content {
  --background: transparent !important;
  background: transparent !important;
}

/* cambiar estilos del header */
ion-header.header {
  border: none !important;
  box-shadow: none !important;
}

ion-header.header * {
  background: transparent !important;
  --background: transparent !important;
  background-color: transparent !important;
}

 
.h-full {
  height: 100%;
}

.row-height {
  height: 45vh;
  min-height: 400px;
}

.col-height {
  height: 100%;
  min-height: 300px;
}

.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(7px);
}

ion-col {
  padding: 8px;
}

ion-row {
  margin: -8px;
}
</style>