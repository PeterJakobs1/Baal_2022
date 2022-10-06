<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  toastController,
} from "@ionic/vue";
import { add, trashOutline } from "ionicons/icons";
import { ref } from "vue";
import { Camera, CameraResultType } from "@capacitor/camera";
import { directus } from "@/services/directus.service";

// Keeps track of the input field for new hashtags
const newHashtagText = ref("");
const isUploadingCampSpot = ref(false);

// Keeps track of all data input from the user towards adding a new camp spot
const newCampSpot = ref({
  title: "",
  description: "",
  hashtags: [],
  image: "",
});

// Add whatever is in the hashtag input field to the camp spot's array of hashtags
const addNewHashtag = () => {
  // Avoid adding empty hashtags
  if (newHashtagText.value) {
    newCampSpot.value.hashtags.push(newHashtagText.value); // LES: Det er ikke farlig hvis du får røde squiggly lines her, det skal vi senere fikse med TypeScript
    newHashtagText.value = "";
  }

  // TODO Logic to avoid duplicate hashtags
};

// Handle data POSTing
const postNewCampSpot = async () => {
  // TODO Logic to post the camp spot to the backend/Directus
  console.log(newCampSpot.value);

  if (!newCampSpot.value.image) {
    alert("Du må laste opp bilde");
    return;
  }

  try {
    isUploadingCampSpot.value = true;
    const response = await fetch(newCampSpot.value.image);
    const imageBlob = await response.blob();

    const formData = new FormData();
    formData.append("file", imageBlob);
    const fileUpload = await directus.files.createOne(formData);

    if (fileUpload) {
      await directus.items("camping_spots").createOne({
        title: newCampSpot.value.title,
        description: newCampSpot.value.description,
        hashtags: newCampSpot.value.hashtags,
        comments: [],
        image: fileUpload.id,
      });

      const successToast = await toastController.create({
        message: "Campingspotten ble lastet opp",
        duration: 2000,
        position: "bottom",
        color: "success",
      });
      await successToast.present();
    }
    isUploadingCampSpot.value = false;
  } catch (error) {
    const errorToast = await toastController.create({
      message: "Campingspotten ble dessverre ikke lastet opp",
      duration: 2000,
      position: "bottom",
      color: "danger",
    });
    await errorToast.present();
    console.log(error);
    isUploadingCampSpot.value = false;
  }
};

const triggerCamera = async () => {
  const photo = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Uri,
  });

  if (photo.webPath) {
    newCampSpot.value.image = photo.webPath;
  }
};

// handle / preview slette bilde
const removeImagePreview = () => {
  newCampSpot.value.image = "";
};
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Legg til ny 🏕-plass</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <!-- Logic for file picking / using camera will be added later -->
        <ion-button @click="triggerCamera" class="image-picker" color="light"
          >Velg fil eller ta bilde 📸</ion-button
        >

        <section v-if="newCampSpot.image">
          <ion-button
            @click="removeImagePreview"
            fill="default"
            class="remove-image-preview"
          >
            <ion-icon
              slot="icon-only"
              :icon="trashOutline"
              color="danger"
            ></ion-icon>
          </ion-button>
          <img :src="newCampSpot.image" />
        </section>

        <ion-item>
          <ion-label class="label-mild" position="floating">Tittel</ion-label>
          <ion-input type="text" v-model="newCampSpot.title"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label class="label-mild" position="floating"
            >Beskrivelse</ion-label
          >
          <ion-textarea
            type="password"
            v-model="newCampSpot.description"
          ></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label class="label-mild" position="floating">Hashtag</ion-label>
          <ion-input type="text" v-model="newHashtagText"></ion-input>

          <ion-button
            slot="end"
            color="dark"
            size="default"
            @click="addNewHashtag"
          >
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-chip
            color="primary"
            v-for="tag in newCampSpot.hashtags"
            :key="tag"
            >{{ tag }}</ion-chip
          >
        </ion-item>

        <ion-button
          @click="postNewCampSpot"
          class="button-add"
          fill="solid"
          color="dark"
          size="default"
        >
          Send inn 🏕
        </ion-button>
      </ion-list>
    </ion-content>
  </ion-page>
</template>



<style scoped>
ion-content {
  --ion-background-color: #f4f4f4;
  display: flex;
}

ion-list {
  display: flex;
  flex-direction: column;
}

.label-mild {
  --color: #8a8a8a !important;
}

.image-picker {
  height: 20vh;
  margin: 10px;
  border: 2px #8a8a8a dashed;
  border-radius: 8px;
  font-size: medium;
}

.remove-image-preview {
  position: absolute;
  right: 0;
}

.button-add {
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>