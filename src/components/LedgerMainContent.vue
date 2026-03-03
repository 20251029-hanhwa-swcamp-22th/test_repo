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
  filters: {
    type: Object,
    required: true
  },
  accountOptions: {
    type: Array,
    default: () => []
  },
  categoryOptions: {
    type: Array,
    default: () => []
  },
  formatCurrency: {
    type: Function,
    required: true
  }
});

const emit = defineEmits([
  'open-category-edit',
  'open-transaction-edit',
  'update-filter',
  'apply-filters',
  'reset-filters',
  'export-csv'
]);

const onFilterInput = (key, event) => {
  emit('update-filter', {
    key,
    value: event.target.value
  });
};
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
            <input type="date" :value="filters.dateFrom" @input="onFilterInput('dateFrom', $event)" />
            <span>~</span>
            <input type="date" :value="filters.dateTo" @input="onFilterInput('dateTo', $event)" />
          </div>
        </label>
        <label>
          계좌
          <select :value="filters.account" @change="onFilterInput('account', $event)">
            <option value="ALL">전체</option>
            <option v-for="account in accountOptions" :key="account" :value="account">{{ account }}</option>
          </select>
        </label>
        <label>
          유형
          <select :value="filters.transactionType" @change="onFilterInput('transactionType', $event)">
            <option value="ALL">전체</option>
            <option value="INCOME">수입</option>
            <option value="EXPENSE">지출</option>
          </select>
        </label>
        <label>
          카테고리
          <select :value="filters.category" @change="onFilterInput('category', $event)">
            <option value="ALL">전체</option>
            <option v-for="category in categoryOptions" :key="category" :value="category">{{ category }}</option>
          </select>
        </label>
        <label>
          메모 검색
          <input
            type="text"
            placeholder="메모 키워드 입력"
            :value="filters.memoKeyword"
            @input="onFilterInput('memoKeyword', $event)"
          />
        </label>
        <label>
          최소 금액
          <input
            type="number"
            placeholder="0"
            :value="filters.minAmount"
            @input="onFilterInput('minAmount', $event)"
          />
        </label>
        <label>
          최대 금액
          <input
            type="number"
            placeholder="제한 없음"
            :value="filters.maxAmount"
            @input="onFilterInput('maxAmount', $event)"
          />
        </label>
      </div>
      <div class="filter-actions">
        <button type="button" class="line" @click="emit('export-csv')">CSV 내보내기</button>
        <button type="button" class="line" @click="emit('reset-filters')">초기화</button>
        <button type="button" class="primary-button" @click="emit('apply-filters')">조회</button>
      </div>
      <p class="filter-result-info">조회 결과 {{ transactions.length }}건</p>
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
