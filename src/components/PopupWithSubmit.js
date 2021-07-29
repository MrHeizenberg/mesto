import Popup from './Popup.js';
class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupWindow.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitform()});
    }

    submitAction(action) {
        this._submitform = action;
    }
}

export default PopupWithSubmit;