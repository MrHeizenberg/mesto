class Section {
    constructor({ items, renderer }, contSelector) {
        this._items = items;
        console.log(items)
        this._renderer = renderer;
        this._container = document.querySelector(contSelector);
    }

    getCard = () => {
        this._items.forEach((item) => {
            this._card = this._renderer(item);
            this._addItem(this._card);
        })
    }

    _addItem = (card) => {
        this._container.append(card);
    }

    addItemFromForm = (card) => {
        this._container.prepend(card);
    }
}
export default Section;