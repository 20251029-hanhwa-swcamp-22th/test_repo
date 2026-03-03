<script setup>
const emit = defineEmits(['close']);
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <section class="modal-card large">
      <div class="modal-title-row">
        <h3>거래 수정</h3>
        <button type="button" class="icon-close" @click="emit('close')">✕</button>
      </div>
      <div class="edit-grid">
        <label>유형<select><option>지출</option><option>수입</option></select></label>
        <label>카테고리<select><option>CAFE</option></select></label>
        <label>계좌<select><option>미지정</option></select></label>
        <label>날짜<input type="date" value="2026-02-25" /></label>
        <label>금액<input type="number" placeholder="금액" /></label>
        <label>메모<input type="text" placeholder="메모 (선택)" /></label>
      </div>
      <div class="modal-actions right">
        <button type="button" class="line" @click="emit('close')">취소</button>
        <button type="button" class="primary-button">저장</button>
      </div>
    </section>
  </div>
</template>
