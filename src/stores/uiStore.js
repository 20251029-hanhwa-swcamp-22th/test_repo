import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', () => {
  // 전역 UI 상태(화면 전환/모달 열림 여부)를 관리한다.
  const activeScreen = ref('ledger');
  const showAccountAddModal = ref(false);
  const showAccountAnalysisModal = ref(false);
  const showTransactionEditModal = ref(false);
  const showCategoryEditModal = ref(false);

  const setModal = (modalRef, isOpen) => {
    modalRef.value = isOpen;
  };

  const setActiveScreen = (screen) => {
    activeScreen.value = screen;
  };

  const openAccountAddModal = () => {
    setModal(showAccountAddModal, true);
  };

  const closeAccountAddModal = () => {
    setModal(showAccountAddModal, false);
  };

  const openAccountAnalysisModal = () => {
    setModal(showAccountAnalysisModal, true);
  };

  const closeAccountAnalysisModal = () => {
    setModal(showAccountAnalysisModal, false);
  };

  const openTransactionEditModal = () => {
    setModal(showTransactionEditModal, true);
  };

  const closeTransactionEditModal = () => {
    setModal(showTransactionEditModal, false);
  };

  const openCategoryEditModal = () => {
    setModal(showCategoryEditModal, true);
  };

  const closeCategoryEditModal = () => {
    setModal(showCategoryEditModal, false);
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
