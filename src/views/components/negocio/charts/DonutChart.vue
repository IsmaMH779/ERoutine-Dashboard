<template>
  <!-- Gráfico Donut -->
  <apexchart
    type="donut"
    height="80%"
    :options="donutOptions"
    :series="donutSeries"
  ></apexchart>

  <!-- Indicadores manuales -->
  <div class="legend-items">
    <div class="legend-item">
      <span class="color-box" :style="{ backgroundColor: props.color2 }"></span>
      <p class="label">No completado</p>
      <p class="value">{{ notCompleted }}%</p>
    </div>
    <div class="legend-item">
      <span class="color-box" :style="{ backgroundColor: props.color1 }"></span>
      <p class="label">Completado</p>
      <p class="value">{{ completed }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// props
const props = defineProps<{
  completed: number;
  notCompleted: number;
  color1: string;
  color2: string;
}>();

// Registrar componente
const apexchart = VueApexCharts;

// Series manual
const completed = ref(props.completed);
const notCompleted = ref(props.notCompleted);
const donutSeries = ref([ props.completed, props.notCompleted ]);

// Opciones del donut
const donutOptions = ref({
  chart: {
    type: 'donut',
    height: '100%',
    foreColor: '#ffffff',
  },
  colors: [props.color1, props.color2],
  labels: [], // sin etiquetas en sectores
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          name: { show: false },
          value: {
            show: true,
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#FF9B39',
            formatter: () => 'KPI 70%',
          },
          total: { show: false }
        }
      }
    }
  },
  dataLabels: {
    enabled: false,
  },
  legend: { show: false },
  grid: { show: false },
});

</script>

<style scoped>
.donut-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
apexchart {
  width: 100%;
  flex: 1 1 auto;
  min-height: 250px;
}

.legend-items {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 16px 0;
  box-sizing: border-box;
  flex-wrap: wrap; /* permite pasar a nueva línea si no hay espacio */
  gap: 12px;        /* separación entre elementos en filas */
}

.legend-item {
  display: flex;
  flex-direction: column; /* apila verticalmente los textos */
  align-items: center;
  gap: 4px; /* espacio entre elementos dentro de cada item */
  min-width: 100px; /* opcional: para evitar que se apilen demasiado pronto */
}

.color-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
}

.label {
  margin: 0;
  color: #ffffff;
  font-size: 14px;
}

.value {
  margin: 0;
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
}

/* Responsive: apilar verticalmente en móvil */
@media (max-width: 480px) {
  .legend-items {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
}
</style>
