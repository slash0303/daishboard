import { createElement } from "../../createElement.js";

class ImgButton extends HTMLElement{
    connectedCallback(){
        // check style attribute is vailidate
        let style = this.getAttribute("style");
        if(style == null || style == undefined){
            style = "";
        }
        this.setAttribute("style", style + "display: inline-flex;");
        // create img element
        this.img = createElement("img", {
            src: this.getAttribute("src"),
            style: "width: 100%; height: 100%;"
        });
        this.appendChild(this.img);
    }

    static observedAttributes = ["src"];
    attributeChangedCallback(){
        const src = this.getAttribute("src");
        if(this.img != undefined){
            this.img.setAttribute("src", src);
        }
    }
}

customElements.define("img-button", ImgButton);