import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', () => {
  const activeScreen = ref('ledger');
  const showAccountAddModal = ref(false);
  const showAccountAnalysisModal = ref(false);
  const showTransactionEditModal = ref(false);
  const showCategoryEditModal = ref(false);

  const setActiveScreen = (screen) => {
    activeScreen.value = screen;
  };

  const openAccountAddModal = () => {
    showAccountAddModal.value = true;
  };

  const closeAccountAddModal = () => {
    showAccountAddModal.value = false;
  };

  const openAccountAnalysisModal = () => {
    showAccountAnalysisModal.value = true;
  };

  const closeAccountAnalysisModal = () => {
    showAccountAnalysisModal.value = false;
  };

  const openTransactionEditModal = () => {
    showTransactionEditModal.value = true;
  };

  const closeTransactionEditModal = () => {
    showTransactionEditModal.value = false;
  };

  const openCategoryEditModal = () => {
    showCategoryEditModal.value = true;
  };

  const closeCategoryEditModal = () => {
    showCategoryEditModal.value = false;
  };

  return {
    activeScreen,
    showAccountAddModal,
    showAccountAnalysisModal,
    showTransactionEditModal,
    showCategoryEditModal,
    setActiveScreen,
    openAccountAddModal,
    closeAccountAddModal,
    openAccountAnalysisModal,
    closeAccountAnalysisModal,
    openTransactionEditModal,
    closeTransactionEditModal,
    openCategoryEditModal,
    closeCategoryEditModal
  };
});
