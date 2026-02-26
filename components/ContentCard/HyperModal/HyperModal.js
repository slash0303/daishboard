import { createElement } from "../../createElement.js";

class HyperModal extends HTMLElement{
    getMemoText(){
        return `'${this.keyword}'를 주제로 새 메모 작성하기`
    }

    getConversationText(){
        return `'${this.keyword}'를 주제로 새 대화 시작하기`;
    }

    connectedCallback(){
        const className = this.getAttribute("class") ?? "";
        this.setAttribute("class", `hypermodal-container ${className}`);

        const memoBtn = createElement("button", {
            class: "hypermodal-btn",
            id: "memoBtn"
        });
        memoBtn.addEventListener("click", ()=>{
            createNewCard("memo");      // TODO: create new function
        });
        this.appendChild(memoBtn);

        const conversationBtn = createElement("button", {
            class: "hypermodal-btn",
            id: "conversationBtn"
        });
        conversationBtn.addEventListener("click", ()=>{
            createNewCard("conversation");  // TODO: create new function
        });
        this.appendChild(conversationBtn);
    }

    static observedAttributes = ["top", "left", "enable"];

    attributeChangedCallback(){
        this.enable = this.getAttribute("enable");
        if(this.enable == "true"){
            this.keyword = this.getAttribute("keyword");

            this.top = this.getAttribute("top");
            this.left = this.getAttribute("left");

            this.setAttribute("style", `display: flex; top: ${this.top}px; left: ${this.left}px;`);
    
            // update description sentence with keyword.
            this.childNodes.forEach((node)=>{
                if(node.getAttribute("id") == "memoBtn"){
                    node.innerHTML = this.getMemoText();
                }
                else if(node.getAttribute("id") == "conversationBtn"){
                    node.innerHTML = this.getConversationText();
                }
            });
        }
        else{
            this.setAttribute("style", "display: none;");
        }

    }
}

export { HyperModal };