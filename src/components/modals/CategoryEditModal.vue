<script setup>
const emit = defineEmits(['close']);
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <section class="modal-card category">
      <div class="modal-title-row">
        <h3>카테고리 수정</h3>
        <button type="button" class="icon-close" @click="emit('close')">✕</button>
      </div>
      <div class="edit-grid category-grid">
        <label>유형<select><option>지출</option><option>수입</option></select></label>
        <label>카테고리명<input type="text" placeholder="예: 식비, 월급" /></label>
      </div>
      <div class="modal-actions right">
        <button type="button" class="line" @click="emit('close')">취소</button>
        <button type="button" class="primary-button">저장</button>
      </div>
    </section>
  </div>
</template>
