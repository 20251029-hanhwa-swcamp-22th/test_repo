<script setup>
import { computed, ref } from 'vue';

const activeScreen = ref('ledger');
const showAccountAddModal = ref(false);
const showAccountAnalysisModal = ref(false);
const showTransactionEditModal = ref(false);
const showCategoryEditModal = ref(false);

const transactions = ref([
  { date: '2026-02-25', category: 'TRANSPORT', account: '기업은행', memo: '지하철', amount: -1350 },
  { date: '2026-02-25', category: 'SHOPPING', account: '기업은행', memo: '무신사', amount: -30000 },
  { date: '2026-02-25', category: 'BONUS', account: '기업은행', memo: '성과금', amount: 200000 },
  { date: '2026-02-25', category: 'CAFE', account: '기업은행', memo: '커피', amount: -8000 },
  { date: '2026-02-22', category: 'SHOPPING', account: '미지정', memo: '[SEED-MONTH-COMPARE] current shopping', amount: -310000 },
  { date: '2026-02-18', category: 'BONUS', account: '미지정', memo: '[SEED-MONTH-COMPARE] current bonus', amount: 120000 },
  { date: '2026-02-15', category: 'CAFE', account: '미지정', memo: '[SEED-MONTH-COMPARE] current cafe', amount: -80000 },
  { date: '2026-02-08', category: 'TRANSPORT', account: '미지정', memo: '[SEED-MONTH-COMPARE] current transport', amount: -100000 },
  { date: '2026-02-05', category: 'SALARY', account: '미지정', memo: '[SEED-MONTH-COMPARE] current salary', amount: 3500000 },
  { date: '2026-02-03', category: 'FOOD', account: '미지정', memo: '[SEED-MONTH-COMPARE] current food', amount: -360000 }
]);

const totalIncome = computed(() =>
  transactions.value.filter((item) => item.amount > 0).reduce((sum, item) => sum + item.amount, 0)
);

const totalExpense = computed(() =>
  Math.abs(transactions.value.filter((item) => item.amount < 0).reduce((sum, item) => sum + item.amount, 0))
);

const totalBalance = computed(() => totalIncome.value - totalExpense.value);

const formatCurrency = (value, withSign = false) => {
  const abs = Math.abs(value).toLocaleString('ko-KR');
  if (withSign) {
    return `${value >= 0 ? '+' : '-'}${abs}원`;
  }
  return `${abs}원`;
};

</script>

<template>
  <div class="app" :class="{ 'ledger-mode': activeScreen === 'ledger' }">
    <header class="topbar">
      <div class="brand-wrap">
        <p class="brand">가계부</p>
        <nav class="main-nav">
          <button type="button" class="main-nav-item">대시보드</button>
          <button type="button" class="main-nav-item active">거래내역</button>
          <button type="button" class="main-nav-item">월별통계</button>
          <button type="button" class="main-nav-item">카테고리</button>
        </nav>
      </div>
      <button type="button" class="logout-button">로그아웃</button>
    </header>

    <main class="workspace">
      <section class="screen-switcher">
        <button
          v-for="screen in ['login', 'signup', 'ledger']"
          :key="screen"
          type="button"
          class="screen-tab"
          :class="{ active: activeScreen === screen }"
          @click="activeScreen = screen"
        >
          {{ screen === 'login' ? '로그인' : screen === 'signup' ? '회원가입' : '거래내역' }}
        </button>
      </section>

      <section v-if="activeScreen === 'login'" class="auth-stage">
        <article class="auth-card">
          <h1>로그인</h1>
          <label>이메일</label>
          <input type="email" placeholder="이메일을 입력하세요" />
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력하세요" />
          <button type="button" class="primary-button">로그인</button>
          <p class="auth-link-row">
            계정이 없으신가요?
            <a href="#">회원가입</a>
          </p>
        </article>
      </section>

      <section v-else-if="activeScreen === 'signup'" class="auth-stage">
        <article class="auth-card signup">
          <h1>회원가입</h1>
          <label>이름</label>
          <input type="text" placeholder="이름을 입력하세요" />
          <label>이메일</label>
          <input type="email" placeholder="이메일을 입력하세요" />
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력하세요" />
          <label>비밀번호 확인</label>
          <input type="password" placeholder="비밀번호를 다시 입력하세요" />
          <button type="button" class="primary-button">회원가입</button>
          <p class="auth-link-row">
            이미 계정이 있으신가요?
            <a href="#">로그인으로 이동</a>
          </p>
        </article>
      </section>

      <section v-else class="ledger-stage starwars-ledger">
        <div class="ledger-layout">
          <aside class="account-panel">
            <h2>계좌 리스트</h2>
            <div class="account-card">
              <div class="account-head">
                <strong>기업은행</strong>
                <div class="inline-actions">
                  <button type="button">수정</button>
                  <button type="button" class="danger">삭제</button>
                </div>
              </div>
              <p>잔액 : 100,160,650₩</p>
            </div>
            <div class="account-panel-actions">
              <button type="button" @click="showAccountAnalysisModal = true">계좌 분석</button>
              <button type="button" class="primary" @click="showAccountAddModal = true">계좌 추가</button>
            </div>
          </aside>

          <div class="ledger-main">
            <div class="ledger-title-row">
              <div>
                <p class="theme-kicker">GALACTIC FINANCE NETWORK</p>
                <h1>거래 내역</h1>
              </div>
              <div class="ledger-header-actions">
                <button type="button" class="line" @click="showCategoryEditModal = true">카테고리 수정</button>
                <button type="button" class="primary-button" @click="showTransactionEditModal = true">+ 거래 등록</button>
              </div>
            </div>

            <div class="filter-card">
              <div class="field-grid">
                <label>
                  기간
                  <div class="period-grid">
                    <input type="date" value="2026-02-01" />
                    <span>~</span>
                    <input type="date" value="2026-02-29" />
                  </div>
                </label>
                <label>
                  계좌
                  <select>
                    <option>전체</option>
                  </select>
                </label>
                <label>
                  유형
                  <select>
                    <option>전체</option>
                  </select>
                </label>
                <label>
                  카테고리
                  <select>
                    <option>전체</option>
                  </select>
                </label>
                <label>
                  메모 검색
                  <input type="text" placeholder="메모 키워드 입력" />
                </label>
                <label>
                  최소 금액
                  <input type="number" placeholder="0" />
                </label>
                <label>
                  최대 금액
                  <input type="number" placeholder="제한 없음" />
                </label>
              </div>
              <div class="filter-actions">
                <button type="button" class="line">초기화</button>
                <button type="button" class="primary-button">조회</button>
              </div>
            </div>

            <div class="summary-grid">
              <article>
                <p>수입</p>
                <strong class="income">{{ formatCurrency(totalIncome) }}</strong>
              </article>
              <article>
                <p>지출</p>
                <strong class="expense">{{ formatCurrency(totalExpense) }}</strong>
              </article>
              <article>
                <p>잔액</p>
                <strong>{{ formatCurrency(totalBalance) }}</strong>
              </article>
            </div>

            <div class="transaction-list">
              <article v-for="(item, index) in transactions" :key="`${item.date}-${index}`" class="transaction-row">
                <div class="row-left">
                  <span class="date">{{ item.date }}</span>
                  <strong>{{ item.category }}</strong>
                  <span class="account-chip">{{ item.account }}</span>
                  <span class="memo">{{ item.memo }}</span>
                </div>
                <div class="row-right">
                  <strong :class="item.amount >= 0 ? 'income' : 'expense'">
                    {{ formatCurrency(item.amount, true) }}
                  </strong>
                  <button type="button" class="line tiny" @click="showTransactionEditModal = true">수정</button>
                  <button type="button" class="danger tiny">삭제</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div v-if="showAccountAddModal" class="modal-backdrop" @click.self="showAccountAddModal = false">
      <section class="modal-card small">
        <h3>계좌 추가</h3>
        <label>
          계좌명
          <input type="text" placeholder="예: 국민은행 통장" />
        </label>
        <label>
          잔액
          <input type="number" placeholder="0" />
        </label>
        <div class="modal-actions">
          <button type="button" class="line" @click="showAccountAddModal = false">취소</button>
          <button type="button" class="primary-button">추가</button>
        </div>
      </section>
    </div>

    <div v-if="showAccountAnalysisModal" class="modal-backdrop" @click.self="showAccountAnalysisModal = false">
      <section class="modal-card medium">
        <div class="modal-title-row">
          <h3>계좌 비중 분석</h3>
          <button type="button" class="icon-close" @click="showAccountAnalysisModal = false">✕</button>
        </div>
        <p class="analysis-total">
          총 잔액:
          <strong>100,160,650₩</strong>
          <span>(1개 계좌)</span>
        </p>
        <div class="donut-wrap">
          <div class="donut-chart"></div>
        </div>
        <div class="analysis-row">
          <span class="dot"></span>
          <span>기업은행</span>
          <strong>100,160,650₩</strong>
          <span>100.0%</span>
        </div>
      </section>
    </div>

    <div v-if="showTransactionEditModal" class="modal-backdrop" @click.self="showTransactionEditModal = false">
      <section class="modal-card large">
        <div class="modal-title-row">
          <h3>거래 수정</h3>
          <button type="button" class="icon-close" @click="showTransactionEditModal = false">✕</button>
        </div>
        <div class="edit-grid">
          <label>유형<select><option>지출</option><option>수입</option></select></label>
          <label>카테고리<select><option>CAFE</option></select></label>
          <label>계좌<select><option>미지정</option></select></label>
          <label>날짜<input type="date" value="2026-02-25" /></label>
          <label>금액<input type="number" placeholder="금액" /></label>
          <label>메모<input type="text" placeholder="메모 (선택)" /></label>
        </div>
        <div class="modal-actions right">
          <button type="button" class="line" @click="showTransactionEditModal = false">취소</button>
          <button type="button" class="primary-button">저장</button>
        </div>
      </section>
    </div>

    <div v-if="showCategoryEditModal" class="modal-backdrop" @click.self="showCategoryEditModal = false">
      <section class="modal-card category">
        <div class="modal-title-row">
          <h3>카테고리 수정</h3>
          <button type="button" class="icon-close" @click="showCategoryEditModal = false">✕</button>
        </div>
        <div class="edit-grid category-grid">
          <label>유형<select><option>지출</option><option>수입</option></select></label>
          <label>카테고리명<input type="text" placeholder="예: 식비, 월급" /></label>
        </div>
        <div class="modal-actions right">
          <button type="button" class="line" @click="showCategoryEditModal = false">취소</button>
          <button type="button" class="primary-button">저장</button>
        </div>
      </section>
    </div>
  </div>
</template>
