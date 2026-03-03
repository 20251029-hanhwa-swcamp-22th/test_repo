<script setup>
import { storeToRefs } from 'pinia';
import AccountPanel from './components/AccountPanel.vue';
import AuthCard from './components/AuthCard.vue';
import LedgerMainContent from './components/LedgerMainContent.vue';
import AccountAddModal from './components/modals/AccountAddModal.vue';
import AccountAnalysisModal from './components/modals/AccountAnalysisModal.vue';
import CategoryEditModal from './components/modals/CategoryEditModal.vue';
import TransactionEditModal from './components/modals/TransactionEditModal.vue';
import { useAccountStore } from './stores/accountStore';
import { useTransactionStore } from './stores/transactionStore';
import { useUiStore } from './stores/uiStore';

// App은 화면 조립과 화면 전환만 담당한다.
const uiStore = useUiStore();
const transactionStore = useTransactionStore();
const accountStore = useAccountStore();

const {
  activeScreen,
  showAccountAddModal,
  showAccountAnalysisModal,
  showTransactionEditModal,
  showCategoryEditModal
} = storeToRefs(uiStore);

const {
  draftFilters,
  filteredTransactions,
  accountOptions,
  categoryOptions,
  totalIncome,
  totalExpense,
  totalBalance
} = storeToRefs(transactionStore);
const { accounts, totalBalanceAmount, totalAccounts, accountShareRows } = storeToRefs(accountStore);

const screenTabs = [
  { id: 'login', label: '로그인' },
  { id: 'signup', label: '회원가입' },
  { id: 'ledger', label: '거래내역' }
];

const setScreen = (screen) => {
  uiStore.setActiveScreen(screen);
};

const updateFilter = ({ key, value }) => {
  transactionStore.setDraftFilter(key, value);
};

const applyFilters = () => {
  transactionStore.applyFilters();
};

const resetFilters = () => {
  transactionStore.resetFilters();
};

const exportTransactionsCsv = () => {
  const rows = filteredTransactions.value;

  if (rows.length === 0) {
    window.alert('내보낼 거래 내역이 없습니다.');
    return;
  }

  const escapeCell = (value) => {
    const text = String(value ?? '');
    return `"${text.replace(/"/g, '""')}"`;
  };

  const headers = ['날짜', '유형', '카테고리', '계좌', '메모', '금액'];
  const dataRows = rows.map((item) => [
    item.date,
    item.amount >= 0 ? '수입' : '지출',
    item.category,
    item.account,
    item.memo,
    item.amount
  ]);

  const csv = [headers, ...dataRows]
    .map((row) => row.map(escapeCell).join(','))
    .join('\n');

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const now = new Date();
  const yyyymmdd = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('');

  link.href = url;
  link.download = `transactions_${yyyymmdd}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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
          v-for="screen in screenTabs"
          :key="screen.id"
          type="button"
          class="screen-tab"
          :class="{ active: activeScreen === screen.id }"
          @click="setScreen(screen.id)"
        >
          {{ screen.label }}
        </button>
      </section>

      <section v-if="activeScreen === 'login'" class="auth-stage">
        <AuthCard mode="login" @navigate="setScreen" />
      </section>

      <section v-else-if="activeScreen === 'signup'" class="auth-stage">
        <AuthCard mode="signup" @navigate="setScreen" />
      </section>

      <section v-else class="ledger-stage starwars-ledger">
        <div class="ledger-layout">
          <AccountPanel
            :accounts="accounts"
            @open-account-analysis="uiStore.openAccountAnalysisModal"
            @open-account-add="uiStore.openAccountAddModal"
          />

          <LedgerMainContent
            :transactions="filteredTransactions"
            :filters="draftFilters"
            :account-options="accountOptions"
            :category-options="categoryOptions"
            :total-income="totalIncome"
            :total-expense="totalExpense"
            :total-balance="totalBalance"
            :format-currency="transactionStore.formatCurrency"
            @open-category-edit="uiStore.openCategoryEditModal"
            @open-transaction-edit="uiStore.openTransactionEditModal"
            @update-filter="updateFilter"
            @apply-filters="applyFilters"
            @reset-filters="resetFilters"
            @export-csv="exportTransactionsCsv"
          />
        </div>
      </section>
    </main>

    <AccountAddModal v-if="showAccountAddModal" @close="uiStore.closeAccountAddModal" />

    <AccountAnalysisModal
      v-if="showAccountAnalysisModal"
      :total-balance-amount="totalBalanceAmount"
      :total-accounts="totalAccounts"
      :account-share-rows="accountShareRows"
      @close="uiStore.closeAccountAnalysisModal"
    />

    <TransactionEditModal
      v-if="showTransactionEditModal"
      @close="uiStore.closeTransactionEditModal"
    />

    <CategoryEditModal
      v-if="showCategoryEditModal"
      @close="uiStore.closeCategoryEditModal"
    />
  </div>
</template>
