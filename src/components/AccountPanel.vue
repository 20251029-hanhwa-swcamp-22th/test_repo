<script setup>
defineProps({
  accounts: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['open-account-analysis', 'open-account-add']);

const formatWon = (value) => `${value.toLocaleString('ko-KR')}₩`;
</script>

<template>
  <aside class="account-panel">
    <h2>계좌 리스트</h2>

    <template v-if="accounts.length > 0">
      <div v-for="(account, index) in accounts" :key="`${account.name}-${index}`" class="account-card">
        <div class="account-head">
          <strong>{{ account.name }}</strong>
          <div class="inline-actions">
            <button type="button">수정</button>
            <button type="button" class="danger">삭제</button>
          </div>
        </div>
        <p>잔액 : {{ formatWon(account.balance) }}</p>
      </div>
    </template>
    <p v-else>등록된 계좌가 없습니다.</p>

    <div class="account-panel-actions">
      <button type="button" @click="emit('open-account-analysis')">계좌 분석</button>
      <button type="button" class="primary" @click="emit('open-account-add')">계좌 추가</button>
    </div>
  </aside>
</template>
