class Section {
    #items;
    #renderer;
    #container;
    #card;
    constructor({ items, renderer }, contSelector) {
        this.#items = items;
        this.#renderer = renderer;
        this.#container = document.querySelector(contSelector);
    }

    getCard = () => {
        this.#items.forEach((item) => {
            this.#card = this.#renderer(item);
            this.#addItem(this.#card);
        })
    }

    #addItem = (card) => {
        this.#container.append(card);
    }
}

export default Section;