import { createElement } from "../../createElement.js"

class ConversationStatusText extends HTMLElement {
    changeStatusText(status){
        const statusTextMap = {
            wating: "Wating response...",
            etc: "etc.",
            none: ""
        }

        // check integrity of status as a key.
        if(status in statusTextMap && this.statusTextElement != undefined){
            // change status text
            this.statusTextElement.innerHTML = statusTextMap[status];
            // change visibility
            if(status == "none"){
                this.setAttribute("style", "display: none");
            }
            else{
                this.setAttribute("style", "");
            }
        }
    }

    connectedCallback(){
        // init text element
        this.statusTextElement = createElement("div", {
            class: "status-text" 
        });
        this.changeStatusText("none");
        this.appendChild(this.statusTextElement);
    }

    // change statusText
    static observedAttributes = ["status"];
    attributeChangedCallback(){
        this.changeStatusText(this.getAttribute("status"));
    }
}

export default ConversationStatusText;