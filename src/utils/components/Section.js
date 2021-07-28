class Section {
    constructor({ items, renderer }, contSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(contSelector);
    }

    renderCards = () => {
        this._items.forEach((item) => {
            this._card = this._renderer(item);
        })
    }

    appendItem = (card) => {
        this._container.append(card);
    }

    prependItem = (card) => {
        this._container.prepend(card);
    }
}
export default Section;