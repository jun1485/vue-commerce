# ngrok 설정 및 Jenkins 터널링 스크립트
# 
# 사용법:
# 1. ngrok 계정 생성: https://ngrok.com/signup
# 2. 인증 토큰 복사: https://dashboard.ngrok.com/get-started/your-authtoken
# 3. 아래 YOUR_AUTHTOKEN을 실제 토큰으로 교체
# 4. 스크립트 실행: .\ngrok-setup.ps1

# ngrok 실행 파일 경로
$ngrokPath = "C:\Users\joon1\AppData\Local\Microsoft\WinGet\Packages\Ngrok.Ngrok_Microsoft.Winget.Source_8wekyb3d8bbwe\ngrok.exe"

Write-Host "🚀 ngrok 설정 및 Jenkins 터널링 시작" -ForegroundColor Green

# 1단계: ngrok 인증 토큰 설정
Write-Host "`n📝 1단계: ngrok 인증 토큰 설정" -ForegroundColor Yellow
Write-Host "ngrok 계정이 필요합니다: https://ngrok.com/signup" -ForegroundColor Cyan
Write-Host "인증 토큰 확인: https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor Cyan

$authToken = Read-Host "ngrok 인증 토큰을 입력하세요 (또는 Enter로 건너뛰기)"

if ($authToken) {
    Write-Host "인증 토큰 설정 중..." -ForegroundColor Blue
    & $ngrokPath config add-authtoken $authToken
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ 인증 토큰이 성공적으로 설정되었습니다!" -ForegroundColor Green
    } else {
        Write-Host "❌ 인증 토큰 설정에 실패했습니다." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️ 인증 토큰을 건너뛰었습니다. 무료 계정으로 제한된 기능만 사용 가능합니다." -ForegroundColor Yellow
}

# 2단계: Jenkins 컨테이너 상태 확인
Write-Host "`n🔍 2단계: Jenkins 컨테이너 상태 확인" -ForegroundColor Yellow
$jenkinsContainer = docker ps --filter "name=vue-commerce-jenkins-dev" --format "{{.Names}}"

if ($jenkinsContainer) {
    Write-Host "✅ Jenkins 컨테이너가 실행 중입니다: $jenkinsContainer" -ForegroundColor Green
    
    # Jenkins 포트 확인
    $jenkinsPort = docker port vue-commerce-jenkins-dev 8080
    Write-Host "Jenkins 포트: $jenkinsPort" -ForegroundColor Cyan
} else {
    Write-Host "❌ Jenkins 컨테이너가 실행되지 않았습니다." -ForegroundColor Red
    Write-Host "다음 명령어로 Jenkins를 시작하세요:" -ForegroundColor Yellow
    Write-Host "docker-compose -f docker-compose.dev.yml up -d" -ForegroundColor Cyan
    exit 1
}

# 3단계: ngrok 터널 시작
Write-Host "`n🌐 3단계: ngrok 터널 시작" -ForegroundColor Yellow
Write-Host "Jenkins 서버(localhost:8081)를 외부에 노출시킵니다..." -ForegroundColor Blue

# 백그라운드에서 ngrok 실행
Write-Host "ngrok 터널을 시작합니다. 터널 정보를 확인하려면 http://localhost:4040 을 방문하세요." -ForegroundColor Cyan
Write-Host "터널을 중지하려면 Ctrl+C를 누르세요." -ForegroundColor Yellow

# ngrok 실행 (HTTP 터널)
& $ngrokPath http 8081

Write-Host "`n🎉 ngrok 터널이 종료되었습니다." -ForegroundColor Green 