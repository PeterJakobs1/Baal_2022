import { Directus } from "@directus/sdk";

export const directus = new Directus("https://ofacetsw.directus.app", {
  auth: {
    mode: "json",
  },
});

export const authService = {
  async login(email: string, password: string) {
    return await directus.auth.login({ email, password });
  },
  async logout() {
    return await directus.auth.logout();
  },
  
  // hente info om innlogget bruker
  async currentUser(){
    return await directus.users.me.read({
        fields: ['email', 'first_name', ]
    });
  },
};
