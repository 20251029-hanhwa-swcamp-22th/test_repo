<script setup>
import { computed } from 'vue';

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value) => ['login', 'signup'].includes(value)
  }
});

const emit = defineEmits(['navigate']);

const isLogin = computed(() => props.mode === 'login');
const title = computed(() => (isLogin.value ? '로그인' : '회원가입'));
const submitLabel = computed(() => (isLogin.value ? '로그인' : '회원가입'));
const helperText = computed(() =>
  isLogin.value ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'
);
const helperLinkText = computed(() =>
  isLogin.value ? '회원가입' : '로그인으로 이동'
);

const moveTo = () => {
  emit('navigate', isLogin.value ? 'signup' : 'login');
};
</script>

<template>
  <article class="auth-card" :class="{ signup: !isLogin }">
    <h1>{{ title }}</h1>

    <label v-if="!isLogin">이름</label>
    <input v-if="!isLogin" type="text" placeholder="이름을 입력하세요" />

    <label>이메일</label>
    <input type="email" placeholder="이메일을 입력하세요" />

    <label>비밀번호</label>
    <input type="password" placeholder="비밀번호를 입력하세요" />

    <template v-if="!isLogin">
      <label>비밀번호 확인</label>
      <input type="password" placeholder="비밀번호를 다시 입력하세요" />
    </template>

    <button type="button" class="primary-button">{{ submitLabel }}</button>

    <p class="auth-link-row">
      {{ helperText }}
      <a href="#" @click.prevent="moveTo">{{ helperLinkText }}</a>
    </p>
  </article>
</template>
