<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center bg-primary">
        <q-card class="auth-card">
          <q-tabs v-model="tab" class="text-grey-8" align="justify">
            <q-tab name="login" label="Login" />
            <q-tab name="register" label="Register" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="login">
              <q-card-section class="row items-center q-pa-md">
                <q-img
                  src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
                  class="q-mr-md"
                  style="width: 50px"
                />
                <div class="text-h6">Login</div>
              </q-card-section>
              <q-card-section>
                <q-form @submit="onLoginSubmit">
                  <q-input
                    v-model="loginForm.username"
                    label="Username"
                    type="text"
                    :rules="[(val) => !!val || 'Email is required']"
                    class="q-mb-md"
                  />
                  <q-input
                    v-model="loginForm.password"
                    label="Password"
                    type="password"
                    :rules="[(val) => !!val || 'Password is required']"
                    class="q-mb-md"
                  />
                  <div class="q-mt-md">
                    <q-btn type="submit" label="Login" color="primary" />
                  </div>
                </q-form>
              </q-card-section>
            </q-tab-panel>

            <q-tab-panel name="register">
              <q-card-section class="row items-center q-pa-md">
                <q-img
                  src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
                  class="q-mr-md"
                  style="width: 50px"
                />
                <div class="text-h6">Register</div>
              </q-card-section>
              <q-card-section>
                <q-form @submit="onRegisterSubmit">
                  <q-input
                    v-model="registerForm.username"
                    label="Username"
                    :rules="[(val) => !!val || 'Username is required']"
                    class="q-mb-md"
                  />
                  <q-input
                    v-model="registerForm.email"
                    label="Email"
                    type="email"
                    :rules="[(val) => !!val || 'Email is required']"
                    class="q-mb-md"
                  />
                  <q-input
                    v-model="registerForm.password"
                    label="Password"
                    type="password"
                    :rules="[(val) => !!val || 'Password is required']"
                    class="q-mb-md"
                  />
                  <div class="q-mt-md">
                    <q-btn type="submit" label="Register" color="primary" />
                  </div>
                </q-form>
              </q-card-section>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      tab: "login",
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onLoginSubmit() {
      try {
        if (this.loginForm.username && this.loginForm.password) {
          await this.$store.dispatch("login", { ...this.loginForm });
          this.loginForm.username = "";
          this.loginForm.password = "";
          this.$router.replace("/yt-channels");
        }
      } catch (error) {}
    },
    async onRegisterSubmit() {
      try {
        if (
          this.registerForm.username &&
          this.registerForm.email &&
          this.registerForm.password
        ) {
          await this.$store.dispatch("register", { ...this.registerForm });
          this.registerForm.username = "";
          this.registerForm.email = "";
          this.registerForm.password = "";
          this.tab = "login";
        }
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.auth-card {
  width: 400px;
  max-width: 90%;
}
</style>
