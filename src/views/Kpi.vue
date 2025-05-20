<template>
  <ion-page>
    <ion-header class="ion-no-border transparent-header">
      <ion-toolbar class="transparent-toolbar">
        <ion-title class="white-text">Objetivos SMART</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="toggleView" class="white-text">
            <ion-icon :icon="viewMode === 'cards' ? listOutline : gridOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar class="transparent-toolbar">
        <ion-segment v-model="selectedTab" class="custom-segment">
          <ion-segment-button value="business">
            <ion-label>Negocio</ion-label>
          </ion-segment-button>
          <ion-segment-button value="technical">
            <ion-label>Técnicos</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="transparent-content">
      <div class="container">
        <!-- Objetivos de Negocio -->
        <div v-if="selectedTab === 'business'">
          <h2 class="section-title white-text">Objetivos SMART de Negocio</h2>
          
          <div :class="{'objectives-grid': viewMode === 'cards', 'objectives-list': viewMode === 'list'}">
            <!-- Objetivo 1 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="trendingUpOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Incrementar la base de usuarios activos mensuales en un 66%</h3>
                </div>
                
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">Aumentar los usuarios activos de 3000 a 5000.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">Seguimiento del Número de usuarios activos mensuales (MAU).</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Basado en un crecimiento histórico medio del 20% mensual.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Contribuye directamente a la escalabilidad y monetización de la app.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">En el próximo trimestre (1 de junio – 31 de agosto de 2025).</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: MAU</div>
              </div>
            </div>
            
            <!-- Objetivo 2 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="peopleOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Lograr una tasa de retención a 4 meses ≥ 40%</h3>
                </div>
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">Pasar de 32% a 40% de la cohorte de febrero de 2025.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">Usuarios activos a 4 meses sobre el total de la cohorte.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Con la nueva estrategia de onboarding y notificaciones push.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Mejora la fidelización y reduce el churn.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">Evaluar al 30 de junio de 2025 la cohorte de febrero.</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: % de retención a 4 meses</div>
              </div>
            </div>
            
            <!-- Objetivo 3 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="calendarOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Alcanzar que el 70% de los usuarios cumplan la rutina semanal al menos 8 de 12 semanas</h3>
                </div>
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">Que 7 de cada 10 usuarios finalicen al menos 8 rutinas de 12.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">% de usuarios con rutina cumplida (8+ semanas).</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Con la implementación de recordatorios semanales y recompensas.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Refuerza el hábito y mejora el engagement.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">Medir a cierre de la campaña el 31 de julio de 2025.</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: % de cumplimiento de rutina semanal</div>
              </div>
            </div>
            
            <!-- Objetivo 4 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="diamondOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Incrementar en un 25% el uso de la función "Progreso"</h3>
                </div>
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">Subir del 20% a 25% el uso de progreso.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">% de usuarios que usan la función.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Con tutoriales in-app y demostraciones guiadas.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Aumenta ele valor de esta funcion para los usuarios.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">Analizar al 30 de junio de 2025.</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: % aumentar el uso de la funcion "Progreso""</div>
              </div>
            </div>
            
            <!-- Objetivo 5 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="imageOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Lograr que al menos el 60% de los registrados suban imagenes de los ejercicios</h3>
                </div>
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">Del total de  usuarios, el 60% subir imágenes.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">Número y % de usuarios con subida de imágenes.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Con onboarding específico y botón destacado "Sube tu imagenes".</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Facilita feedback visual y asiste en el entrenamiento.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">Medir al 30 de junio.</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: % de usuarios que aprovechan esta funcionalidad</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Objetivos Técnicos -->
        <div v-if="selectedTab === 'technical'">
          <h2 class="section-title white-text">Objetivos SMART Técnicos</h2>
          
          <div :class="{'objectives-grid': viewMode === 'cards', 'objectives-list': viewMode === 'list'}">
            <!-- Objetivo 1 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="alertCircleOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Reducir los errores HTTP 500 y 400 a menos de 10 al día</h3>
                </div>
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">De un promedio de 8 errores diarios a ≤ 40.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">Conteo diario de errores 500.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Con parches de estabilidad y revisión de logs.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Mejora la fiabilidad y experiencia de usuario.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">Para el 30 de junio de 2025.</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: Nº diario de errores 500 y 400</div>
              </div>
            </div>
            
            <!-- Objetivo 2 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="hardwareChipOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Mantener carga de servidor por debajo del 70% CPU en horario pico</h3>
                </div>
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">Limitar uso CPU máximo al 70% entre 18:00–20:00 h.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">% de CPU recogido cada minuto.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Con auto-scaling y optimización de consultas.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Evita degradación en horas críticas.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">Medido permanentemente, objetivo continuo a partir del 1 de junio.</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: % CPU en tiempo real</div>
              </div>
            </div>
            
            <!-- Objetivo 3 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="warningOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Reducir las incidencias críticas detectadas a menos de 2 por semana</h3>
                </div>
                
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">Bajar de un promedio de no mas del 20% incidencias por api.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">Número semanal de incidencias críticas.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Con revisión proactiva de alertas y testing automático.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Asegura continuidad y disponibilidad del servicio.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">Evaluación continua desde la semana del 1 de junio.</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: Incidencias críticas/semana</div>
              </div>
            </div>

            
            <!-- Objetivo 4 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="speedometerOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Lograr tiempo medio de respuesta backend ≤ 200 ms en 95% de peticiones</h3>
                </div>
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">Reducir latencia media de 250 ms a ≤ 200 ms en el 95% de requests.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">Tiempo medio de respuesta recogido por metodo de api rest.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Con optimización de consultas y caching distribuido.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Mejora la experiencia y escalabilidad.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">Para el 30 de julio de 2025.</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: Latencia media (ms) al 95 percentil</div>
              </div>
            </div>
            <!-- Objetivo 5 -->
            <div class="objective-card glass-card business">
              <div class="card-header">
                <div class="title-container">
                  <ion-icon :icon="speedometerOutline" class="objective-icon"></ion-icon>
                  <h3 class="white-text">Lograr una relacion carga/horas pico estables</h3>
                </div>
              </div>
              
              <div class="smart-criteria">
                <div class="criteria">
                  <span class="criteria-label">S</span>
                  <p class="white-text">Adaptar el servidor a las horas pico.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">M</span>
                  <p class="white-text">Carga del servidor en tiempo real.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">A</span>
                  <p class="white-text">Tener listo el hardware necesario para satisfacer la demanda.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">R</span>
                  <p class="white-text">Mejorar y evitar errores de servidor.</p>
                </div>
                <div class="criteria">
                  <span class="criteria-label">T</span>
                  <p class="white-text">En progreso</p>
                </div>
              </div>
              
              <div class="sources">
                <div class="kpi-badge">KPI: Carga del servidor regulada</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/vue';
import {
  trendingUpOutline,
  peopleOutline,
  calendarOutline,
  diamondOutline,
  imageOutline,
  alertCircleOutline,
  hardwareChipOutline,
  timeOutline,
  warningOutline,
  speedometerOutline,
  gridOutline,
  listOutline
} from 'ionicons/icons';

const selectedTab = ref('business');
const viewMode = ref('cards');

const toggleView = () => {
  viewMode.value = viewMode.value === 'cards' ? 'list' : 'cards';
};
</script>

<style scoped>
.transparent-header {
  --background: transparent !important;
  background: transparent !important;
}

.transparent-toolbar {
  --background: transparent !important;
  background: transparent !important;
}

.transparent-content {
  --background: transparent !important;
  background: transparent !important;
}

.white-text {
  color: #FFFFFF !important;
}

.custom-segment {
  --background: transparent;
}

ion-segment-button {
  --color: #FFFFFF;
  --color-checked: #FFFFFF;
  --background-checked: rgba(224, 153, 21, 0.5);
}

.container {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.objectives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.objectives-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.objective-card {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card {
  background: rgba(62, 62, 62, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(121, 121, 121, 0.3);
}

.objective-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.objective-card.business {
  border-top: 5px solid #FBBC05;
}

.card-header {
  padding: 16px;
  background: rgba(80, 80, 80, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title-container {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 1;
}

.objective-icon {
  font-size: 24px;
  color: #FBBC05;
  margin-top: 2px;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  flex: 1;
}

.kpi-badge {
  background-color: rgba(251, 188, 5, 0.3);
  color: #FFFFFF;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  margin-left: 10px;
  border: 1px solid rgba(251, 188, 5, 0.5);
}

.smart-criteria {
  padding: 16px;
}

.criteria {
  display: flex;
  margin-bottom: 12px;
  align-items: flex-start;
}

.criteria:last-child {
  margin-bottom: 0;
}

.criteria-label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #FBBC05;
  color: #333;
  font-weight: bold;
  font-size: 14px;
  margin-right: 12px;
  flex-shrink: 0;
}

.criteria p {
  margin: 0;
  font-size: 14px;
  flex: 1;
}

.sources {
  padding: 12px 16px;
  background: rgba(80, 80, 80, 0.3);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px solid rgba(121, 121, 121, 0.5);
}

.source {
  background-color: rgba(251, 188, 5, 0.2);
  color: #FFFFFF;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid rgba(251, 188, 5, 0.5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .objectives-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
  }
  
  .kpi-badge {
    margin-left: 0;
    margin-top: 8px;
  }
}
</style>
