// 환경변수 타입 정의
interface AppEnv {
  NODE_ENV: "development" | "production" | "test";
  VITE_API_BASE_URL: string;
  VITE_APP_TITLE: string;
  VITE_DEFAULT_LOCALE: string;
  VITE_DEBUG_MODE: boolean;
  VITE_LOG_LEVEL: "error" | "warn" | "info" | "debug";
  VITE_TOKEN_EXPIRE_TIME: number;
  VITE_MAX_FILE_SIZE: number;
  VITE_DEFAULT_PAGE_SIZE: number;
  VITE_GA_ID?: string;
  VITE_SENTRY_DSN?: string;
  VITE_TEST_MODE?: boolean;
  VITE_MOCK_API?: boolean;
}

/**
 * 환경변수를 안전하게 가져오는 함수
 * @param key 환경변수 키
 * @param defaultValue 기본값
 * @returns 환경변수 값 또는 기본값
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    console.warn(`환경변수 ${key}가 설정되지 않았습니다.`);
    return "";
  }
  return value;
}

/**
 * 환경변수를 불린값으로 변환
 * @param key 환경변수 키
 * @param defaultValue 기본값
 * @returns 불린값
 */
function getEnvBoolean(key: string, defaultValue = false): boolean {
  const value = getEnvVar(key);
  if (!value) return defaultValue;
  return value.toLowerCase() === "true";
}

/**
 * 환경변수를 숫자로 변환
 * @param key 환경변수 키
 * @param defaultValue 기본값
 * @returns 숫자값
 */
function getEnvNumber(key: string, defaultValue = 0): number {
  const value = getEnvVar(key);
  if (!value) return defaultValue;
  const num = parseInt(value, 10);
  return isNaN(num) ? defaultValue : num;
}

// 앱 환경 설정 객체
export const appEnv: AppEnv = {
  NODE_ENV: (import.meta.env.NODE_ENV as AppEnv["NODE_ENV"]) || "development",
  VITE_API_BASE_URL: getEnvVar(
    "VITE_API_BASE_URL",
    "http://localhost:3001/api"
  ),
  VITE_APP_TITLE: getEnvVar("VITE_APP_TITLE", "Vue Commerce"),
  VITE_DEFAULT_LOCALE: getEnvVar("VITE_DEFAULT_LOCALE", "ko"),
  VITE_DEBUG_MODE: getEnvBoolean("VITE_DEBUG_MODE", true),
  VITE_LOG_LEVEL: getEnvVar(
    "VITE_LOG_LEVEL",
    "debug"
  ) as AppEnv["VITE_LOG_LEVEL"],
  VITE_TOKEN_EXPIRE_TIME: getEnvNumber("VITE_TOKEN_EXPIRE_TIME", 60),
  VITE_MAX_FILE_SIZE: getEnvNumber("VITE_MAX_FILE_SIZE", 10),
  VITE_DEFAULT_PAGE_SIZE: getEnvNumber("VITE_DEFAULT_PAGE_SIZE", 20),
  VITE_GA_ID: getEnvVar("VITE_GA_ID"),
  VITE_SENTRY_DSN: getEnvVar("VITE_SENTRY_DSN"),
  VITE_TEST_MODE: getEnvBoolean("VITE_TEST_MODE", false),
  VITE_MOCK_API: getEnvBoolean("VITE_MOCK_API", false),
};

// 환경 체크 유틸리티 함수들
export const isDevelopment = () => appEnv.NODE_ENV === "development";
export const isProduction = () => appEnv.NODE_ENV === "production";
export const isTest = () => appEnv.NODE_ENV === "test";

// API URL 빌더
export const buildApiUrl = (path: string): string => {
  const baseUrl = appEnv.VITE_API_BASE_URL.replace(/\/$/, ""); // 끝의 슬래시 제거
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

// 디버그 로그 함수
export const debugLog = (message: string, ...args: any[]): void => {
  if (appEnv.VITE_DEBUG_MODE && console[appEnv.VITE_LOG_LEVEL]) {
    console[appEnv.VITE_LOG_LEVEL](
      `[${appEnv.VITE_APP_TITLE}] ${message}`,
      ...args
    );
  }
};

// 환경 정보 출력 (개발 모드에서만)
if (isDevelopment()) {
  console.group("🔧 환경 설정 정보");
  console.log("환경:", appEnv.NODE_ENV);
  console.log("API URL:", appEnv.VITE_API_BASE_URL);
  console.log("디버그 모드:", appEnv.VITE_DEBUG_MODE);
  console.log("로그 레벨:", appEnv.VITE_LOG_LEVEL);
  console.groupEnd();
}
