import Popup from './Popup.js';
class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupWindow = document.querySelector(popupSelector);
        this._fullImage = this._popupWindow.querySelector('.popup__image');
        this._fullImageDescription = this._popupWindow.querySelector('.popup__subtitle');
    }

    open = (link,name) => {
        super.open();
        this._fullImage.src = link;
        this._fullImage.alt = name;
        this._fullImageDescription.textContent = name;
    }
}

export default PopupWithImage;