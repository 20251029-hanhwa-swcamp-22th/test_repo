import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles.css';

// 앱 전역 상태(Pinia)를 등록한 뒤 루트 컴포넌트를 마운트한다.
const app = createApp(App);

app.use(createPinia());
app.mount('#app');
