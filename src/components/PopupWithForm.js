import Popup from './Popup.js';
class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._popupSelector = document.querySelector(popupSelector);
        this._form = document.forms['infosave-add'];
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
            console.log(this._form)
            this._submitForm(this._getInputValues());
            this.close();
        });
    }

    close = () => {
        super.close();
        this._form.reset();
    }
}

export default PopupWithForm;