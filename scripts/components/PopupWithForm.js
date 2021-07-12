import Popup from './Popup.js';
class PopupWithForm extends Popup {
    #submitForm;
    #popupSelector;
    #form
    #el;
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this.#popupSelector = document.querySelector(popupSelector);
        this.#form = document.forms['infosave-add'];
        this.#submitForm = submitForm;
    }

    #getInputValues = () => {
        this.#el = {
            name: '',
            link: ''
        }
        this.#el.name = this.#form.elements['area'].value;
        this.#el.link = this.#form.elements['imagelink'].value;
        return this.#el;
    }

    setEventListeners = () => {
        this.#form.addEventListener('submit', () => {
            this.#submitForm(this.#getInputValues());
            this.close();
        });
    }

    close = () => {
        this.#popupSelector.classList.remove('popup_visible_on');
        document.addEventListener('keydown', this.handleEscClose);
        this.#form.reset();
    }
}

export default PopupWithForm;