import { getData } from "/src/utils/common/fetchFunctions.js";
import { createElement } from "/src/components/createElement.js";

// map for directory of icon
const resRelDir = "/src/res"
const uploadIconDirMap = {
    enable: `${resRelDir}/uploadIconEnabled.svg`,
    disable: `${resRelDir}/uploadIconDisabled.svg`,
    wating: `${resRelDir}/stopIcon.svg`,
}

// url for request to AI.
const rootUrl = "http://127.0.0.1:8080";
const aiUrl = `${rootUrl}/chat/query`;

class ConversationCard extends HTMLElement{
    setLatestQuery(latestTextElement){
        // check parameter's integrity
        if(latestTextElement != undefined){
            console.log(latestTextElement);
            // upcount
            this.queryCount++;
            // scroll to display new element.
            latestTextElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    revertLatestQuery(){
        // check query count is over 0
        if(this.queryCount > 0){
            this.queryCount--;
            this.conversationOnlyContainer.lastElementChild.remove();
        }
    }

    addText(from, msg){
        // check validation of 'from' param.
        const fromList = ["ai", "user"];
        if(fromList.includes(from)){
            // parse markdown
            const processedMsg = from == "ai" ? marked.parse(msg) : msg;
            
            // create container which includes divide line(hr) and text element.
            const textElementContainer = createElement("div", {
                class: "textElementContainer"
            });
            
            // create divide line
            if(this.queryCount > 0){
                const hr = createElement("hr", {
                    class: "conversation-divline"
                });
                textElementContainer.appendChild(hr);
            }
            
            // create text element
            const textElement = createElement("conversation-text", {
                type: from,
                msg: processedMsg
            });
            textElementContainer.appendChild(textElement);
            
            // append in container
            this.conversationOnlyContainer.appendChild(textElementContainer);
            // update latest query. this function will scroll to show new text element on top.
            this.setLatestQuery(textElementContainer);

            // console.log(textElement.querySelectorAll("pre code"));

            const statusModal = document.getElementById("statusModal");
            textElement.querySelectorAll("pre code")?.forEach((codeElem)=>{
                // apply syntax highlight
                hljs.highlightElement(codeElem);        // from highligh.js
                // extract language name from class of 'code' tag.
                const langName = codeElem.getAttribute("class").split(" ")[0].split("-")[1];
                // create & append name tag
                const langNameElement = createElement("language-name-tag", 
                    {
                        language: langName,
                        copyTarget: codeElem.innerText
                    });
                codeElem.parentElement.insertBefore(langNameElement, codeElem);
                // copy code when user click the code area.
                codeElem.addEventListener("click", (e)=>{
                    navigator.clipboard.writeText(e.target.innerText);
                    statusModal.innerHTML = e.target.innerText;
                });// TODO: 이거 잘못 누르면 단어만 복사 됨 이렇게 하지말고 그냥 오른쪽 위에 복사 아이콘 띄워주고 복사 시키는게 나을듯 ㅇㅇ..
            });
        }
    }

    changeConversationStatus(status){
        const statusList = ["enable", "wating", "error"];

        this.conversationStatus = status;

        console.log(status);
        switch(status){
            case "enable":
                this.watingResponse = false;
                this.statusText.setAttribute("status", "none");
                this.inputButton.setAttribute("src", uploadIconDirMap["enable"]);
                break;
            case "wating":
                this.watingResponse = true;
                this.statusText.setAttribute("status", status);
                this.inputButton.setAttribute("src", uploadIconDirMap["wating"]); 
                break;
            case "error":
                this.watingResponse = false;
                this.statusText.setAttribute("status", status);
                this.inputButton.setAttribute("src", uploadIconDirMap["enable"]);
                break;
            default:
                console.log("status doesn't match.");
                break;
        }
    }

    setInputFieldIsEmpty(inputFieldIsEmpty){
        this.inputFieldIsEmpty = inputFieldIsEmpty;
        // update input button state.
        if(this.inputButton != undefined){
            const state = inputFieldIsEmpty ? "disable" : "enable";
            this.inputButton.setAttribute("src", uploadIconDirMap[state]);
        }
    }

    connectedCallback(){
        // Init
        this.queryCount = 0;
        this.watingResponse = false;
        // Set class of root element.
        this.setAttribute("class", "conversation-card extend-event");
        
        // create components
        // title display
        const titleContainer = createElement("div", {
            class: "conversation-card card-title"
        }, this.getAttribute("title"));
        this.appendChild(titleContainer);
        
        // container for main content. this container includes 'text-only container' and 'status text'.
        const conversationContainer = createElement("div", {
            class: "conversation-container"
        });
        
        // container for text component.
        this.conversationOnlyContainer = createElement("div");
        conversationContainer.appendChild(this.conversationOnlyContainer);   // append in conversation container
        
        // set 'hyperModal' hide event
        const hyperModalElem = document.getElementById("hyperModal");
        conversationContainer.addEventListener("scroll", ()=>{
            hyperModalElem.setAttribute("enable", false);
        });
        
        // element to show the state of AI response(wating, error).
        this.statusText = createElement("conversation-status-text", {
            class: "conversation-status-text"
        });
        conversationContainer.appendChild(this.statusText);                  // append in conversation container
        
        this.appendChild(conversationContainer);                        // append conversation container in main component
        
        // container for user input field.
        const inputContainer = createElement("div", {
            class: "chat-container"
        });
        // input field
        this.inputField = createElement("textarea", {
            class: "input-field",
            placeholder: "ask something...",
            resize: "false"
        });
        this.inputField.addEventListener("input", (e)=>{
            this.setInputFieldIsEmpty(e.target.value == "");
        });
        
        // img button to send user's input to the server.
        this.inputButton = createElement("img-button", {
            src: uploadIconDirMap["enable"],
            class: "send-chat-button",
        });
        // set init state of input components.
        this.setInputFieldIsEmpty(true);
        
        // Keyboard event in inputfield.
        const sendQueryEvent = async ()=>{
            // Check the conversation is wating
            if(!this.watingResponse){
                // remove previous chat if prev status is 'error'.
                if(this.conversationStatus == "error"){
                    this.revertLatestQuery();
                }

                
                // get user's query from input field.
                const userMsg = this.inputField.value;
                // Check user message isn't empty.
                if(userMsg != ""){
                    // Clear input field.
                    this.inputField.value = "";
                    
                    // set conversation status as 'wating'.
                    this.changeConversationStatus("wating");    // this function will change the image of input button to 'stop' icon.
                    
                    // Create & append text element in conversation container.
                    this.addText("user", userMsg);          // divide line(hr) will be added automatically.
                    // Send the query and get response.
                    const response = await getData(aiUrl, {msg: userMsg});
                    if(response.ok){
                        // parse the response.
                        const data = await response.json();
                        // Create & append element which includes response text.
                        this.addText("ai", data.msg);
                        // release the wating state.
                        this.changeConversationStatus("enable");
                    }
                    else{
                        this.changeConversationStatus("error");
                    }
                    this.setInputFieldIsEmpty(true);            // this function will change the image of input button to 'disable' icon.
                }
            }
        }

        this.inputField.addEventListener("keydown", async (e) => {
            if(e.key == "Enter" && !e.shiftKey){
                // Enter: send query to AI model.
                if(!e.shiftKey){
                    e.preventDefault();
                    await sendQueryEvent();
                }
            }
        });

        inputContainer.appendChild(this.inputField);
        
        // TODO: attach the seperated function same as keydown event of input field.
        this.inputButton.addEventListener("click", async () => {
            if(!this.watingResponse){
                await sendQueryEvent();
            }
            else{
                console.log("TODO: pause");
            }
        });
        inputContainer.appendChild(this.inputButton);

        this.appendChild(inputContainer);
    }
}

export default ConversationCard;