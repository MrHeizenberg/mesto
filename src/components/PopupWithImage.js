import {fullImage,fullImageDescription} from '../index.js';
import Popup from './Popup.js';
class PopupWithImage extends Popup {
    #popupSelector;
    #cardtitle;
    #cardlink
    #fullImage;
    #fullImageDescription;
    constructor(popupSelector,cardtitle,cardlink) {
        super(popupSelector);
        this.#popupSelector = document.querySelector(popupSelector);
        this.#fullImage = fullImage;
        this.#fullImageDescription = fullImageDescription;
        this.#cardtitle = cardtitle;
        this.#cardlink = cardlink;
    }

    open = () => {
        this.#popupSelector.classList.add('popup_visible_on');
        document.addEventListener('keydown', this.handleEscClose);
        this.#fullImage.src = this.#cardlink;
        this.#fullImage.alt = this.#cardtitle;
        this.#fullImageDescription.textContent = this.#cardtitle;
    }
}

export default PopupWithImage;