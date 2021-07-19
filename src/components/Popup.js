class Popup {
    constructor(popupSelector) {
        this._popupWindow = document.querySelector(popupSelector);
    }

    open() {
        this._popupWindow.classList.add('popup_visible_on');
        document.addEventListener('keydown', this.handleEscClose);
    }

    close() {
        this._popupWindow.classList.remove('popup_visible_on');
        document.addEventListener('keydown', this.handleEscClose);
    }

    handleEscClose = (event) => {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupWindow.addEventListener('click', (event) => {
            if ((event.target === event.currentTarget) || (event.target.classList.contains('popup__close'))) {
                this.close();
            }
        });
    }
}

export default Popup;