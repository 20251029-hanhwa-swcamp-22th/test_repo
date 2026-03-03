<script setup>
defineProps({
  totalBalanceAmount: {
    type: Number,
    required: true
  },
  totalAccounts: {
    type: Number,
    required: true
  },
  accountShareRows: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close']);

const formatWon = (value) => `${value.toLocaleString('ko-KR')}₩`;
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <section class="modal-card medium">
      <div class="modal-title-row">
        <h3>계좌 비중 분석</h3>
        <button type="button" class="icon-close" @click="emit('close')">✕</button>
      </div>
      <p class="analysis-total">
        총 잔액:
        <strong>{{ formatWon(totalBalanceAmount) }}</strong>
        <span>({{ totalAccounts }}개 계좌)</span>
      </p>
      <div class="donut-wrap">
        <div class="donut-chart"></div>
      </div>
      <div
        v-for="(row, index) in accountShareRows"
        :key="`${row.name}-${index}`"
        class="analysis-row"
      >
        <span class="dot"></span>
        <span>{{ row.name }}</span>
        <strong>{{ formatWon(row.balance) }}</strong>
        <span>{{ row.share.toFixed(1) }}%</span>
      </div>
    </section>
  </div>
</template>
