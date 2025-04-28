<template>
  <ion-app>
    <div id="background-container">
      <!-- Fondo de partículas -->
      <div id="tsparticles"></div>
    </div>

    <!-- Split Pane para menú lateral -->
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay" width="300px">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>ERoutine</ion-list-header>
            <ion-note>Dashboard</ion-note>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>

      <!-- Router Outlet para las diferentes páginas -->
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>


<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import { addIcons } from 'ionicons';
import { mailSharp, mailOutline, paperPlaneSharp, paperPlaneOutline } from 'ionicons/icons';

import { ref, onMounted } from 'vue';
import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

// Registrar los iconos
addIcons({
  'mail-sharp': mailSharp,
  'mail-outline': mailOutline,
  'paper-plane-sharp': paperPlaneSharp,
  'paper-plane-outline': paperPlaneOutline
});

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Negocio',
    url: '/app/negocio',
    iosIcon: 'mail-outline',
    mdIcon: 'mail-sharp',
  },
  {
    title: 'Tecnico',
    url: '/app/tecnico',
    iosIcon: 'paper-plane-outline',
    mdIcon: 'paper-plane-sharp',
  },
  {
    title: 'KPIs',
    url: '/app/kpi',
    iosIcon: 'paper-plane-outline',
    mdIcon: 'paper-plane-sharp',
  }
];

// Función para cargar las partículas
const loadParticles = async () => {
  try {
    await loadSlim(tsParticles);

    await tsParticles.load("tsparticles", {
      background: {
        color: {
          value: "#505050",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
      },
      particles: {
        color: {
          value: "#F2A920",
        },
        links: {
          enable: true,
          distance: 150,
          color: "#F2A920",
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.8,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 4 },
        },
      },
      detectRetina: true,
    });
  } catch (error) {
    console.error("Error al cargar partículas:", error);
  }
};

onMounted(() => {
  loadParticles();
});
</script>

<style scoped>
/* Partículas como fondo */
#background-container {
  position: fixed; /* Ojo: fixed, no absolute */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Debajo del contenido */
  pointer-events: none; /* Muy importante: para que no bloquee clicks */
}

#tsparticles {
  width: 100%;
  height: 100%;
}


ion-menu ion-content {
  --background: #F2A920;
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid white;
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;
  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: #E09915;
}

ion-menu.md ion-item.selected ion-icon {
  color: white;
}

ion-menu.md ion-item ion-icon {
  color: white;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

ion-item {
  --background: #F2A920;
}

ion-menu {
  --width: 300px;
  max-width: 300px;
}

ion-menu ion-list {
  max-width: 300px;
  background: #F2A920;
}
</style>