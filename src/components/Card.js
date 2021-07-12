class Card {
    #cardtitle;
    #cardlink;
    #template;
    #card;
    #cardImage;
    constructor (cardtitle, cardlink, cardselector, handleCardClick) {
        this.#cardtitle = cardtitle;
        this.#cardlink = cardlink;
        this.#template = cardselector;
        this.handleCardClick = handleCardClick;
    }

    #getTemplate = () => {
        this.#card = document
        .querySelector(this.#template)
        .content
        .cloneNode(true);
    }

    createCard = () => {
        this.#getTemplate();
        this.#cardImage = this.#card.querySelector('.cards__photo');
        this.#cardImage.src = this.#cardlink;
        this.#cardImage.alt = this.#cardtitle;
        this.#card.querySelector('.cards__title').textContent = this.#cardtitle;
        this.#setListeners();
        return this.#card;
    }

    #setListeners = () => {
        this.#card.querySelector('.cards__like').addEventListener('click', this.#onLike);
        this.#card.querySelector('.cards__delete').addEventListener('click', this.#cardDelete);
        this.#card.querySelector('.cards__fullphoto').addEventListener('click', () => {this.handleCardClick(this.#cardtitle,this.#cardlink)});
    }

    #onLike = () => {
        event.target.classList.toggle('cards__like_active');
    }

    #cardDelete = () => {
        event.target.closest('.cards__card').remove();
    }
}

export default Card;