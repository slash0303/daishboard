import { createElement } from "/src/components/createElement.js";

class MemoCard extends HTMLElement{
    connectedCallback(){
        let className = this.getAttribute("class");
        if(className == null){
            className = "";
        }
        this.setAttribute("class", `memo-card card ${className} extend-event`);

        const MemoTitle = this.getAttribute("title");
        const MemoTitleElem = createElement("div",
            {
                class: "memo-text title"
            }, MemoTitle);
        this.appendChild(MemoTitleElem);

        const MemoContent = this.getAttribute("content");
        const MemoContentElem = createElement("div",
            {
                class: "memo-text content"
            }, MemoContent);
        this.appendChild(MemoContentElem);
    }
}

export { MemoCard };