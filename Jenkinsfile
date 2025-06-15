pipeline {
    // Jenkins 에이전트 설정 - Docker를 사용할 수 있는 에이전트
    agent any
    
    // 환경 변수 정의
    environment {
        // 프로젝트 이름
        PROJECT_NAME = 'vue-commerce'
        // Docker 이미지 이름
        DOCKER_IMAGE = 'vue-commerce-app'
        // Docker 태그 (빌드 번호 사용)
        DOCKER_TAG = "${BUILD_NUMBER}"
        // Node.js 버전
        NODE_VERSION = '20'
        // 배포 포트
        DEPLOY_PORT = '3000'
    }
    
    // 빌드 트리거 설정
    triggers {
        // GitHub 웹훅 트리거 (push 이벤트 시 자동 빌드)
        githubPush()
        // 정기적 빌드 (매일 밤 2시)
        cron('0 2 * * *')
    }
    
    // 파이프라인 단계들
    stages {
        
        // 1단계: 소스코드 체크아웃
        stage('📥 Checkout') {
            steps {
                echo '=== 소스코드를 가져오는 중 ==='
                // Git에서 소스코드 체크아웃
                checkout scm
                
                // 현재 브랜치와 커밋 정보 출력
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    env.GIT_BRANCH_NAME = sh(
                        script: 'git rev-parse --abbrev-ref HEAD',
                        returnStdout: true
                    ).trim()
                }
                echo "브랜치: ${env.GIT_BRANCH_NAME}"
                echo "커밋: ${env.GIT_COMMIT_SHORT}"
            }
        }
        
        // 2단계: Node.js 환경 설정 및 의존성 설치
        stage('📦 Install Dependencies') {
            steps {
                echo '=== Node.js 의존성을 설치하는 중 ==='
                
                // Node.js 도구 사용 (Jenkins NodeJS 플러그인 필요)
                nodejs(nodeJSInstallationName: 'Node-20') {
                    // pnpm 설치 및 활성화
                    sh '''
                        echo "Node.js 버전 확인:"
                        node --version
                        
                        echo "pnpm 설치 및 활성화:"
                        corepack enable
                        corepack prepare pnpm@latest --activate
                        
                        echo "pnpm 버전 확인:"
                        pnpm --version
                        
                        echo "의존성 설치 중..."
                        pnpm install --frozen-lockfile
                    '''
                }
            }
        }
        
        // 3단계: 코드 품질 검사
        stage('🔍 Code Quality Check') {
            parallel {
                // 타입 체크
                stage('Type Check') {
                    steps {
                        echo '=== TypeScript 타입 검사 중 ==='
                        nodejs(nodeJSInstallationName: 'Node-20') {
                            sh 'pnpm run type-check'
                        }
                    }
                }
                
                // 린트 검사 (ESLint가 설정되어 있다면)
                stage('Lint Check') {
                    when {
                        // package.json에 lint 스크립트가 있을 때만 실행
                        expression {
                            return fileExists('package.json') && 
                                   sh(script: 'grep -q "lint" package.json', returnStatus: true) == 0
                        }
                    }
                    steps {
                        echo '=== 코드 린트 검사 중 ==='
                        nodejs(nodeJSInstallationName: 'Node-20') {
                            sh 'pnpm run lint || echo "린트 스크립트가 없습니다"'
                        }
                    }
                }
            }
        }
        
        // 4단계: 테스트 실행
        stage('🧪 Test') {
            steps {
                echo '=== 테스트 실행 중 ==='
                nodejs(nodeJSInstallationName: 'Node-20') {
                    script {
                        // 테스트 스크립트가 있는지 확인
                        def hasTest = sh(
                            script: 'grep -q "\\"test\\"" package.json',
                            returnStatus: true
                        ) == 0
                        
                        if (hasTest) {
                            sh 'pnpm run test'
                        } else {
                            echo '테스트 스크립트가 설정되지 않았습니다. 건너뜁니다.'
                        }
                    }
                }
            }
        }
        
        // 5단계: 애플리케이션 빌드
        stage('🏗️ Build Application') {
            steps {
                echo '=== Vue.js 애플리케이션 빌드 중 ==='
                nodejs(nodeJSInstallationName: 'Node-20') {
                    sh '''
                        echo "프로덕션 빌드 시작..."
                        pnpm run build
                        
                        echo "빌드 결과 확인:"
                        ls -la dist/
                        
                        echo "빌드된 파일 크기:"
                        du -sh dist/
                    '''
                }
            }
        }
        
        // 6단계: Docker 이미지 빌드
        stage('🐳 Build Docker Image') {
            steps {
                echo '=== Docker 이미지 빌드 중 ==='
                script {
                    // Docker 이미지 빌드
                    def dockerImage = docker.build(
                        "${DOCKER_IMAGE}:${DOCKER_TAG}",
                        "--target production-stage ."
                    )
                    
                    // latest 태그도 추가
                    sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                    
                    echo "빌드된 Docker 이미지: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    
                    // 이미지 정보 출력
                    sh "docker images | grep ${DOCKER_IMAGE}"
                }
            }
        }
        
        // 7단계: Docker 이미지 테스트
        stage('🔧 Test Docker Image') {
            steps {
                echo '=== Docker 이미지 테스트 중 ==='
                script {
                    // 테스트용 컨테이너 실행
                    sh '''
                        echo "테스트 컨테이너 실행..."
                        docker run -d --name test-container -p 3001:3000 vue-commerce-app:latest
                        
                        echo "컨테이너 상태 확인..."
                        sleep 10
                        docker ps | grep test-container
                        
                        echo "헬스체크..."
                        curl -f http://localhost:3001 || echo "헬스체크 실패"
                        
                        echo "테스트 컨테이너 정리..."
                        docker stop test-container
                        docker rm test-container
                    '''
                }
            }
        }
        
        // 8단계: 배포 (운영 환경)
        stage('🚀 Deploy') {
            when {
                // main 브랜치에서만 배포 실행
                branch 'main'
            }
            steps {
                echo '=== 운영 환경에 배포 중 ==='
                script {
                    // 기존 컨테이너 정리
                    sh '''
                        echo "기존 컨테이너 정리..."
                        docker stop vue-commerce-app || echo "정리할 컨테이너가 없습니다"
                        docker rm vue-commerce-app || echo "정리할 컨테이너가 없습니다"
                    '''
                    
                    // 새 컨테이너 배포
                    sh '''
                        echo "새 컨테이너 배포..."
                        docker run -d \
                            --name vue-commerce-app \
                            --restart unless-stopped \
                            -p 3000:3000 \
                            vue-commerce-app:latest
                        
                        echo "배포 완료! 서비스 상태 확인..."
                        sleep 5
                        docker ps | grep vue-commerce-app
                        
                        echo "애플리케이션 접속: http://localhost:3000"
                    '''
                }
            }
        }
    }
    
    // 빌드 후 작업
    post {
        // 항상 실행
        always {
            echo '=== 빌드 완료 ==='
            
            // 워크스페이스 정리 (선택적)
            // cleanWs()
        }
        
        // 성공 시
        success {
            echo '✅ 빌드 및 배포가 성공적으로 완료되었습니다!'
            
            // 성공 알림 (Slack, 이메일 등)
            // slackSend(
            //     channel: '#deployments',
            //     color: 'good',
            //     message: "✅ ${PROJECT_NAME} 배포 성공! 빌드 #${BUILD_NUMBER}"
            // )
        }
        
        // 실패 시
        failure {
            echo '❌ 빌드 또는 배포가 실패했습니다!'
            
            // 실패 알림
            // slackSend(
            //     channel: '#deployments',
            //     color: 'danger',
            //     message: "❌ ${PROJECT_NAME} 배포 실패! 빌드 #${BUILD_NUMBER}"
            // )
        }
        
        // 불안정 시 (테스트 실패 등)
        unstable {
            echo '⚠️ 빌드가 불안정합니다. 테스트를 확인해주세요.'
        }
    }
} 