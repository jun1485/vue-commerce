<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- 상단 푸터 콘텐츠 -->
      <div class="footer-content">
        <!-- 회사 정보 -->
        <div class="footer-section">
          <h4 class="footer-title">Vue Commerce</h4>
          <p class="footer-description">
            최고의 상품을 합리적인 가격에 제공하는<br />
            온라인 쇼핑몰입니다.
          </p>
          <div class="contact-info">
            <p>📞 고객센터: 1588-1234</p>
            <p>📧 이메일: help@vue-commerce.com</p>
            <p>⏰ 운영시간: 평일 9:00-18:00</p>
          </div>
        </div>

        <!-- 고객 서비스 -->
        <div class="footer-section">
          <h4 class="footer-title">고객 서비스</h4>
          <ul class="footer-links">
            <li><router-link to="/help/faq">자주묻는질문</router-link></li>
            <li><router-link to="/help/shipping">배송안내</router-link></li>
            <li><router-link to="/help/return">교환/반품</router-link></li>
            <li><router-link to="/help/size">사이즈가이드</router-link></li>
            <li><router-link to="/help/contact">고객센터</router-link></li>
          </ul>
        </div>

        <!-- 쇼핑 가이드 -->
        <div class="footer-section">
          <h4 class="footer-title">쇼핑 가이드</h4>
          <ul class="footer-links">
            <li>
              <router-link to="/guide/how-to-order">주문방법</router-link>
            </li>
            <li><router-link to="/guide/payment">결제방법</router-link></li>
            <li>
              <router-link to="/guide/membership">멤버십혜택</router-link>
            </li>
            <li><router-link to="/guide/coupon">쿠폰사용법</router-link></li>
            <li><router-link to="/guide/review">리뷰작성</router-link></li>
          </ul>
        </div>

        <!-- 회사 정보 -->
        <div class="footer-section">
          <h4 class="footer-title">회사 정보</h4>
          <ul class="footer-links">
            <li><router-link to="/company/about">회사소개</router-link></li>
            <li><router-link to="/company/terms">이용약관</router-link></li>
            <li>
              <router-link to="/company/privacy">개인정보처리방침</router-link>
            </li>
            <li>
              <router-link to="/company/partnership">제휴문의</router-link>
            </li>
            <li><router-link to="/company/careers">채용정보</router-link></li>
          </ul>
        </div>
      </div>

      <!-- 소셜 미디어 및 추가 정보 -->
      <div class="footer-social">
        <div class="social-links">
          <span class="social-title">팔로우하기</span>
          <div class="social-icons">
            <a href="#" class="social-link" aria-label="인스타그램">📷</a>
            <a href="#" class="social-link" aria-label="페이스북">📘</a>
            <a href="#" class="social-link" aria-label="트위터">🐦</a>
            <a href="#" class="social-link" aria-label="유튜브">📺</a>
          </div>
        </div>

        <div class="payment-methods">
          <span class="payment-title">결제 방법</span>
          <div class="payment-icons">
            <span class="payment-icon">💳</span>
            <span class="payment-icon">🏦</span>
            <span class="payment-icon">📱</span>
            <span class="payment-icon">💰</span>
          </div>
        </div>
      </div>

      <!-- 하단 저작권 정보 -->
      <div class="footer-bottom">
        <div class="company-details">
          <p>
            상호명: (주)뷰커머스 | 대표자: 홍길동 | 사업자등록번호:
            123-45-67890<br />
            주소: 서울특별시 강남구 테헤란로 123 뷰커머스빌딩 10층<br />
            통신판매업신고번호: 제2024-서울강남-1234호
          </p>
        </div>

        <div class="copyright">
          <p>&copy; {{ currentYear }} Vue Commerce. All rights reserved.</p>
          <p>본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

// 현재 연도 계산
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  background-color: #1f2937;
  color: #d1d5db;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px 20px;
}

/* 상단 푸터 콘텐츠 */
.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  margin-bottom: 32px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-title {
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.footer-description {
  line-height: 1.6;
  margin: 0;
}

.contact-info {
  font-size: 14px;
  line-height: 1.6;
}

.contact-info p {
  margin: 4px 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-links a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #3b82f6;
}

/* 소셜 미디어 및 결제 방법 */
.footer-social {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-top: 1px solid #374151;
  border-bottom: 1px solid #374151;
  margin-bottom: 24px;
}

.social-links,
.payment-methods {
  display: flex;
  align-items: center;
  gap: 16px;
}

.social-title,
.payment-title {
  font-weight: 500;
  color: white;
}

.social-icons,
.payment-icons {
  display: flex;
  gap: 12px;
}

.social-link,
.payment-icon {
  font-size: 24px;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.social-link:hover {
  transform: scale(1.1);
}

/* 하단 저작권 정보 */
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 12px;
  line-height: 1.5;
}

.company-details p,
.copyright p {
  margin: 4px 0;
  color: #9ca3af;
}

.copyright {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #374151;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer-social {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .social-links,
  .payment-methods {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .social-icons,
  .payment-icons {
    gap: 8px;
  }

  .footer-bottom {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 24px 16px 16px;
  }

  .footer-content {
    gap: 20px;
  }

  .footer-section {
    gap: 12px;
  }

  .footer-title {
    font-size: 16px;
  }
}
</style>
