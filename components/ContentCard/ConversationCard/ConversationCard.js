import { getData } from "../../../scripts/common/fetchFunctions.js";
import { createElement } from "../../createElement.js";

class ConversationCard extends HTMLElement{
    set watingResponse(state){
        this.watingResponse;
        // TODO: Change img of upload button of input field
    }

    connectedCallback(){
        // Init
        this.queryCount = 0;
        this.watingResponse = false;
        // Set class of root element.
        this.setAttribute("class", "conversation-card extend-event");

        // create containers
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
        // Keyboard event in inputfield.
        // TODO: Should seperate this function to another files.
        inputField.addEventListener("keydown", async (e)=>{
            if(e.key == "Enter" && !e.shiftKey){
                // Enter: send query to AI model.
                if(!e.shiftKey){
                    e.preventDefault();
                    // Check the conversation is wating
                    if(!this.watingResponse){
                        // Set wating state to true.
                        this.watingResponse = true;
                        const userMsg = e.target.value;
        
                        // Check user message isn't empty.
                        if(userMsg != ""){
                            // Clear input field.
                            e.target.value = "";
        
                            // Add hr(div line) when the query count isn't zero.
                            if(this.queryCount != 0){
                                const hr = createElement("hr", {
                                    class: "conversation-divline"
                                });
                                conversationContainer.appendChild(hr);
                            }
                            // Add query count.
                            this.queryCount++;
                            // Create & append text element in conversation container.
                            const userText = createElement("conversation-text", {
                                type: "user",
                                msg: userMsg 
                            });
                            conversationContainer.appendChild(userText);
                            
                            // Send the query and get response.
                            const response = await getData("http://127.0.0.1:8080/chat/query", {msg: userMsg});
                            if(response.ok){
                                const data = await response.json();
                                
                                // Create the div in front of response text element.
                                const hr = createElement("hr", {
                                    class: "conversation-divline"
                                });
                                conversationContainer.appendChild(hr);
        
                                // Create & append element which includes response text.
                                const aiText = createElement("conversation-text", {
                                    class: "ai",
                                    msg: data.msg
                                });
                                conversationContainer.appendChild(aiText);
                            }
                            // release the wating state.
                            this.watingResponse = false;
                        }
                    }
                }
            }
        });

        inputContainer.appendChild(inputField);
        
        // Set Image of send button
        const inputButton = createElement("img-button", {
            src: "../../../res/uploadIconEnabled.svg",
            class: "send-chat-button",
        });
        // TODO: attach the seperated function same as keydown event of input field.
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