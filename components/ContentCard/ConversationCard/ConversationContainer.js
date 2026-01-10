class ConversationContainer extends HTMLElement{
    connectedCallback(){
        this.setAttribute("class", "conversation-container");
    }
}

class ConversationText extends HTMLElement{
    connectedCallback(){
        const text = this.getAttribute("text");
        const from = this.getAttribute("from");

        const FROM_TYPE = {"user": true, "ai": true};

        if(FROM_TYPE[from]){
            this.setAttribute("class", "text " + from);
            this.innerHTML = text;
        }
        else{

        }
    }
}

export { ConversationContainer, ConversationText };