import {toggleAdd,popupImage,fullImage,fullImageDescription} from './index.js';
class Card {
    #cardtitle;
    #cardlink;
    #template;
    #card;
    #cardImage;
    #toggleAdd;
    #popupImage;
    #fullImage;
    #fullImageDescription;
    constructor (cardtitle, cardlink, cardselector) {
        this.#cardtitle = cardtitle;
        this.#cardlink = cardlink;
        this.#template = cardselector;
        this.#toggleAdd = toggleAdd;
        this.#popupImage = popupImage;
        this.#fullImage = fullImage;
        this.#fullImageDescription = fullImageDescription;
    }

    #getTemplate = () => {
        this.#card = this.#template.cloneNode(true);
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
        this.#card.querySelector('.cards__fullphoto').addEventListener('click', this.#cardPreview);
    }

    #onLike = () => {
        event.target.classList.toggle('cards__like_active');
    }

    #cardDelete = () => {
        event.target.closest('.cards__card').remove();
    }

    #cardPreview = () => {
        this.#toggleAdd(this.#popupImage);
        this.#fullImage.src = this.#cardlink;
        this.#fullImage.alt = this.#cardtitle;
        this.#fullImageDescription.textContent = this.#cardtitle;
    }
}

export default Card;