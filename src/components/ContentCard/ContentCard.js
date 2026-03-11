import { createElement } from "/src/components/createElement.js";
import ConversationCard from "/src/components/ContentCard/ConversationCard/ConversationCard.js";
import { ConversationContainer } from "/src/components/ContentCard/ConversationCard/ConversationContainer.js";
import ConversationStatusText from "/src/components/ContentCard/ConversationCard/ConversationStatusText.js";
import { ConversationText } from "/src/components/ContentCard/ConversationCard/ConversationText.js";
import { HyperModal } from "/src/components/ContentCard/HyperModal/HyperModal.js";
import { MemoCard } from "/src/components/ContentCard/MemoCard/MemoCard.js";
import CodeTitleBar from "/src/components/ContentCard/CodeDisplay/CodeTitleBar.js";

class ContentCard extends HTMLElement{
    connectedCallback(){
        const CARD_TYPE = {"conversation": true, "memo": true};
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

                case "memo":
                    // create note type content.
                    content = createElement(cardType+"-card", {
                        title: this.getAttribute("title"),
                        content: this.getAttribute("content")
                    });
                    break;
            }
            console.log(content);
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
        this.addEventListener("mouseup", ()=>{
            const selection = document.getSelection();
            let selectedText = selection.toString();
            const hyperModalElem = document.getElementById("hyperModal");
            console.log(selectedText);
            if(selectedText != ""){
                hyperModalElem.setAttribute("enable", true);
                const selectedArea = selection.getRangeAt(0).getBoundingClientRect();
                
                // const hyperModalElemStyle = hyperModalElem.getAttribute("style") ?? "";

                console.log(typeof(selectedText));
                if(selectedText.length > 18){
                    selectedText = selectedText.slice(0, 15) + "...";
                }
                hyperModalElem.setAttribute("keyword", selectedText);
                hyperModalElem.setAttribute("top", selectedArea.bottom);
                hyperModalElem.setAttribute("left", selectedArea.right);
            }
            else{
                hyperModalElem.setAttribute("enable", false);
            }
        });
    }
}

customElements.define("language-name-tag", CodeTitleBar);
customElements.define("conversation-text", ConversationText);
customElements.define("conversation-container", ConversationContainer);
customElements.define("conversation-card", ConversationCard);
customElements.define("conversation-status-text", ConversationStatusText);
customElements.define("memo-card", MemoCard);
customElements.define("hyper-modal", HyperModal);
customElements.define("content-card", ContentCard);


class CurrentNoteInfo{
    constructor(noteId, focusedCard){
        this.noteId = noteId;
        this.focusedCard = focusedCard;
    }
}

export { CurrentNoteInfo };