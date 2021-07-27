import Popup from './Popup.js';
class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        document.forms['infosave-delete'].addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitform()});
    }

    submitAction(action) {
        this._submitform = action;
    }
}

export default PopupWithSubmit;