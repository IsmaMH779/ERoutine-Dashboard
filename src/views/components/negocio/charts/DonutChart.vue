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
      <span class="color-box not-completed"></span>
      <p class="label">No completado</p>
      <p class="value">{{ notCompleted }}%</p>
    </div>
    <div class="legend-item">
      <span class="color-box completed"></span>
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
  colors: ['#E09915', '#FFB700'],
  labels: [],        // sin etiquetas internas
  title: {
    text: 'Rutina semanal cumplida',
    align: 'center',
    style: { color: '#ffffff' },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '0%',
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => val.toFixed(0) + '%',
    style: { colors: ['#ffffff'] },
  },
  legend: { show: false },
  grid: { show: false },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { height: '300px' },
        title: { style: { fontSize: '14px' } },
      }
    }
  ]
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


.color-box.completed {
  background-color: #E09915;
}

.color-box.not-completed {
  background-color: #FFB700;
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
