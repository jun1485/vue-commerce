# GitHub 웹훅과 Jenkins 연동 설정 가이드

## 📋 개요

이 가이드는 GitHub 저장소(`https://github.com/jun1485/vue-commerce.git`)와 로컬 Jenkins 서버(`http://localhost:8081`) 간의 웹훅 연동을 설정하는 방법을 안내합니다.

## 🚨 중요 사항

로컬 Jenkins 서버는 GitHub에서 직접 접근할 수 없으므로, 외부 접근을 위한 터널링 솔루션이 필요합니다.

## 🛠️ 방법 1: ngrok을 사용한 터널링 (권장)

### 1단계: ngrok 설치 및 설정

```powershell
# ngrok 다운로드 (Windows)
# https://ngrok.com/download 에서 다운로드 후 PATH에 추가

# ngrok 계정 등록 후 인증 토큰 설정
ngrok config add-authtoken YOUR_AUTHTOKEN

# Jenkins 포트(8081)를 외부에 노출
ngrok http 8081
```

### 2단계: ngrok URL 확인

ngrok 실행 후 다음과 같은 URL을 확인합니다:

```
Forwarding    https://abc123.ngrok.io -> http://localhost:8081
```

### 3단계: GitHub 웹훅 설정

1. **GitHub 저장소 접속**

   - `https://github.com/jun1485/vue-commerce` 접속
   - `Settings` 탭 클릭

2. **웹훅 추가**

   - 좌측 메뉴에서 `Webhooks` 클릭
   - `Add webhook` 버튼 클릭

3. **웹훅 설정**

   ```
   Payload URL: https://abc123.ngrok.io/github-webhook/
   Content type: application/json
   Secret: (선택사항, 보안을 위해 설정 권장)

   Which events would you like to trigger this webhook?
   ☑️ Just the push event

   ☑️ Active
   ```

4. **웹훅 저장**
   - `Add webhook` 버튼 클릭

## 🛠️ 방법 2: GitHub Actions 연동 (대안)

로컬 Jenkins 대신 GitHub Actions를 사용하는 방법입니다.

### GitHub Actions 워크플로우 생성

`.github/workflows/ci-cd.yml` 파일을 생성:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout
        uses: actions/checkout@v4

      - name: 📦 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: 🔧 Enable pnpm
        run: corepack enable

      - name: 📦 Install dependencies
        run: pnpm install --frozen-lockfile

      - name: 🔍 Type check
        run: pnpm run type-check

      - name: 🧪 Run tests
        run: pnpm run test || echo "No tests configured"

      - name: 🏗️ Build
        run: pnpm run build

      - name: 🐳 Build Docker image
        run: |
          docker build -t vue-commerce-app:${{ github.sha }} .
          docker tag vue-commerce-app:${{ github.sha }} vue-commerce-app:latest
```

## 🔧 Jenkins 설정 (방법 1 사용 시)

### 1단계: Jenkins 플러그인 설치

Jenkins 관리 페이지(`http://localhost:8081`)에서 다음 플러그인을 설치:

1. **GitHub Integration Plugin**
2. **GitHub Branch Source Plugin**
3. **NodeJS Plugin**
4. **Docker Pipeline Plugin**

### 2단계: GitHub 서버 설정

1. **Jenkins 관리 > Configure System**
2. **GitHub** 섹션에서:
   ```
   Name: GitHub
   API URL: https://api.github.com
   Credentials: (GitHub Personal Access Token 추가)
   ```

### 3단계: GitHub Personal Access Token 생성

1. GitHub > Settings > Developer settings > Personal access tokens
2. **Generate new token (classic)** 클릭
3. 권한 설정:
   ```
   ☑️ repo (전체)
   ☑️ admin:repo_hook
   ☑️ admin:org_hook
   ```

### 4단계: Jenkins Credentials 추가

1. **Jenkins 관리 > Manage Credentials**
2. **Global credentials** > **Add Credentials**
3. 설정:
   ```
   Kind: Secret text
   Secret: [GitHub Personal Access Token]
   ID: github-token
   Description: GitHub Personal Access Token
   ```

### 5단계: Pipeline Job 생성

1. **New Item** > **Pipeline** 선택
2. **Pipeline** 섹션에서:

   ```
   Definition: Pipeline script from SCM
   SCM: Git
   Repository URL: https://github.com/jun1485/vue-commerce.git
   Credentials: github-token
   Branch Specifier: */main
   Script Path: Jenkinsfile
   ```

3. **Build Triggers** 섹션에서:
   ```
   ☑️ GitHub hook trigger for GITScm polling
   ```

## 🧪 테스트 방법

### 1단계: ngrok 설정 및 실행

```powershell
# ngrok 설정 스크립트 실행
.\ngrok-setup.ps1
```

**중요**: ngrok 실행 후 터널 URL을 확인하세요 (예: `https://abc123.ngrok.io`)

### 2단계: 웹훅 연결 테스트

```powershell
# 자동화된 웹훅 테스트 스크립트 실행
.\test-webhook.ps1
```

### 2단계: Jenkins 빌드 확인

1. Jenkins 대시보드에서 자동으로 빌드가 시작되는지 확인
2. 빌드 로그에서 각 단계별 실행 상태 확인
3. 빌드 완료 후 배포 상태 확인

### 3단계: GitHub 웹훅 상태 확인

1. GitHub 저장소 > Settings > Webhooks
2. 웹훅 항목 클릭
3. **Recent Deliveries** 탭에서 전송 상태 확인:
   - ✅ 200 OK: 성공
   - ❌ 기타: 실패 (로그 확인 필요)

## 🔍 문제 해결

### ngrok 관련 문제

```powershell
# ngrok 프로세스 확인
Get-Process ngrok

# ngrok 재시작
ngrok http 8081
```

### Jenkins 연결 문제

```powershell
# Jenkins 컨테이너 상태 확인
docker ps | findstr jenkins

# Jenkins 로그 확인
docker logs vue-commerce-jenkins-dev

# Jenkins 재시작
docker restart vue-commerce-jenkins-dev
```

### 웹훅 전송 실패

1. **ngrok URL 변경**: ngrok 재시작 시 URL이 변경되므로 GitHub 웹훅 URL 업데이트 필요
2. **방화벽 설정**: Windows 방화벽에서 ngrok 허용 확인
3. **Jenkins 플러그인**: GitHub Integration 플러그인 설치 및 활성화 확인

## 📊 성공 기준

- ✅ GitHub에서 코드 푸시 시 Jenkins 빌드 자동 트리거
- ✅ 웹훅 전송 상태 200 OK
- ✅ Jenkins 파이프라인 8단계 모두 성공
- ✅ 배포된 애플리케이션 정상 접근 (`http://localhost:3000`)

## 🚀 다음 단계

웹훅 연동 완료 후:

1. **파이프라인 Job 생성 및 테스트**
2. **통합 테스트 및 검증**
3. **클라우드 배포 환경 구성**
4. **모니터링 및 알림 시스템 설정**

---

💡 **팁**: 개발 환경에서는 ngrok을 사용하고, 운영 환경에서는 실제 서버나 클라우드 서비스를 사용하는 것을 권장합니다.
