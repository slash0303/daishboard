import { createElement } from "../../createElement.js";

class ImgButton extends HTMLElement{
    connectedCallback(){
        let style = this.getAttribute("style");
        if(style == null || style == undefined){
            style = "";
        }
        this.setAttribute("style", style + "display: inline-flex;");
        const img = createElement("img", {
            src: this.getAttribute("src"),
            style: "width: 100%; height: 100%;"
        });
        this.appendChild(img);
    }
}

customElements.define("img-button", ImgButton);