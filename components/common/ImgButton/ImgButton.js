import { createElement } from "../../createElement.js";

class ImgButton extends HTMLElement{
    connectedCallback(){
        // check style attribute is vailidate
        let style = this.getAttribute("style") ?? "";
        this.setAttribute("style", style);
        const prevClass = this.getAttribute("class") ?? "";
        this.setAttribute("class", prevClass + " img-button-container");
        // create img element
        this.img = createElement("img", {
            src: this.getAttribute("src"),
            class: "img-button-img"
            // style: "width: 100%; height: 100%;"
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