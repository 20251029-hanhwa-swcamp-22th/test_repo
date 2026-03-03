<script setup>
const emit = defineEmits(['close']);
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <section class="modal-card small">
      <h3>계좌 추가</h3>
      <label>
        계좌명
        <input type="text" placeholder="예: 국민은행 통장" />
      </label>
      <label>
        잔액
        <input type="number" placeholder="0" />
      </label>
      <div class="modal-actions">
        <button type="button" class="line" @click="emit('close')">취소</button>
        <button type="button" class="primary-button">추가</button>
      </div>
    </section>
  </div>
</template>
