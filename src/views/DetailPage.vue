<script setup lang="ts">
import { IonModal, IonSpinner, IonTextarea, IonBackButton, IonButton, IonAvatar, IonText, IonIcon, IonItem, IonListHeader, IonLabel, IonList, IonCardHeader, IonCardSubtitle, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter } from "@ionic/vue";
import { ref } from 'vue';
import { chatboxOutline } from 'ionicons/icons';
import { useRoute } from 'vue-router';
import { directus } from "@/services/directus.service";
import CampingSpotImage from "@/components/CampingSpotImage.vue";

/* Using the route object, we can get data for the user's current route */
const route = useRoute();

/* Retrieve the id parameter from the current route's query string (/detail/:id) */
const { id } = route.params;

/* State */
const isModalOpen = ref(false);
const newCommentText = ref('');
const isLoadingCampSpot = ref(true);

/* "Dummy data" for displaying in the UI until we connect the app to an API */
const campingSpot = ref(null);

onIonViewDidEnter(() => {
  fetchCampingSpot();
})

/* Fetch data for the specified camping spot from Directus by ID. Cancel the loading spinner when the data has been fetched successfully. */
const fetchCampingSpot = async () => {
  const response = await directus.graphql.items(`
    query {
      camp_spots_by_id(id: ${id}) {
        id,
        title,
        description,
        hashtags,
        image {
          id
        },
        user_created {
          first_name
        }
      }
    }
  `);

  if (response.status === 200 && response.data) {
    campingSpot.value = response.data.camp_spots_by_id;
    isLoadingCampSpot.value = false;
  }
}

const addNewComment = () => {
  /* campingSpot.value.comments.unshift({
    id: 2,
    username: "N/A",
    text: newCommentText.value
  });

  isModalOpen.value = false;
  newCommentText.value = ''; */
}

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title v-if="isLoadingCampSpot">
          <ion-spinner></ion-spinner>
        </ion-title>
        <ion-title v-if="campingSpot">{{campingSpot.title}} ({{id}})</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="isModalOpen = true">
            <ion-icon :icon="chatboxOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="campingSpot && !isLoadingCampSpot">

      <!-- Hero image section -->
      <camping-spot-image :image-id="campingSpot.image.id" />

      <!-- Hashtag section -->
      <ion-chip v-for="hashtag in campingSpot.hashtags" :key="hashtag" color="tertiary">#{{hashtag}}</ion-chip>

      <!-- Camping spot info section -->
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Turbeskrivelse</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{campingSpot.description}}
        </ion-card-content>
      </ion-card>

      <!-- Comment section -->
      <ion-card>
        <ion-list>
          <ion-list-header>
            <ion-label>
              Kommentarfelt
              <ion-icon :icon="chatboxOutline"></ion-icon>
            </ion-label>
          </ion-list-header>
          <ion-item v-for="comment in campingSpot.comments" :key="comment.id" lines="none">
            <ion-avatar slot="start">
              <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==">
            </ion-avatar>
            <ion-label class="ion-text-wrap">
              <ion-text>
                <b>{{comment.username}} </b>
              </ion-text>
              <ion-text>
                <p>{{comment.text}}</p>
              </ion-text>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card>

      <ion-modal :is-open="isModalOpen" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]"
        @did-dismiss="isModalOpen = false">
        <ion-content>
          <ion-item lines="none">
            <ion-label position="floating">Ny kommentar</ion-label>
            <ion-textarea v-model="newCommentText"></ion-textarea>
            <ion-button @click="addNewComment">Legg til kommentar</ion-button>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>