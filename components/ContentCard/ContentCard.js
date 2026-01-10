import { createElement } from "../createElement.js";
import ConversationCard from "./ConversationCard/ConversationCard.js";
import { ConversationContainer, ConversationText } from "./ConversationCard/ConversationContainer.js";


class ContentCard extends HTMLElement{
    connectedCallback(){
        const CARD_TYPE = {"conversation": true, "note": true};
        // set id & class.
        if(this.getAttribute("id") == null){
            this.setAttribute("id", this.getAttribute("title"));
        }
        this.setAttribute("class", "card");
        
        // get 'card type' prop and create content of the card.
        let cardType = this.getAttribute("cardType");
        if(CARD_TYPE[cardType]){
            let content = null;
            switch(cardType){
                case "conversation":
                    // create conversation type content. set title as a default value.
                    content = createElement(cardType+"-card", {
                        title: "new conversation"
                    });
                    break;

                case "note":
                    // create note type content.
                    content = createElement(cardType+"-card", {
                        title: this.getAttribute("title"),
                        text: this.getAttribute("text")
                    });
                    break;
            }
            if(content != null){
                this.appendChild(content);
            }
            else{
                throw Error("An error occured while create the content of the card.");
            }
        }
        else{
            throw Error("Card type mismatch.");
        }
    }
}

customElements.define("conversation-text", ConversationText, {extends: "div"});
customElements.define("conversation-container", ConversationContainer, {extends: "div"});
customElements.define("conversation-card", ConversationCard, {extends: "div"});
customElements.define("content-card", ContentCard, {extends: "div"});