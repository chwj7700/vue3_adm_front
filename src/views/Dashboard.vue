<template>
  <v-container fluid class="pa-6">
    <!-- 헤더 섹션 -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">진행 현황</h1>
        <p class="text-subtitle-1 text-grey">전체 프로젝트 진행 현황입니다.</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-refresh" @click="refreshData"> 새로고침 </v-btn>
    </div>

    <!-- 통계 카드 섹션 -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card">
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-grey text-subtitle-1 mb-2">전체 프로젝트</div>
                <div class="text-h4 font-weight-bold">125</div>
              </div>
              <v-icon size="40" color="primary" class="stat-icon">mdi-folder-multiple</v-icon>
            </div>
            <v-progress-linear model-value="100" color="primary" height="4" class="mt-2"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card">
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-grey text-subtitle-1 mb-2">진행중</div>
                <div class="text-h4 font-weight-bold">42</div>
              </div>
              <v-icon size="40" color="warning" class="stat-icon">mdi-progress-clock</v-icon>
            </div>
            <v-progress-linear model-value="42" color="warning" height="4" class="mt-2"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card">
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-grey text-subtitle-1 mb-2">완료</div>
                <div class="text-h4 font-weight-bold">72</div>
              </div>
              <v-icon size="40" color="success" class="stat-icon">mdi-check-circle</v-icon>
            </div>
            <v-progress-linear model-value="72" color="success" height="4" class="mt-2"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card">
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="text-grey text-subtitle-1 mb-2">지연</div>
                <div class="text-h4 font-weight-bold">11</div>
              </div>
              <v-icon size="40" color="error" class="stat-icon">mdi-alert-circle</v-icon>
            </div>
            <v-progress-linear model-value="11" color="error" height="4" class="mt-2"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 프로젝트 진행률 차트 -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold pa-6"> 프로젝트 진행률 </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="project in projects" :key="project.id">
                <template v-slot:prepend>
                  <v-icon :color="project.color">{{ project.icon }}</v-icon>
                </template>
                <v-list-item-title class="font-weight-medium mb-1">
                  {{ project.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-progress-linear :model-value="project.progress" :color="project.color" height="8" rounded>
                    <template v-slot:default="{ value }">
                      <span class="progress-text">{{ Math.ceil(value) }}%</span>
                    </template>
                  </v-progress-linear>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold pa-6"> 최근 활동 </v-card-title>
          <v-card-text class="pa-0">
            <v-timeline density="compact" align="start">
              <v-timeline-item
                v-for="activity in activities"
                :key="activity.id"
                :dot-color="activity.color"
                :icon="activity.icon"
                size="small"
              >
                <div class="mb-4">
                  <div class="text-body-2 font-weight-medium">{{ activity.title }}</div>
                  <div class="text-caption text-grey">{{ activity.time }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Progress",
  data() {
    return {
      projects: [
        {
          id: 1,
          name: "모바일 앱 개발",
          progress: 85,
          color: "primary",
          icon: "mdi-cellphone",
        },
        {
          id: 2,
          name: "웹사이트 리뉴얼",
          progress: 65,
          color: "warning",
          icon: "mdi-web",
        },
        {
          id: 3,
          name: "서버 마이그레이션",
          progress: 45,
          color: "error",
          icon: "mdi-server",
        },
        {
          id: 4,
          name: "UI/UX 개선",
          progress: 90,
          color: "success",
          icon: "mdi-palette",
        },
      ],
      activities: [
        {
          id: 1,
          title: "모바일 앱 v1.2.0 배포",
          time: "1시간 전",
          color: "success",
          icon: "mdi-rocket-launch",
        },
        {
          id: 2,
          title: "서버 점검 완료",
          time: "3시간 전",
          color: "info",
          icon: "mdi-server-network",
        },
        {
          id: 3,
          title: "디자인 시스템 업데이트",
          time: "5시간 전",
          color: "warning",
          icon: "mdi-palette",
        },
        {
          id: 4,
          title: "버그 수정",
          time: "어제",
          color: "error",
          icon: "mdi-bug",
        },
      ],
    };
  },
  methods: {
    refreshData() {
      // TODO: 데이터 새로고침 로직 구현
      console.log("Refreshing data...");
    },
  },
};
</script>

<style scoped>
.stat-card {
  position: relative;
  overflow: hidden;
}

.stat-icon {
  opacity: 0.8;
}

.progress-text {
  font-size: 12px;
  font-weight: 600;
  color: white;
}

:deep(.v-timeline-item__body) {
  padding: 12px 0;
}

:deep(.v-card-text) {
  padding-bottom: 16px;
}
</style>
