class Card {
    #cardtitle;
    #cardlink;
    #template;
    #card;
    #toggleModal;
    #popupImage;
    #fullImage;
    #fullImageDescription;
    constructor (cardtitle, cardlink, cardselector, toggleModal, popupImage, fullImage, fullImageDescription) {
        this.#cardtitle = cardtitle;
        this.#cardlink = cardlink;
        this.#template = cardselector;
        this.#toggleModal = toggleModal;
        this.#popupImage = popupImage;
        this.#fullImage = fullImage;
        this.#fullImageDescription = fullImageDescription;
    }

    createCard = () => {
        this.#card = this.#template.cloneNode(true);
        this.#card.querySelector('.cards__photo').src = this.#cardlink;
        this.#card.querySelector('.cards__photo').alt = this.#cardtitle;
        this.#card.querySelector('.cards__title').textContent = this.#cardtitle;
        this.#setListeners();
        return(this.#card);
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
        this.#toggleModal(this.#popupImage);
        this.#fullImage.src = this.#cardlink;
        this.#fullImage.alt = this.#cardtitle;
        this.#fullImageDescription.textContent = this.#cardtitle;
    }
}

export default Card;