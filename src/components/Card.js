class Card {
    constructor (cardtitle, cardlink, cardselector, handleCardClick) {
        this._cardtitle = cardtitle;
        this._cardlink = cardlink;
        this._template = cardselector;
        this.handleCardClick = handleCardClick;
    }

    _getTemplate = () => {
        this._card = document
        .querySelector(this._template)
        .content
        .cloneNode(true);
    }

    createCard = () => {
        this._getTemplate();
        this._cardImage = this._card.querySelector('.cards__photo');
        this._cardImage.src = this._cardlink;
        this._cardImage.alt = this._cardtitle;
        this._card.querySelector('.cards__title').textContent = this._cardtitle;
        this._setListeners();
        return this._card;
    }

    _setListeners = () => {
        this._card.querySelector('.cards__like').addEventListener('click', (event) => {this._onLike(event)});
        this._card.querySelector('.cards__delete').addEventListener('click', (event) => {this._cardDelete(event)});
        this._card.querySelector('.cards__fullphoto').addEventListener('click', () => {this.handleCardClick(this._cardtitle,this._cardlink)});
    }

    _onLike = (event) => {
        event.target.classList.toggle('cards__like_active');
    }

    _cardDelete = (event) => {
        event.target.closest('.cards__card').remove();
    }
}

export default Card;