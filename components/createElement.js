/** return: created element */
const createElement = (tagName, props, innerHTML = null) => {
    const element = document.createElement(tagName);
    
    const propsKeys = Object.keys(props);

    propsKeys.forEach((key) => {
        element.setAttribute(key, props[key]);
    });

    element.innerHTML = innerHTML;

    return element;
}

export { createElement };