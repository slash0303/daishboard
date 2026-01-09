import { createElement } from "../../createElement.js";

class ConversationCard extends HTMLElement{
    connectedCallback(){
        this.setAttribute("class", "conversation-card");

        const titleContainer = createElement("div", {
            class: "conversation-card card-title"
        }, this.getAttribute("title"));
        this.appendChild(titleContainer);

        const conversationContainer = createElement("div", {
            class: "conversation-container"
        });
        this.appendChild(conversationContainer);

        const inputContainer = createElement("div", {
            class: "chat-container"
        });

        const inputField = createElement("textarea", {
            class: "input-field",
            placeholder: "ask something",
            resize: "false"
        });
        inputContainer.appendChild(inputField);
        
        const inputButton = createElement("img-button", {
            src: "../../../res/uploadIcon.svg",
            class: "send-chat-button",
        });
        inputContainer.appendChild(inputButton);

        this.appendChild(inputContainer);

    }
}

export default ConversationCard;