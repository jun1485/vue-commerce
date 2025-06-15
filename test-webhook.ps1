# GitHub 웹훅 테스트 스크립트
#
# 사용법: .\test-webhook.ps1

Write-Host "🧪 GitHub 웹훅 연동 테스트 시작" -ForegroundColor Green

# 1단계: Git 상태 확인
Write-Host "`n📋 1단계: Git 상태 확인" -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️ 커밋되지 않은 변경사항이 있습니다:" -ForegroundColor Yellow
    git status --short
    
    $commit = Read-Host "변경사항을 커밋하고 푸시하시겠습니까? (y/N)"
    if ($commit -eq 'y' -or $commit -eq 'Y') {
        git add .
        $commitMessage = Read-Host "커밋 메시지를 입력하세요 (기본값: 'test: GitHub 웹훅 연동 테스트')"
        if (-not $commitMessage) {
            $commitMessage = "test: GitHub 웹훅 연동 테스트"
        }
        git commit -m $commitMessage
    } else {
        Write-Host "테스트를 위한 더미 파일을 생성합니다..." -ForegroundColor Blue
    }
} else {
    Write-Host "✅ 작업 디렉토리가 깨끗합니다." -ForegroundColor Green
    Write-Host "테스트를 위한 더미 파일을 생성합니다..." -ForegroundColor Blue
}

# 2단계: 테스트 파일 생성
Write-Host "`n📝 2단계: 웹훅 테스트 파일 생성" -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$testContent = @"
# GitHub 웹훅 테스트

테스트 시간: $timestamp

이 파일은 GitHub 웹훅과 Jenkins CI/CD 파이프라인 연동을 테스트하기 위해 생성되었습니다.

## 테스트 내용
- GitHub 저장소에서 코드 푸시 감지
- Jenkins 자동 빌드 트리거
- CI/CD 파이프라인 8단계 실행:
  1. 📥 Checkout
  2. 📦 Install Dependencies  
  3. 🔍 Code Quality Check
  4. 🧪 Test
  5. 🏗️ Build Application
  6. 🐳 Build Docker Image
  7. 🔧 Test Docker Image
  8. 🚀 Deploy

## 예상 결과
- Jenkins에서 자동 빌드 시작
- 모든 파이프라인 단계 성공
- 애플리케이션 배포 완료 (http://localhost:3000)

---
자동 생성됨: $timestamp
"@

$testContent | Out-File -FilePath "webhook-test-$((Get-Date).ToString('yyyyMMdd-HHmmss')).md" -Encoding UTF8
Write-Host "✅ 테스트 파일이 생성되었습니다." -ForegroundColor Green

# 3단계: Git 커밋 및 푸시
Write-Host "`n🚀 3단계: Git 커밋 및 푸시" -ForegroundColor Yellow
git add .
git commit -m "test: GitHub 웹훅 연동 테스트 - $timestamp"

Write-Host "원격 저장소로 푸시 중..." -ForegroundColor Blue
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 코드가 성공적으로 푸시되었습니다!" -ForegroundColor Green
    
    # 4단계: Jenkins 빌드 확인 안내
    Write-Host "`n🔍 4단계: Jenkins 빌드 확인" -ForegroundColor Yellow
    Write-Host "다음 단계를 수행하세요:" -ForegroundColor Cyan
    Write-Host "1. Jenkins 대시보드 확인: http://localhost:8081" -ForegroundColor White
    Write-Host "2. 자동 빌드가 시작되었는지 확인" -ForegroundColor White
    Write-Host "3. 빌드 로그에서 각 단계별 실행 상태 확인" -ForegroundColor White
    Write-Host "4. GitHub 웹훅 상태 확인: https://github.com/jun1485/vue-commerce/settings/hooks" -ForegroundColor White
    
    Write-Host "`n📊 예상 결과:" -ForegroundColor Yellow
    Write-Host "- GitHub 웹훅 전송 상태: 200 OK" -ForegroundColor Green
    Write-Host "- Jenkins 빌드 자동 시작" -ForegroundColor Green
    Write-Host "- 파이프라인 8단계 모두 성공" -ForegroundColor Green
    Write-Host "- 애플리케이션 배포 완료" -ForegroundColor Green
    
} else {
    Write-Host "❌ 푸시에 실패했습니다. Git 설정을 확인하세요." -ForegroundColor Red
    Write-Host "다음을 확인하세요:" -ForegroundColor Yellow
    Write-Host "- 원격 저장소 연결 상태" -ForegroundColor White
    Write-Host "- Git 인증 정보" -ForegroundColor White
    Write-Host "- 네트워크 연결" -ForegroundColor White
}

Write-Host "`n🎉 웹훅 테스트 스크립트 완료!" -ForegroundColor Green 