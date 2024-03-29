const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
//const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
//const PERSON_IMG = "https://www.flaticon.com/free-icon/boy_145867";
const BOT_NAME = "Footix";
const PERSON_NAME = "You";

msgerForm.addEventListener("submit", (event) => {
    console.log("clic sur le submit")
    event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";
  botResponse(msgText);
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
		<div class="msg ${side}-msg">
		  <div class="msg-img" style="background-image: url(${img})"></div>
		  <div class="msg-bubble">
		    <div class="msg-info">
		      <div class="msg-info-name">${name}</div>
		      <div class="msg-info-time">${formatDate(new Date())}</div>
		    </div>
		    <div class="msg-text">${text}</div>
		  </div>
		</div>
		`;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}
function botResponse(rawText) {
  // Bot Response
  console.log(rawText)
  $.post("/api/chat", { msg: rawText }).done(function (data) {
    console.log(rawText);
    console.log(data);
    const msgText = data;
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
  });
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}
