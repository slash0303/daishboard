class ConversationContainer extends HTMLElement{
    connectedCallback(){
        this.setAttribute("class", "conversation-container");
    }
}

export { ConversationContainer };