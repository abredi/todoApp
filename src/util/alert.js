import { cleanModal, displayInModal, TailwindButtonClass } from "./helpers";
const alertModal = () => {
  const present = (content) => {
    const acceptBtn = document.createElement("button");
    const rejectBtn = document.createElement("button");
    const card = document.createElement("div");
    const heading = document.createElement("h2");
    const cardFooter = document.createElement("div");
    card.classList.add('w-full');
    heading.classList.add("text-gray-700", "font-hairline", "text-xl");
    cardFooter.classList.add("flex", "justify-between", 'mt-4');
    heading.innerText = content.message || 'Confirm Delete?';
    const BTN_CLASS = [
      "px-4",
      "py-2",
      "rounded-sm",
      "text-md",
      "mr-4"
    ];
    rejectBtn.classList.add(...TailwindButtonClass, 'w-8');
    acceptBtn.classList.add(...BTN_CLASS, "text-red-500");
    acceptBtn.innerText = content.okBtn || "Accept";
    rejectBtn.innerText = content.rejectBtn || "Reject";
    const okCb = content.handleOk.bind(content.handleOk, content.data);
    acceptBtn.addEventListener("click", okCb);

    rejectBtn.addEventListener("click", content.handleCancel);

    card.appendChild(heading);
    card.appendChild(cardFooter);
    cardFooter.appendChild(rejectBtn);
    cardFooter.appendChild(acceptBtn);
    card.appendChild(cardFooter);

    displayInModal(card);
  };

  const dismiss = () => {
    cleanModal();
  };

  return { present, dismiss };
};



export { alertModal };
