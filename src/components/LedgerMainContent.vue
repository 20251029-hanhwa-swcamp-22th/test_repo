<script setup>
import TransactionList from './TransactionList.vue';

defineProps({
  totalIncome: {
    type: Number,
    required: true
  },
  totalExpense: {
    type: Number,
    required: true
  },
  totalBalance: {
    type: Number,
    required: true
  },
  transactions: {
    type: Array,
    default: () => []
  },
  formatCurrency: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(['open-category-edit', 'open-transaction-edit']);
</script>

<template>
  <div class="ledger-main">
    <div class="ledger-title-row">
      <div>
        <p class="theme-kicker">GALACTIC FINANCE NETWORK</p>
        <h1>거래 내역</h1>
      </div>
      <div class="ledger-header-actions">
        <button type="button" class="line" @click="emit('open-category-edit')">카테고리 수정</button>
        <button type="button" class="primary-button" @click="emit('open-transaction-edit')">+ 거래 등록</button>
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

    <TransactionList
      :transactions="transactions"
      :format-currency="formatCurrency"
      @edit-transaction="emit('open-transaction-edit')"
    />
  </div>
</template>
