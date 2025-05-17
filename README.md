# Digital Admin 대시보드

## 프로젝트 소개

이 프로젝트는 Vue 3와 Vite를 기반으로 한 관리자 대시보드 애플리케이션입니다. Vue의 Composition API와 `<script setup>` 문법을 활용하여 개발되었습니다.

## 기술 스택

- **프론트엔드 프레임워크**: Vue 3
- **빌드 도구**: Vite 6
- **UI 라이브러리**: Vuetify 3
- **상태 관리**: Pinia 3
- **라우팅**: Vue Router 4
- **HTTP 클라이언트**: Axios
- **데이터 그리드**: AG Grid
- **아이콘**: Material Design Icons

## 시작하기

### 필수 조건

- Node.js 최신 LTS 버전

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 모드 실행
npm run dev
```

### 빌드

```bash
# 프로덕션 빌드
npm run build
```

### 미리보기

```bash
# 빌드된 애플리케이션 미리보기
npm run preview
```

## 프로젝트 구조

- `src/components`: 재사용 가능한 컴포넌트
- `src/views`: 라우트별 페이지 컴포넌트
- `src/router`: 라우팅 설정
- `src/stores`: Pinia 상태 관리 스토어
- `src/plugins`: 플러그인 설정 (Vuetify 등)
- `src/assets`: 이미지, 폰트 등의 정적 리소스
- `src/styles`: 전역 스타일 정의

## IDE 지원

VSCode에서 Vue 개발을 위한 확장 프로그램 설치를 권장합니다. 자세한 내용은 [Vue 공식 문서의 도구 가이드](https://vuejs.org/guide/scaling-up/tooling.html#ide-support)를 참조하세요.
