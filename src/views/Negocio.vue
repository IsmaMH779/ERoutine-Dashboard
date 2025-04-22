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

    <ion-content :fullscreen="true" class="ion-padding">
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
            <div class="box">Columna 1</div>
            </div>
          </ion-col>
          <ion-col size="12" size-lg="6">
            <div class="box">Columna 2</div>
          </ion-col>
        </ion-row>


        <!-- Fila 2: 2 Columnas -->
        <ion-row class="ion-row-2">
          <ion-col size="12" size-lg="12">
            <div class="box">Columna Grande</div>
          </ion-col>
        </ion-row>


        <!-- Fila 3: 2 Columnas -->
        <ion-row class="ion-row-3">
          <ion-col size="12" size-lg="8">
            <div class="box">Columna 1</div>
          </ion-col>
          <ion-col size="12" size-lg="4">
            <div class="box">Columna 2</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

</script>

<style scoped>


ion-row{
  overflow: hidden;
}


ion-col {
  max-height: 100%;
  --ion-grid-column-padding:10px;
}

ion-content {
  --background: #505050;
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

/* El contenido real de cada columna */
.box {
  background: #1E1E1E;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius:5px;
  display: flex;
  justify-content: center;
  align-items: start;
}


/* Aplicar altura total y por filas, solo en pantallas ≥ md */
@media (min-width: 992px) {  
  ion-grid{height: 100%;}
  .ion-row-1{height: 33%; max-height: 33%;}
  .ion-row-2{height: 33%; max-height: 33%;}
  .ion-row-3{height: 33%; max-height: 33%;}
}


</style>
