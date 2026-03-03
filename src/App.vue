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

const { transactions, totalIncome, totalExpense, totalBalance } = storeToRefs(transactionStore);
const { accounts, totalBalanceAmount, totalAccounts, accountShareRows } = storeToRefs(accountStore);

const setScreen = (screen) => {
  uiStore.setActiveScreen(screen);
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
          @click="setScreen(screen)"
        >
          {{ screen === 'login' ? '로그인' : screen === 'signup' ? '회원가입' : '거래내역' }}
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
            :transactions="transactions"
            :total-income="totalIncome"
            :total-expense="totalExpense"
            :total-balance="totalBalance"
            :format-currency="transactionStore.formatCurrency"
            @open-category-edit="uiStore.openCategoryEditModal"
            @open-transaction-edit="uiStore.openTransactionEditModal"
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
