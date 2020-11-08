import { cleanModal, displayOnModal } from "./helpers";
const alertModal = () => {
  const present = (content) => {
    const acceptBtn = document.createElement("button");
    const rejectBtn = document.createElement("button");
    const card = document.createElement("div");
    acceptBtn.innerText = "Accept";
    rejectBtn.innerText = "Reject";
    const okCb = content.handleOk.bind(content.handleOk, content.data);
    acceptBtn.addEventListener("click", okCb);

    rejectBtn.addEventListener("click", content.handleCancel);

    card.appendChild(acceptBtn);
    card.appendChild(rejectBtn);

    displayOnModal(card);
  };

  const dismiss = () => {
    cleanModal();
  };

  return { present, dismiss };
};



export { alertModal };
