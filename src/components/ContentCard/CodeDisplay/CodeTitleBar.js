import { createElement } from "/src/components/createElement.js";

const copyButtonImgMap = {
    copy: "/src/res/copyIconBlack2x.png",
    check: "/src/res/checkIconBlack2x.png"
}

class CodeTitleBar extends HTMLElement {
    connectedCallback(){
        // set class of this element.
        this.setAttribute("class", "code-title-bar");
        // create & append name tag element
        const languageName = this.getAttribute("language");
        const languageNameTagElem = createElement("div", {
            class: "code-title-bar__language-name-tag"
        }, languageName);
        this.appendChild(languageNameTagElem);
        // create & append copy button element
        const copyButtonContainerElem = createElement("div", {
            class: "code-title-bar__copy-button-container"
        });
        const copyButtonTextElem = createElement("div", {
            class: "copy-button-container__copy-text"
        }, "copy");
        copyButtonContainerElem.appendChild(copyButtonTextElem);
        const copyButtonElem = createElement("img-button", {
            src: copyButtonImgMap["copy"],
            class: "copy-button-container__copy-button"
        });
        copyButtonContainerElem.appendChild(copyButtonElem);
        this.appendChild(copyButtonContainerElem);

        copyButtonContainerElem.addEventListener("click", (e)=>{
            const codeText = this.getAttribute("copyTarget");
            navigator.clipboard.writeText(codeText);
            copyButtonElem.setAttribute("src", copyButtonImgMap["check"]);
            copyButtonTextElem.innerHTML = "copied!"
            setTimeout(() => {
                copyButtonTextElem.innerHTML = "copy";
                copyButtonElem.setAttribute("src", copyButtonImgMap["copy"]);
            }, 1000);
        });
    }
}

export default CodeTitleBar;