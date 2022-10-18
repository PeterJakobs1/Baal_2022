<script setup lang="ts">
import { directus } from "@/services/directus.service";
import {
  IonContent,
  IonButtons,
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  onIonViewDidEnter,
} from "@ionic/vue";

import { ref } from "vue";
import CampingSpotCard from "@/components/CampingSpotCard.vue";

const campingSpots = ref([]);

onIonViewDidEnter(async () => {
  const response = await directus.graphql.items(`
    query{
      camping_spots{
        id,
        title,
        description,
        image{
          id
        },
        user_created{
          first_name
        }
      }
    }
  `);
  if (response.status === 200 && response.data) {
    campingSpots.value = [...response.data.camping_spots];
    console.log(campingSpots.value);
  }
});
</script>



<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Baal 🏕</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/new-spot">+</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

 
    <ion-content :fullscreen="true">

      <ion-refresher slot="fixed" @ionRefresh="refreshCampingSpotsView($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <camping-spot-card v-for="spot in campingSpots" :key="spot.id" :spot="spot" />

    </ion-content>
  </ion-page>
</template>


