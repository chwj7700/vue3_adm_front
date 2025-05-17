<template>
  <v-container fluid class="login-container pa-0">
    <v-row no-gutters class="fill-height">
      <!-- 오른쪽 로그인 폼 섹션 -->
      <v-col cols="12" md="12" class="login-form-section">
        <v-container class="fill-height">
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6" lg="5">
              <!-- 로고 -->
              <div class="text-center mb-8">
                <v-icon size="48" color="primary" class="mb-4">mdi-view-dashboard</v-icon>
                <h1 class="text-h4 font-weight-bold">Admin</h1>
              </div>

              <!-- 로그인 폼 -->
              <v-card class="login-card pa-6" elevation="2">
                <h2 class="text-h5 font-weight-bold mb-6">로그인</h2>

                <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
                  <v-text-field
                    v-model="userId"
                    :rules="userIdRules"
                    label="아이디"
                    prepend-inner-icon="mdi-account-outline"
                    outlined
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="비밀번호"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    outlined
                    required
                  ></v-text-field>

                  <div class="d-flex justify-space-between align-center mb-6">
                    <v-checkbox v-model="rememberMe" label="아이디 저장" color="primary" hide-details></v-checkbox>
                    <v-btn text color="primary" class="text-none">비밀번호 찾기</v-btn>
                  </div>

                  <v-btn block color="primary" size="large" type="submit" :loading="loading" :disabled="!valid"> 로그인 </v-btn>
                </v-form>
              </v-card>

              <!-- 푸터 -->
              <div class="text-center mt-6">
                <span class="text-caption text-grey">© All rights reserved</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      valid: false,
      userId: "",
      password: "",
      showPassword: false,
      rememberMe: false,
      loading: false,
      userIdRules: [(v) => !!v || "아이디를 입력해주세요", (v) => v.length >= 4 || "아이디는 4자 이상이어야 합니다"],
      passwordRules: [(v) => !!v || "비밀번호를 입력해주세요", (v) => v.length >= 8 || "비밀번호는 8자 이상이어야 합니다"],
    };
  },
  methods: {
    async handleLogin() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      try {
        // TODO: 로그인 API 호출 구현
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 딜레이
        this.$router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-image {
  background-image: url("@/assets/login-bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}

.login-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(88, 103, 221, 0.9), rgba(55, 75, 174, 0.9));
}

.login-form-section {
  background-color: #ffffff;
}

.login-card {
  border-radius: 16px;
}

:deep(.v-text-field--outlined) {
  border-radius: 8px;
}

:deep(.v-btn) {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
