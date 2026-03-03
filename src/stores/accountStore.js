import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const seedAccounts = [
  {
    name: '기업은행',
    balance: 100160650
  }
];

export const useAccountStore = defineStore('account', () => {
  const accounts = ref(seedAccounts);

  const totalBalanceAmount = computed(() =>
    accounts.value.reduce((sum, account) => sum + account.balance, 0)
  );

  const totalAccounts = computed(() => accounts.value.length);

  const accountShareRows = computed(() => {
    const total = totalBalanceAmount.value;

    return accounts.value.map((account) => ({
      ...account,
      share: total === 0 ? 0 : (account.balance / total) * 100
    }));
  });

  return {
    accounts,
    totalBalanceAmount,
    totalAccounts,
    accountShareRows
  };
});
