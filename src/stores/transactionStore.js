import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const seedTransactions = [
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
];

const defaultFilters = {
  dateFrom: '2026-02-01',
  dateTo: '2026-02-29',
  account: 'ALL',
  transactionType: 'ALL',
  category: 'ALL',
  memoKeyword: '',
  minAmount: '',
  maxAmount: ''
};

const formatCurrency = (value, withSign = false) => {
  const abs = Math.abs(value).toLocaleString('ko-KR');

  if (withSign) {
    return `${value >= 0 ? '+' : '-'}${abs}원`;
  }

  return `${abs}원`;
};

export const useTransactionStore = defineStore('transaction', () => {
  // 초기에는 시드 데이터로 렌더링하고, 이후 API 연동 지점으로 확장한다.
  const transactions = ref(seedTransactions);
  const draftFilters = ref({ ...defaultFilters });
  const appliedFilters = ref({ ...defaultFilters });

  const accountOptions = computed(() =>
    [...new Set(transactions.value.map((item) => item.account))]
  );

  const categoryOptions = computed(() =>
    [...new Set(transactions.value.map((item) => item.category))]
  );

  const normalizeNumber = (value) => {
    if (value === '' || value === null || value === undefined) {
      return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const filteredTransactions = computed(() => {
    const filters = appliedFilters.value;
    const memoKeyword = filters.memoKeyword.trim().toLowerCase();
    const minAmount = normalizeNumber(filters.minAmount);
    const maxAmount = normalizeNumber(filters.maxAmount);

    return transactions.value.filter((item) => {
      if (filters.dateFrom && item.date < filters.dateFrom) {
        return false;
      }

      if (filters.dateTo && item.date > filters.dateTo) {
        return false;
      }

      if (filters.account !== 'ALL' && item.account !== filters.account) {
        return false;
      }

      if (filters.category !== 'ALL' && item.category !== filters.category) {
        return false;
      }

      if (filters.transactionType === 'INCOME' && item.amount <= 0) {
        return false;
      }

      if (filters.transactionType === 'EXPENSE' && item.amount >= 0) {
        return false;
      }

      if (memoKeyword && !item.memo.toLowerCase().includes(memoKeyword)) {
        return false;
      }

      const amountAbs = Math.abs(item.amount);
      if (minAmount !== null && amountAbs < minAmount) {
        return false;
      }

      if (maxAmount !== null && amountAbs > maxAmount) {
        return false;
      }

      return true;
    });
  });

  const sumBySign = (isPositive) =>
    filteredTransactions.value
      .filter((item) => (isPositive ? item.amount > 0 : item.amount < 0))
      .reduce((sum, item) => sum + item.amount, 0);

  const totalIncome = computed(() => sumBySign(true));

  const totalExpense = computed(() => Math.abs(sumBySign(false)));

  const totalBalance = computed(() => totalIncome.value - totalExpense.value);

  const setDraftFilter = (key, value) => {
    if (!(key in draftFilters.value)) {
      return;
    }

    draftFilters.value[key] = value;
  };

  const applyFilters = () => {
    appliedFilters.value = {
      ...draftFilters.value,
      memoKeyword: draftFilters.value.memoKeyword.trim()
    };
  };

  const resetFilters = () => {
    draftFilters.value = { ...defaultFilters };
    appliedFilters.value = { ...defaultFilters };
  };

  return {
    transactions,
    draftFilters,
    filteredTransactions,
    accountOptions,
    categoryOptions,
    totalIncome,
    totalExpense,
    totalBalance,
    setDraftFilter,
    applyFilters,
    resetFilters,
    formatCurrency
  };
});
