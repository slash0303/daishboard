import { getData } from "../../../scripts/common/fetchFunctions.js";
import { createElement } from "../../createElement.js";

class ConversationCard extends HTMLElement{
    updateLatestQuery(latestTextElement){
        // check parameter's integrity
        if(latestTextElement != undefined){
            // upcount
            this.queryCount++;
            // scroll to display new element.
            latestTextElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
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

        const conversationOnlyContainer = createElement("div");
        conversationContainer.appendChild(conversationOnlyContainer);

        const statusText = createElement("conversation-status-text", {
            class: "conversation-status-text"
        });
        conversationContainer.appendChild(statusText);
        
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
                        statusText.setAttribute("status", "wating");
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
                                conversationOnlyContainer.appendChild(hr);
                            }

                            // Create & append text element in conversation container.
                            const userText = createElement("conversation-text", {
                                type: "user",
                                msg: userMsg 
                            });
                            conversationOnlyContainer.appendChild(userText);

                            this.updateLatestQuery(userText);
                            
                            // Send the query and get response.
                            const response = await getData("http://127.0.0.1:8080/chat/query", {msg: userMsg});
                            if(response.ok){
                                const data = await response.json();
                                
                                // Create the div in front of response text element.
                                const hr = createElement("hr", {
                                    class: "conversation-divline"
                                });
                                conversationOnlyContainer.appendChild(hr);
        
                                // Create & append element which includes response text.
                                const aiText = createElement("conversation-text", {
                                    class: "ai",
                                    msg: data.msg
                                });
                                conversationOnlyContainer.appendChild(aiText);
                                this.updateLatestQuery(aiText);
                            }
                            // release the wating state.
                            this.watingResponse = false;
                            statusText.setAttribute("status", "none");
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