# 🚀 Jenkins 웹 UI 초기 설정 가이드

## 📋 개요

이 가이드는 Vue Commerce 프로젝트의 Jenkins CI/CD 파이프라인 설정을 위한 단계별 가이드입니다.

## 🔧 1단계: Jenkins 웹 UI 접속

### 접속 정보

- **URL**: http://localhost:8081
- **컨테이너**: vue-commerce-jenkins-dev
- **상태**: ✅ 실행 중

### 접속 확인

```bash
# Jenkins 컨테이너 상태 확인
docker ps | Select-String jenkins

# Jenkins 응답 확인
curl -I http://localhost:8081
```

## 🔑 2단계: 초기 설정

### 2.1 초기 접속

1. 브라우저에서 http://localhost:8081 접속
2. Jenkins 대시보드가 표시되면 성공

> **참고**: 현재 설정에서는 `JAVA_OPTS=-Djenkins.install.runSetupWizard=false`로 인해 초기 설정 마법사가 비활성화되어 있습니다.

### 2.2 관리자 계정 설정

1. **Manage Jenkins** > **Manage Users** 접속
2. **Create User** 클릭
3. 관리자 계정 정보 입력:
   - Username: `admin`
   - Password: `admin123!` (또는 원하는 비밀번호)
   - Full name: `Jenkins Administrator`
   - E-mail: `admin@vue-commerce.local`
4. **Create User** 클릭

## 🔌 3단계: 필수 플러그인 설치

### 3.1 플러그인 관리 접속

1. **Manage Jenkins** > **Manage Plugins** 클릭
2. **Available** 탭 선택

### 3.2 필수 플러그인 목록

다음 플러그인들을 검색하여 설치하세요:

#### GitHub 연동 플러그인

- [ ] **GitHub Integration Plugin**
- [ ] **GitHub Branch Source Plugin**
- [ ] **GitHub API Plugin**

#### Node.js 개발 플러그인

- [ ] **NodeJS Plugin**
- [ ] **Pipeline: Stage View Plugin**

#### Docker 플러그인

- [ ] **Docker Plugin**
- [ ] **Docker Pipeline Plugin**

#### 추가 유용한 플러그인

- [ ] **Blue Ocean** (모던 UI)
- [ ] **Pipeline: Multibranch**
- [ ] **Timestamper** (로그 타임스탬프)
- [ ] **Build Timeout** (빌드 타임아웃)

### 3.3 플러그인 설치 과정

1. 각 플러그인 체크박스 선택
2. **Install without restart** 클릭
3. 설치 완료까지 대기
4. **Restart Jenkins when installation is complete** 체크 (권장)

## ⚙️ 4단계: 시스템 설정

### 4.1 Node.js 도구 설정

1. **Manage Jenkins** > **Global Tool Configuration** 접속
2. **NodeJS** 섹션에서 **Add NodeJS** 클릭
3. 설정 정보:
   - Name: `Node-20`
   - Version: `NodeJS 20.x` (최신 LTS)
   - Global npm packages: `pnpm@latest`
4. **Save** 클릭

### 4.2 GitHub 서버 설정

1. **Manage Jenkins** > **Configure System** 접속
2. **GitHub** 섹션 찾기
3. **Add GitHub Server** 클릭
4. 설정 정보:
   - Name: `GitHub`
   - API URL: `https://api.github.com` (기본값)
   - Credentials: 나중에 설정 (GitHub 토큰 필요)

### 4.3 Jenkins URL 설정

1. **Jenkins Location** 섹션에서:
   - Jenkins URL: `http://localhost:8081/`
   - System Admin e-mail: `admin@vue-commerce.local`
2. **Save** 클릭

## 🔍 5단계: 설정 검증

### 5.1 플러그인 설치 확인

```bash
# Jenkins 컨테이너에서 설치된 플러그인 확인
docker exec vue-commerce-jenkins-dev ls /var/jenkins_home/plugins/ | grep -E "(github|nodejs|docker)"
```

### 5.2 웹 UI 확인 사항

- [ ] Jenkins 대시보드 정상 접속
- [ ] 관리자 계정으로 로그인 가능
- [ ] **Manage Jenkins** 메뉴 접근 가능
- [ ] 필수 플러그인 설치 완료
- [ ] Node.js 도구 설정 완료

## 🎯 6단계: 다음 작업 준비

설정이 완료되면 다음 작업을 진행할 수 있습니다:

1. **GitHub 웹훅 설정** - 자동 빌드 트리거
2. **파이프라인 Job 생성** - Jenkinsfile 기반 CI/CD
3. **통합 테스트** - 전체 파이프라인 검증

## 🚨 문제 해결

### Jenkins 접속 불가

```bash
# 컨테이너 상태 확인
docker ps | Select-String jenkins

# 컨테이너 재시작
docker restart vue-commerce-jenkins-dev

# 로그 확인
docker logs vue-commerce-jenkins-dev --tail 20
```

### 플러그인 설치 실패

1. Jenkins 재시작 후 재시도
2. 인터넷 연결 확인
3. 플러그인 의존성 확인

### 권한 문제

```bash
# Jenkins 홈 디렉토리 권한 확인
docker exec vue-commerce-jenkins-dev ls -la /var/jenkins_home/
```

## 📞 지원

문제가 발생하면 다음을 확인하세요:

- Jenkins 로그: `docker logs vue-commerce-jenkins-dev`
- 컨테이너 상태: `docker ps`
- 네트워크 연결: `curl http://localhost:8081`

---

**다음 단계**: [GitHub 웹훅 설정 가이드](./github-webhook-setup.md)
