
<script setup lang="ts">
import { IonContent, IonButtons, IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref } from 'vue';

const campingSpots = ref([
  {
    id: 1,
      title: "Fin plass ved Ulsrudvann",
      description:"fant denne da jeg gikk kveldstur rundt vannet",
      hashtags:"#oslo #østmarka #nærtur",
      imgUrl: "https://images.squarespace-cdn.com/content/v1/5283c6b4e4b02d47ac471135/1535888882553-S2T8J0R5TGRA3AYMO67A/Telttur-1500.jpg"
  }
]);

const addCampingSpot = () => {
  const newCampingSpot = {
    id: 2,
          title: "Fin plass på føylen",
          description:"Ble tipset av en god kompis!",
          hashtags:"#bergen #fløyen #7fjell",
          imgUrl: "https://cdn.dnt.org/prod/sherpa/fotoweb/9d5def8a-4c6f-4021-96ba-6c2bb4d38588.jpg"
  }

  campingSpots.value.unshift(newCampingSpot);
}

</script>
  

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Baal 🏕</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="addCampingSpot">+</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-card v-for="spot in campingSpots" :key="spot.id">
        <img :src="spot.imgUrl" />
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

