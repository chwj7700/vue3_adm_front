import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#152259", // 딥블루
          secondary: "#374bae", // 밝은 블루
          accent: "#181A20", // 검은색
          error: "#FF5252", // 레드
          info: "#2196F3", // 인포 블루
          success: "#4CAF50", // 그린
          warning: "#FFC107", // 옐로우
          background: "#FFFFFF", // 전체 배경
          surface: "#F8FAFC", // 카드/섹션 배경
          border: "#babfc7",
        },
      },
      dark: {
        colors: {
          primary: "#90caf9",
          secondary: "#4F8CFF",
          accent: "#23272F",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          background: "#181A20",
          surface: "#23272F",
          border: "#babfc7",
        },
      },
    },
  },
});

export default vuetify;
