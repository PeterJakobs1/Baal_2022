Lag en ny funksjon i HomePage.vue, f.eks. kalt addCampingSpot()

I addCampingSpot()-funksjonen, deklarer et nytt JS-objekt kalt f.eks. newCampingSpot som inneholder det nye innleggets data, dvs. id, title, description, hashtags, imageURL

Bruk f.eks. .unshift()-metoden på campingSpots-arrayet for å legge til det nye objektet først i listen. Bruk eventuelt spread-operatoren til å gjøre det samme. Bruker du .push() vil objektet legge seg inn sist i listen.

Sørg for at knappen øverst i høyre hjørne trigger addCampingSpot()-funksjonen ved klikk: @click="addCampingSpot"