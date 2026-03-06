import { createElement } from "../../createElement.js";
import { getTimestamp } from "../../../scripts/common/timeFunctions.js";

class ConversationText extends HTMLElement{
    connectedCallback(){
        const textType = this.getAttribute("type");
        const timeText = getTimestamp();
        const timeIndicator = createElement("div", {
            class: `text time ${textType}`
        }, timeText);

        this.appendChild(timeIndicator);

        const otherClass = this.getAttribute("class");
        const msg = this.getAttribute("msg");
        const text = createElement("div", {
            class: `text ${textType} ${otherClass}`
        }, msg);
        
        this.appendChild(text);
    }

    static observed
}

export { ConversationText };