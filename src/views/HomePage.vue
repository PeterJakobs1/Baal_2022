<script setup lang="ts">
import { directus } from "@/services/directus.service";
import {
  IonContent,
  IonButtons,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  onIonViewDidEnter,
} from "@ionic/vue";

import { ref } from "vue";
const userAccessToken = localStorage.getItem("auth_token");
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
      <ion-card
        v-for="spot in campingSpots"
        :key="spot.id"
        :router-link="'/detail/' + spot.id"
      >
        <img
          :src="`https://ofacetsw.directus.app/assets/${spot.image.id}?access_token=${userAccessToken}`"
        />
        <ion-card-header>
          <ion-card-subtitle>{{ spot.hashtags }}</ion-card-subtitle>
          <ion-card-title>{{ spot.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ spot.description }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
