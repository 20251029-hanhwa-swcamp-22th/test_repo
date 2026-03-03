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

const formatCurrency = (value, withSign = false) => {
  const abs = Math.abs(value).toLocaleString('ko-KR');

  if (withSign) {
    return `${value >= 0 ? '+' : '-'}${abs}원`;
  }

  return `${abs}원`;
};

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref(seedTransactions);

  const totalIncome = computed(() =>
    transactions.value
      .filter((item) => item.amount > 0)
      .reduce((sum, item) => sum + item.amount, 0)
  );

  const totalExpense = computed(() =>
    Math.abs(
      transactions.value
        .filter((item) => item.amount < 0)
        .reduce((sum, item) => sum + item.amount, 0)
    )
  );

  const totalBalance = computed(() => totalIncome.value - totalExpense.value);

  return {
    transactions,
    totalIncome,
    totalExpense,
    totalBalance,
    formatCurrency
  };
});
