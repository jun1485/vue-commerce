# 빌드 스테이지
FROM node:20-alpine AS build-stage

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 pnpm-lock.yaml 복사 (캐시 최적화)
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# TypeScript 타입 체크 및 빌드
RUN pnpm run build

# 프로덕션 스테이지
FROM node:20-alpine AS production-stage

# serve 패키지 전역 설치 (npm 사용)
RUN npm install -g serve

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일 복사
COPY --from=build-stage /app/dist ./dist

# 3000포트 노출
EXPOSE 3000

# serve로 정적 파일 서빙
CMD ["serve", "-s", "dist", "-l", "3000"] 