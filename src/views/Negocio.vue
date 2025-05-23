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
      <ion-grid class="dashboard-grid">
        <!-- Primera fila -->
        <ion-row class="ion-row-1">
          <!-- ChartJS: Crecimiento de usuarios -->
          <ion-col size="12" size-md="6" class="chart-col">
            <div class="chart-container">
              <canvas ref="lineChart"></canvas>
            </div>
          </ion-col>

          <!-- ApexCharts: Usuarios activos -->
          <ion-col size="12" size-md="6" class="chart-col">
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

        <!-- Segunda fila -->
        <ion-row class="ion-row-2">
          <!-- ApexCharts: Rutina cumplida -->
          <ion-col size="12" size-md="4" class="chart-col">
            <div class="chart-container inf-div">
              <!-- Dani este es mio -->
              <MiDonutChart :completed="65" :notCompleted="35" :color1="'#E09915'" :color2="'#FFB700'"/>
            </div>
          </ion-col>

          <!-- ECharts: Uso de funcionalidad -->
          <ion-col size="12" size-md="4" class="chart-col">
            <div class="chart-container inf-div">
              <v-chart
                class="w-full h-full"
                :option="horizontalBarOptions"
                autoresize
              />
            </div>
          </ion-col>

          <!-- ECharts: Subida de imágenes -->
          <ion-col size="12" size-md="4" class="chart-col">
            <div class="chart-container inf-div">
              <v-chart
                class="w-full h-full"
                :option="paretoOptions"
                autoresize
              />
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// El script se mantiene igual
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import VueApexCharts from "vue3-apexcharts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

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
  IonGrid,
} from "@ionic/vue";

import MiDonutChart from "@/views/components/negocio/charts/DonutChart.vue";
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);

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
      type: "line",
      data: {
        labels: ["Dic", "Ene", "Feb", "Mar", "Abr", "May"],
        datasets: [
          {
            label: "Usuarios registrados",
            data: [800, 2200, 2000, 1900, 2500, 3000],
            borderColor: "#E09915",
            backgroundColor: "rgba(224, 153, 21, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Crecimiento de usuarios",
            color: "#ffffff",
            font: { size: 18 },
          },
          legend: {
            labels: {
              color: "#ffffff",
            },
          },
          tooltip: {
            backgroundColor: '#000000',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#E09915',
            borderWidth: 1,
          },
          annotation: {
            annotations: {
    kpiLine: {
      type: 'line',
      yMin: 4500,
      yMax: 4500,
      borderColor: '#FFFF39',
      borderWidth: 2,
      borderDash: [6, 6],
      label: {
        content: 'Meta Junio: 4500',
        enabled: true,
        position: 'end',
        color: '#ffffff',
        backgroundColor: 'purple',
        font: {
          size: 10, // tamaño pequeño
          weight: 'normal'
        },
        padding: 4,
        xAdjust: -10
      }
    }
  }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#ffffff" },
          },
          y: {
            grid: { display: false },
            ticks: { color: "#ffffff" },
          },
        },
      },
    });
  }
});
// ApexCharts: Usuarios activos
const stackedBarOptions = ref({
  chart: {
    type: "bar",
    stacked: true,
    height: "100%",
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "70%",
    },
  },
  title: {
    text: "Usuarios activos a 6 meses",
    align: "center",
    style: { color: "#ffffff" },
  },
  colors: ["#E09915", "#FFB700"],
  xaxis: {
    categories: ["Dic '25", "Ene '25", "Feb '25", "Mar '25", "Abr '25", "May '25"],
    labels: { style: { colors: "#ffffff" } },
  },
  yaxis: {
    labels: { style: { colors: "#ffffff" } },
  },
  grid: {
    show: true,
  },
  legend: {
    labels: { colors: "#ffffff" },
  },
  tooltip: {
    theme: 'dark',
  },
  annotations: {
    yaxis: [
      {
        y: 4000,
        borderColor: '#800080',
        strokeDashArray: 4,
        label: {
          text: 'KPI esperado (40%)',
          style: {
            color: '#fff',
            background: '#800080',
            fontSize: '11px',
          },
        },
      },
    ],
  },
});


const stackedBarSeries = ref([
  { name: "Activos", data: [658, 1800, 1500, 1300, 2200, 2900] },
  { name: "Total alta", data: [142, 400, 700, 900, 300, 100] },
]);

// ECharts: Uso de funcionalidad
const horizontalBarOptions = ref({
  title: {
    text: "Uso de funcionalidad específica",
    left: "center",
    textStyle: { color: "#ffffff" },
  },
  tooltip: { trigger: "axis" },
  grid: { show: false, containLabel: true },
  xAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "#ffffff" } },
    axisLabel: { color: "#ffffff", formatter: "{value}%" },
    splitLine: { show: false }, // quita líneas
  },
  yAxis: {
    type: "category",
    data: ["Progreso", "Entrenamiento", "Crear rutina"],
    axisLine: { lineStyle: { color: "#ffffff" } },
    axisLabel: { color: "#ffffff" },
  },
  series: [
    {
      name: "Uso",
      type: "bar",
      data: [20, 35, 45],
      itemStyle: {
        color: (params) => {
          const paleta = ["#E09915", "#E09915", "#E09915", "#E09915"];
          return paleta[params.dataIndex];
        },
      },
      label: {
        show: true,
        position: "insideRight",
        color: "#ffffff",
      },
      // Añadir estas líneas para los KPIs
      markLine: {
        data: [
          {
            name: 'Progreso 25%',
            xAxis: 25,
            lineStyle: {
              color: '#ff0000', 
              type: 'dashed' 
            },
            label: {
              show: true,
              position: 'end',
              formatter: 'Progreso 25%'
            }
          }
        ],
        symbol: 'none', // Elimina los símbolos de los extremos
        lineStyle: {
          width: 2 // Grosor de la línea
        }
      }
    },
  ],
});

// ECharts: Pareto
const paretoOptions = ref({
  title: {
    text: "Subida de imágenes",
    left: "center",
    textStyle: { color: "#ffffff" },
  },
  tooltip: { trigger: "axis" },
  legend: {
    data: ["Ejercicio", "Subidas"],
    top: "bottom",
    textStyle: { color: "#ffffff" },
  },
  xAxis: {
    data: ["Nov.", "Int.", "Adv."],
    axisLine: { lineStyle: { color: "#ffffff" } },
    axisLabel: { color: "#ffffff" },
    splitLine: { show: false },
  },
  yAxis: [
    {
      type: "value",
      name: "Ejercicio",
      axisLine: { lineStyle: { color: "#ffffff" } },
      axisLabel: { color: "#ffffff" },
      splitLine: { show: false },
    },
    {
      type: "value",
      name: "Subidas %",
      min: 0,
      max: 100,
      axisLine: { lineStyle: { color: "#ffffff" } },
      axisLabel: { color: "#ffffff" },
      splitLine: { show: false },
    },
  ],
   series: [
    {
      name: "Ejercicio",
      type: "bar",
      data: [50, 40, 10],
      itemStyle: { color: "#FED300" },
      label: { show: true, position: "top", color: "#ffffff" },
    },
    {
      name: "Subidas",
      type: "line",
      yAxisIndex: 1,
      data: [90, 70, 30],
      itemStyle: { color: "#FF9800" },
      lineStyle: { width: 2 },
      label: { show: true, color: "#FF9800" },
      // Marca KPI aquí dentro
      markLine: {
        data: [{
          name: 'KPI Subidas',
          yAxis: 60,
          lineStyle: {
            color: '#FF0000',
            type: 'dashed',
            width: 2
          },
          label: {
            show: true,
            position: 'middle',
            formatter: 'KPI 60%',
            color: '#FF0000'
          }
        }],
        symbol: 'none',
        silent: true
      }
    },
  ],
});
</script>

<style scoped>
ion-row {
  overflow: hidden;
}

ion-col {
  max-height: 100%;
  --ion-grid-column-padding: 10px;
}

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

 ion-title {
    --color: white;
  }
  

@media (min-width: 992px) {
  ion-grid {
    height: 100%;
  }
  .ion-row-1 {
    height: 50%;
    max-height: 50%;
  }
  .ion-row-2 {
    height: 50%;
    max-height: 50%;
  }
}


/* Estilos específicos para móvil */
@media (max-width: 991px) {
  ion-grid {
    height: auto;
  }
  
  ion-row {
    height: auto !important;
    max-height: none !important;
    margin-bottom: 20px;
  }
  
  ion-col {
    height: auto;
    min-height: 250px;
    margin-bottom: 20px;
  }
 
  .chart-container {
    height: 100%;
    min-height: 250px;
  }
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
  display: flex;
  flex-direction: column;
}
</style>