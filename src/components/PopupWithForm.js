import Popup from './Popup.js';
class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._popupWindow = document.querySelector(popupSelector);
        this._form = this._popupWindow.querySelector('.popup__infosave');
        this._submitForm = submitForm;
    }

    _getInputValues = () => {
        this._el = {};
        this._inputs = this._form.querySelectorAll('input');
        this._inputs.forEach(input => {
            this._el[input.name] = input.value;
        })
        return this._el;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
            this._submitForm(this._getInputValues());
            /* this.close(); */
        });
    }

    close = () => {
        super.close();
        this._form.reset();
    }
}

export default PopupWithForm;