<template>
  <ion-page>
    <!-- Componente de partículas -->
    <div id="tsparticles"></div>
    
    <ion-header :translucent="true" class="header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Tecnico</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding transparent-content">

      <ion-grid>
        <!-- Fila 1: 4 Columnas -->
        <ion-row class="ion-row-1">
          <ion-col size="12" size-lg="3">
            <div class="chart-container">
              <!-- Gráfico 1: Errores 500/400 (ChartJS - Barras) -->
              <canvas ref="errorChart"></canvas>
            </div>
          </ion-col>
          <ion-col size="12" size-lg="3">
            <div class="chart-container">
              <!-- Gráfico 2: Horas pico de uso (ECharts - Heatmap) -->
              <h3>Horas pico de uso</h3>
              <div ref="heatmapChart" class="chart-inner"></div>
            </div>
          </ion-col>
          <ion-col size="12" size-lg="3">
            <div class="chart-container">
              <!-- Gráfico 3: Incidencias detectadas (ApexCharts - Línea con anotaciones) -->
              <h3>Incidencias detectadas</h3>
              <div ref="incidentsChart" class="chart-inner"></div>
            </div>
          </ion-col>
          <ion-col size="12" size-lg="3">
            <div class="chart-container">
              <!-- Gráfico 4: Estabilidad de conexión (ECharts - Boxplot) -->
              <h3>Estabilidad de conexión</h3>
              <div ref="boxplotChart" class="chart-inner"></div>
            </div>
          </ion-col>
        </ion-row>

        <!-- Fila 2: 1 Columna (Gráfico en tiempo real) -->
        <ion-row class="ion-row-2">
          <ion-col size="12" size-lg="12">
            <div class="chart-container">
              <!-- Gráfico 5: Carga del servidor en tiempo real (ApexCharts - Área) -->
              <h3>Carga del servidor</h3>
              <div ref="realtimeChart" class="chart-inner"></div>
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
  IonGrid
} from "@ionic/vue";
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import Chart from 'chart.js/auto';
import * as echarts from 'echarts';
import ApexCharts from 'apexcharts';
import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

// Referencias para los gráficos
const errorChart = ref(null);
const heatmapChart = ref(null);
const incidentsChart = ref(null);
const boxplotChart = ref(null);
const realtimeChart = ref(null);

// Referencias a las instancias de los gráficos
let errorChartInstance = null;
let heatmapChartInstance = null;
let incidentsChartInstance = null;
let boxplotChartInstance = null;
let realtimeChartInstance = null;

// Intervalo para actualizar el gráfico en tiempo real
let realtimeInterval = null;

// Colores de la aplicación
const colors = {
  primary: '#FBBC05',
  secondary: '#FFFFFF',
  warning: '#f0883e',
  danger: '#FFFFFF',
  background: '#FFFFFF',
  text: '#FFFFFF'
};

// Variable para controlar si estamos en móvil
const isMobile = ref(window.innerWidth < 992);

onMounted(async () => {

  // Esperar a que el DOM se actualice antes de inicializar los gráficos
  await nextTick();
  
  // Inicializar todos los gráficos
  initErrorChart();
  
  // Usar setTimeout para dar tiempo a que los elementos se rendericen completamente
  setTimeout(() => {
    initHeatmapChart();
    initIncidentsChart();
    initBoxplotChart();
    initRealtimeChart();
  }, 100);
  
  // Manejar el redimensionamiento de la ventana
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  // Limpiar los intervalos y los event listeners
  if (realtimeInterval) {
    clearInterval(realtimeInterval);
  }
  
  window.removeEventListener('resize', handleResize);
  
  // Destruir las instancias de los gráficos
  if (errorChartInstance) errorChartInstance.destroy();
  if (heatmapChartInstance) heatmapChartInstance.dispose();
  if (incidentsChartInstance) incidentsChartInstance.destroy();
  if (boxplotChartInstance) boxplotChartInstance.dispose();
  if (realtimeChartInstance) realtimeChartInstance.destroy();
});

// Función para manejar el redimensionamiento
const handleResize = () => {
  isMobile.value = window.innerWidth < 992;
  
  // Dar tiempo para que el DOM se actualice
  setTimeout(() => {
    if (heatmapChartInstance) {
      heatmapChartInstance.resize();
    }
    
    if (boxplotChartInstance) {
      boxplotChartInstance.resize();
    }
    
    if (incidentsChartInstance) {
      incidentsChartInstance.render();
    }
    
    if (realtimeChartInstance) {
      realtimeChartInstance.render();
    }
  }, 100);
};

// 1. Gráfico de errores 500/400
const initErrorChart = () => {
  if (!errorChart.value) return;
  
  const ctx = errorChart.value.getContext('2d');
  
  // Datos de ejemplo para errores 500/400
  const data = {
    labels: ["Dic", "Ene", "Feb", "Mar","Abr","May"],
    datasets: [
      {
        label: 'Errores 400',
        data: [50, 30, 15,25, 70],
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderWidth: 1
      },
      {
        label: 'Errores 500',
        data: [20, 8, 3, 20, 30],
        backgroundColor: colors.danger,
        borderColor: colors.danger,
        borderWidth: 1
      }
    ]
  };
  
  errorChartInstance = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: colors.text
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: colors.text
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: colors.text
          }
        },
        // Añadir esto para la línea KPI
        annotation: {
          annotations: {
            kpiLine: {
              type: 'line',
              yMin: 10,
              yMax: 10,
              borderColor: '#FF0039',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                display: true,
                content: 'KPI 10',
                position: 'start',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#fff',
                font: {
                  weight: 'bold'
                }
              },
              drawTime: 'afterDatasetsDraw'
            }
          }
        }
      }
    }
  });
};

// 2. Gráfico de horas pico (ECharts - Heatmap)
const initHeatmapChart = () => {
  if (!heatmapChart.value) return;
  
  // Asegurarse de que el contenedor tenga dimensiones
  if (heatmapChart.value.clientHeight === 0) {
    heatmapChart.value.style.height = isMobile.value ? '200px' : '85%';
  }
  
  heatmapChartInstance = echarts.init(heatmapChart.value);
  
  // Datos para el heatmap
  const hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const hourActivityPattern = [10, 15, 70, 30, 90, 40]; 
  

  const data = [];

  for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
    for (let hourIndex = 0; hourIndex < hours.length; hourIndex++) {
      let base = hourActivityPattern[hourIndex];
      let weekendBoost = (dayIndex === 5 || dayIndex === 6) ? 10 + Math.floor(Math.random() * 10) : 0;
      let randomVariation = Math.floor(Math.random() * 10) - 5;
      let value = Math.max(0, base + weekendBoost + randomVariation);

      data.push([hourIndex, dayIndex, value]);
    }
  }

  const option = {
    tooltip: {
      position: 'top'
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: hours,
      splitArea: {
        show: true
      },
      axisLine: {
        lineStyle: {
          color: colors.text
        }
      },
      axisLabel: {
        color: colors.text
      }
    },
    yAxis: {
      type: 'category',
      data: days,
      splitArea: {
        show: true
      },
      axisLine: {
        lineStyle: {
          color: colors.text
        }
      },
      axisLabel: {
        color: colors.text
      }
    },
    visualMap: {
      min: 0,
      max: 150,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      textStyle: {
        color: colors.text
      },
      inRange: {
        color: ['#FBBC05', '#F8A800', '#F59C00', '#F29200', '#F08700', '#EC7C00', '#E57100', '#E16700', '#DD5C00', '#D75200', '#FFFFFF']

      }
    },
    series: [
      {
        name: 'Actividad',
        type: 'heatmap',
        data: data,
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    backgroundColor: 'transparent'
  };
  
  heatmapChartInstance.setOption(option);
};

// 3. Gráfico de incidencias (ApexCharts - Línea con anotaciones)
const initIncidentsChart = () => {
  if (!incidentsChart.value) return;

  if (incidentsChart.value.clientHeight === 0) {
    incidentsChart.value.style.height = isMobile.value ? '200px' : '85%';
  }

  const options = {
    series: [30,50, 20], // Porcentajes de disponibilidad por servicio
    chart: {
      height: '100%',
      type: 'radialBar',
      background: 'transparent',
      foreColor: colors.text
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '14px'
          },
          value: {
            fontSize: '16px',
            formatter: (val) => `${val}%`
          },
          total: {
            show: true,
            label: 'Promedio',
            formatter: function () {
              return '85%';
            }
          }
        }
      }
    },
    labels: ['API Auth', 'API C. de rutinas', 'Progreso'],
    colors: [colors.primary, colors.warning, '#FF6400']
  };

  incidentsChartInstance = new ApexCharts(incidentsChart.value, options);
  incidentsChartInstance.render();
};


// 4. Gráfico de estabilidad de conexión (ECharts - Boxplot)
const initBoxplotChart = () => {
  if (!boxplotChart.value) return;
  
  // Asegurarse de que el contenedor tenga dimensiones
  if (boxplotChart.value.clientHeight === 0) {
    boxplotChart.value.style.height = isMobile.value ? '200px' : '85%';
  }
  
  boxplotChartInstance = echarts.init(boxplotChart.value);
  
  // Generar datos aleatorios para el boxplot
  const generateBoxplotData = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const base = Math.random() * 100 + 50;
      const data = [];
      for (let j = 0; j < 50; j++) {
        data.push(Math.random() * 50 + base);
      }
      data.sort((a, b) => a - b);
      
      // Calcular valores para el boxplot
      const q1 = data[Math.floor(data.length * 0.25)];
      const median = data[Math.floor(data.length * 0.5)];
      const q3 = data[Math.floor(data.length * 0.75)];
      const iqr = q3 - q1;
      const min = Math.max(q1 - 1.5 * iqr, data[0]);
      const max = Math.min(q3 + 1.5 * iqr, data[data.length - 1]);
      
      result.push([min, q1, median, q3, max]);
    }
    return result;
  };
  
  const option = {
    title: {
      show: false
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params) {
        return `
          <div style="font-size:14px;color:#666;font-weight:400;line-height:1;">
            ${params.name}<br/>
            Min: ${params.data[0].toFixed(2)}ms<br/>
            Q1: ${params.data[1].toFixed(2)}ms<br/>
            Median: ${params.data[2].toFixed(2)}ms<br/>
            Q3: ${params.data[3].toFixed(2)}ms<br/>
            Max: ${params.data[4].toFixed(2)}ms
          </div>
        `;
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: ['/post', '/upload', '/get'],
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false
      },
      axisLabel: {
        color: colors.text
      },
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: colors.text
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Tiempo (ms)',
      splitArea: {
        show: true
      },
      axisLabel: {
        color: colors.text
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      axisLine: {
        lineStyle: {
          color: colors.text
        }
      }
    },
    series: [
      {
        name: 'Tiempo de respuesta',
        type: 'boxplot',
        data: generateBoxplotData(),
        itemStyle: {
          color: colors.primary,
          borderColor: colors.primary
        },
        emphasis: {
          itemStyle: {
            borderColor: colors.warning
          }
        }
      }
    ],
    backgroundColor: 'transparent'
  };
  
  boxplotChartInstance.setOption(option);
};

// 5. Gráfico de carga del servidor en tiempo real (ApexCharts - Área)
const initRealtimeChart = () => {
  if (!realtimeChart.value) return;
  
  // Asegurarse de que el contenedor tenga dimensiones
  if (realtimeChart.value.clientHeight === 0) {
    realtimeChart.value.style.height = isMobile.value ? '200px' : '85%';
  }
  
  // Datos iniciales para el gráfico en tiempo real
  const INITIAL_DATA_POINTS = 20;
  const initialData = [];
  const initialCategories = [];
  
  // Generar datos iniciales
  const now = new Date();
  for (let i = INITIAL_DATA_POINTS; i > 0; i--) {
    const time = new Date(now - i * 1000);
    initialCategories.push(time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    initialData.push(Math.floor(Math.random() * 30) + 20); // Valores entre 20 y 50
  }
  
  const options = {
    series: [{
      name: 'Carga CPU',
      data: initialData
    }],
    chart: {
      height: '100%',
      type: 'area',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      background: 'transparent',
      foreColor: colors.text
    },
    colors: [colors.primary],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      row: {
        colors: ['transparent']
      }
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: initialCategories,
      labels: {
        style: {
          colors: colors.text
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        style: {
          colors: colors.text
        },
        formatter: function(val) {
          return val.toFixed(0) + '%';
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      }
    }
  };
  
  realtimeChartInstance = new ApexCharts(realtimeChart.value, options);
  realtimeChartInstance.render();
  
  // Actualizar el gráfico en tiempo real cada segundo
  realtimeInterval = setInterval(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Generar un valor aleatorio con tendencia (para que no sea completamente aleatorio)
    const lastValue = options.series[0].data[options.series[0].data.length - 1];
    let newValue = lastValue + (Math.random() * 10 - 5); // Cambio aleatorio entre -5 y +5
    
    // Asegurar que el valor esté entre 0 y 100
    newValue = Math.max(0, Math.min(100, newValue));
    
    // Añadir datos al gráfico
    realtimeChartInstance.updateSeries([{
      data: [...options.series[0].data.slice(1), newValue]
    }]);
    
    realtimeChartInstance.updateOptions({
      xaxis: {
        categories: [...options.xaxis.categories.slice(1), timeStr]
      }
    }, false, true);
    
    // Actualizar los datos almacenados
    options.series[0].data = [...options.series[0].data.slice(1), newValue];
    options.xaxis.categories = [...options.xaxis.categories.slice(1), timeStr];
  }, 1000);
};
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
  z-index: 1;
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

.chart-container h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #c9d1d9;
  text-align: center;
}
</style>