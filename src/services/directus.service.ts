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

  async register(firstName: string, email: string, password: string): Promise<boolean> {
    const createUserResult = await directus.users.createOne({
      first_name: firstName,
      email,
      password,
      role:"73a8097e-dc43-44df-a132-e6a1bd5799d4"
    })

    return !!createUserResult?.email;

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
