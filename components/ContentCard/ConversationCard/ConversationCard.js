import { getData } from "../../../scripts/common/fetchFunctions.js";
import { createElement } from "../../createElement.js";

class ConversationCard extends HTMLElement{
    connectedCallback(){
        this.queryCount = 0;
        this.watingResponse = false;
        this.setAttribute("class", "conversation-card extend-event");

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
            placeholder: "ask something...",
            resize: "false"
        });
        inputField.addEventListener("keydown", async (e)=>{
            if(e.key == "Enter" && !e.shiftKey){
                e.preventDefault();
                if(!this.watingResponse){
                    this.watingResponse = true;
                    const userMsg = e.target.value;
    
                    if(userMsg != ""){
                        e.target.value = "";
    
                        if(this.queryCount != 0){
                            const hr = createElement("hr", {
                                class: "conversation-divline"
                            });
                            conversationContainer.appendChild(hr);
                        }
                        this.queryCount++;
                        const userText = createElement("conversation-text", {
                            type: "user",
                            msg: userMsg 
                        });
                        conversationContainer.appendChild(userText);
                        
                        const response = await getData("http://127.0.0.1:8080/chat/query", {msg: userMsg});
                        if(response.ok){
                            const data = await response.json();
                            
                            const hr = createElement("hr", {
                                class: "conversation-divline"
                            });
                            conversationContainer.appendChild(hr);
    
                            const aiText = createElement("conversation-text", {
                                class: "ai",
                                msg: data.msg
                            });
                            conversationContainer.appendChild(aiText);
                        }
                        this.watingResponse = false;
                    }
                }
            }
            else if(e.key == "Enter" && e.shiftKey){
                e.preventDefault();
                e.target.value += "\n";
            }
        });

        inputContainer.appendChild(inputField);
        
        const inputButton = createElement("img-button", {
            src: "../../../res/uploadIcon.svg",
            class: "send-chat-button",
        });
        inputButton.addEventListener("click", async (e)=>{
            if(!this.watingResponse){
                e.preventDefault();
                const userMsg = inputField.value;
                inputField.value = "";
                const response = await getData("http://127.0.0.1:8080/chat/query", {msg: userMsg});
                if(response.ok){
                    const data = await response.json();
                    // TODO: add response displaying feature.
                }
            }
        });
        inputContainer.appendChild(inputButton);

        this.appendChild(inputContainer);
    }
}

export default ConversationCard;