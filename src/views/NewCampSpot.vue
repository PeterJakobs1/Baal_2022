
<script setup lang="ts">
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

import { useRouter } from "vue-router";

const router = useRouter();

const goback = async () => {
  router.replace("/home");
};
</script>  




<template>
  <ion-page>
    <ion-content>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Ny teltplass</ion-title>
          <ion-buttons slot="start">
            <ion-button @click="goback"> Gå tilbake </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-item>
        <ion-label>Tittel</ion-label>
        <ion-input formControlName="title"></ion-input>
      </ion-item>

      <ion-item>
        <ion-textarea>Beskrivelse</ion-textarea>
        <ion-input formControlName="description"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input type="file">Bilde</ion-input>
      </ion-item>

      <ion-item>
        <ion-input type="tags">Bilde</ion-input>
      </ion-item>
    </ion-content>
  </ion-page>
</template>