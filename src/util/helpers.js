export const cleanModal = () => {
  const modal = document.querySelector('.modal');
  while (modal.childElementCount > 0) {
    modal.removeChild(modal.firstElementChild)
  }
  return modal;
};