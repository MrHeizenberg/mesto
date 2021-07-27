class Card {
    constructor(cardInfo, cardSelector) {
        this._cardtitle = cardInfo.data.name;
        this._cardlink = cardInfo.data.link;
        this._cardlike = cardInfo.data.like;
        this._id = cardInfo.data.id;
        this._template = cardSelector;
        this._handleCardClickImage = cardInfo.handleCardClickImage;
        this._handleCardClickDelete = cardInfo.handleCardClickDelete;
        this._handleCardClickLike = cardInfo.handleCardClickLike;
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
        this._cardRemove = this._card.querySelector('.cards__delete');
        this._likesCounter = this._card.querySelector('.cards__like-counter');
        if ((this._cardlike) && (this._id)) {
            if (this._cardlike.length > 0) {
                this._cardlike.forEach(el => {
                    if (el._id === '2780bf4680712425a2ce7298') {
                        this._card.querySelector('.cards__like').classList.add('cards__like_active')
                    }
                });
                this._likesCounter.classList.add('cards__like-counter_visible');
                this._likesCounter.textContent = this._cardlike.length;
            }
            if (this._id === '2780bf4680712425a2ce7298') {
                this._cardRemove.classList.add('cards__delete_visible')
            }
        } else {
            this._cardRemove.classList.add('cards__delete_visible');
        }
        this._setListeners(this._likesCounter);
        return this._card;
    }

    _setListeners = (likesCounter) => {
        this._card.querySelector('.cards__like').addEventListener('click', (event) => {this._handleCardClickLike(event,likesCounter)});
        this._card.querySelector('.cards__delete').addEventListener('click', this._handleCardClickDelete);
        this._card.querySelector('.cards__fullphoto').addEventListener('click', () => {this._handleCardClickImage(this._cardtitle, this._cardlink) });
    }
}

export default Card;