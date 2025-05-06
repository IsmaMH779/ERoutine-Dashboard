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

    <ion-content :fullscreen="true" class="ion-padding transparent-content">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Negocio</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid class="dashboard-grid">
        <!-- Fila 1: 4 Columnas -->
        <ion-row class="ion-row-1">
          <ion-col size="12" size-lg="6">
            <div class="box">
              <div class="chart-container">
                <h3>Ejercicios más populares (KPI #8)</h3>
                <apex-chart 
                  type="bar"
                  :options="horizontalBarOptions"
                  :series="horizontalBarSeries"
                  height="90%"
                ></apex-chart>
              </div>
            </div>
          </ion-col>
          <ion-col size="12" size-lg="6">
            <div class="box">
              <div class="chart-container">
                <h3>Relación fotos vs rutinas (KPI #10)</h3>
                <apex-chart 
                  type="scatter"
                  :options="scatterOptions"
                  :series="scatterSeries"
                  height="90%"
                ></apex-chart>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 2: 2 Columnas -->
        <ion-row class="ion-row-2">
          <ion-col size="12" size-lg="12">
            <div class="box">
              <div class="chart-container">
                <h3>Crecimiento de usuarios activos mensuales (KPI #6)</h3>
                <e-chart 
                  :option="stackedAreaOption" 
                  autoresize
                  style="width: 100%; height: 90%;"
                ></e-chart>
              </div>
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 3: 2 Columnas -->
        <ion-row class="ion-row-3">
          <ion-col size="12" size-lg="8">
            <div class="box">
              <div class="chart-container">
                <h3>Rutinas finalizadas por semana (KPI #9)</h3>
                <canvas ref="lineChartRef" style="width: 100%; height: 90%;"></canvas>
              </div>
            </div>
          </ion-col>
          <ion-col size="12" size-lg="4">
            <div class="box">
              <div class="chart-container">
                <h3>Usuarios retenidos después de 3 meses</h3>
                <canvas ref="pieChartRef" style="width: 100%; height: 90%;"></canvas>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
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
import { ref, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart as ELineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VueECharts from 'vue-echarts';
import { Chart, registerables } from 'chart.js';

// Registrar componentes necesarios para ECharts
use([
  CanvasRenderer,
  ELineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

// Registrar componentes necesarios para ChartJS
Chart.register(...registerables);

// Definir componentes
const ApexChart = VueApexCharts;
const EChart = VueECharts;

// Referencias para los canvas de ChartJS
const lineChartRef = ref(null);
const pieChartRef = ref(null);

// Datos para ApexCharts - Gráfico de barras horizontales
const horizontalBarSeries = ref([{
  data: [78, 65, 61, 53, 42]
}]);

const horizontalBarOptions = ref({
  chart: {
    type: 'bar',
    height: '100%',
    toolbar: {
      show: false
    },
    foreColor: '#ccc'
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '60%',
      distributed: true
    }
  },
  colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B'],
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    style: {
      colors: ['#fff']
    },
    formatter: function(val: number) {
      return val + ' usuarios';
    },
    offsetX: 0
  },
  xaxis: {
    categories: ['Press de banca', 'Sentadillas', 'Peso muerto', 'Dominadas', 'Zancadas'],
    labels: {
      style: {
        colors: '#ccc'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#ccc'
      }
    }
  },
  grid: {
    borderColor: '#333'
  },
  tooltip: {
    theme: 'dark'
  },
  // Añadir línea de objetivo KPI
  annotations: {
    xaxis: [{
      x: 70,
      borderColor: '#FF4560',
      label: {
        borderColor: '#FF4560',
        style: {
          color: '#fff',
          background: '#FF4560'
        },
        text: 'Objetivo KPI: 70'
      }
    }]
  }
});

// Datos para ApexCharts - Gráfico de dispersión
const scatterSeries = ref([{
  name: "Usuarios",
  data: [
    [5, 2], [10, 4], [15, 5], [20, 8], [25, 9],
    [30, 11], [35, 12], [40, 13], [45, 15], [50, 16],
    [55, 17], [60, 18], [65, 19], [70, 20], [75, 21],
    [80, 22], [85, 23], [90, 24], [95, 25], [100, 26]
  ]
}]);

const scatterOptions = ref({
  chart: {
    height: '100%',
    type: 'scatter',
    zoom: {
      enabled: true,
      type: 'xy'
    },
    foreColor: '#ccc',
    toolbar: {
      show: false
    }
  },
  xaxis: {
    title: {
      text: 'Fotos subidas',
      style: {
        color: '#ccc'
      }
    },
    labels: {
      style: {
        colors: '#ccc'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Rutinas completadas',
      style: {
        color: '#ccc'
      }
    },
    labels: {
      style: {
        colors: '#ccc'
      }
    }
  },
  markers: {
    size: 6,
    colors: ['#00E396']
  },
  grid: {
    borderColor: '#333'
  },
  tooltip: {
    theme: 'dark'
  },
  // Añadir anotaciones para objetivos KPI
  annotations: {
    yaxis: [{
      y: 20,
      borderColor: '#FF4560',
      label: {
        borderColor: '#FF4560',
        style: {
          color: '#fff',
          background: '#FF4560'
        },
        text: 'Objetivo KPI: 20 rutinas'
      }
    }],
    xaxis: [{
      x: 70,
      borderColor: '#FEB019',
      label: {
        borderColor: '#FEB019',
        style: {
          color: '#fff',
          background: '#FEB019'
        },
        text: 'Objetivo KPI: 70 fotos'
      }
    }]
  }
});

// Datos para ECharts - Gráfico de área acumulada
const stackedAreaOption = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Nuevos usuarios', 'Usuarios recurrentes', 'Usuarios premium', 'Objetivo KPI'],
    textStyle: {
      color: '#ccc'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      axisLabel: {
        color: '#ccc'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        color: '#ccc'
      }
    }
  ],
  series: [
    {
      name: 'Nuevos usuarios',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
    },
    {
      name: 'Usuarios recurrentes',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149]
    },
    {
      name: 'Usuarios premium',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410, 182, 191, 234, 290, 330]
    },
    // Añadir línea de objetivo KPI
    {
      name: 'Objetivo KPI',
      type: 'line',
      stack: false,
      symbol: 'none',
      lineStyle: {
        color: '#FF4560',
        width: 2,
        type: 'dashed'
      },
      data: [800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800]
    }
  ],
  color: ['#80FFA5', '#00DDFF', '#FF8C00', '#FF4560']
});

onMounted(() => {
  // Inicializar gráfico de línea (ChartJS)
  if (lineChartRef.value) {
    new Chart(lineChartRef.value, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8'],
        datasets: [
          {
            label: 'Rutinas finalizadas',
            data: [65, 59, 80, 81, 56, 55, 72, 68],
            fill: false,
            borderColor: '#3e95cd',
            tension: 0.1,
            pointBackgroundColor: '#3e95cd'
          },
          {
            label: 'Objetivo KPI',
            data: [75, 75, 75, 75, 75, 75, 75, 75],
            fill: false,
            borderColor: '#FF4560',
            borderDash: [5, 5],
            pointRadius: 0,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#333'
            },
            ticks: {
              color: '#ccc'
            }
          },
          x: {
            grid: {
              color: '#333'
            },
            ticks: {
              color: '#ccc'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ccc'
            }
          }
        }
      }
    });
  }

  // Inicializar gráfico de pastel (ChartJS)
  if (pieChartRef.value) {
    const pieChart = new Chart(pieChartRef.value, {
      type: 'pie',
      data: {
        labels: ['Usuarios activos', 'Usuarios inactivos'],
        datasets: [{
          data: [30, 70],
          backgroundColor: [
            '#4CAF50',
            '#F44336'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#ccc'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                return context.label + ': ' + context.raw + '%';
              }
            }
          }
        },
        animation: {
          onComplete: function() {
            const ctx = pieChart.ctx;
            if (ctx) {
              ctx.font = '14px Arial';
              ctx.fillStyle = '#FF4560';
              ctx.textAlign = 'center';
              ctx.fillText('Objetivo KPI: 50%', pieChart.width / 2, pieChart.height - 10);
            }
          }
        }
      }
    });
  }

  // Responsive handling for window resize
  window.addEventListener('resize', () => {
    // No es necesario manejar el resize manualmente ya que los componentes lo hacen automáticamente
  });
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

/* El contenido real de cada columna - estilo original */
.box {
  background: #1e1e1e;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 15px;
}

.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-container h3 {
  color: #ccc;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
}

/* Aplicar altura total y por filas, solo en pantallas ≥ md */
@media (min-width: 992px) {
  ion-grid {
    height: 100%;
  }
  .ion-row-1 {
    height: 33%;
    max-height: 33%;
  }
  .ion-row-2 {
    height: 33%;
    max-height: 33%;
  }
  .ion-row-3 {
    height: 33%;
    max-height: 33%;
  }
}
</style>