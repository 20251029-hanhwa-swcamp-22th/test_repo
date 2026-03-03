<script setup>
defineProps({
  transactions: {
    type: Array,
    default: () => []
  },
  formatCurrency: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(['edit-transaction']);
</script>

<template>
  <div class="transaction-list">
    <article v-if="transactions.length === 0" class="transaction-empty">
      조건에 맞는 거래 내역이 없습니다.
    </article>

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
        <button type="button" class="line tiny" @click="emit('edit-transaction')">수정</button>
        <button type="button" class="danger tiny">삭제</button>
      </div>
    </article>
  </div>
</template>
