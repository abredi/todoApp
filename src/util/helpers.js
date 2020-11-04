const cleanModal = () => {
  const modal = document.getElementById("modalStation");
  while (modal.childElementCount > 0) {
    modal.removeChild(modal.firstElementChild);
  }
  return modal;
};

const TailwindButtonClass = `inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-red sm:text-sm sm:leading-5`.split(' ');

export {cleanModal, TailwindButtonClass}

