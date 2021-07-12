class Popup {
    #popupSelector;
    constructor(popupSelector) {
        this.#popupSelector = document.querySelector(popupSelector);
    }

    open = () => {
        this.#popupSelector.classList.add('popup_visible_on');
        document.addEventListener('keydown', this.handleEscClose);
    }

    close = () => {
        this.#popupSelector.classList.remove('popup_visible_on');
        document.addEventListener('keydown', this.handleEscClose);
    }

    handleEscClose = () => {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    setEventListeners = () => {
        this.#popupSelector.addEventListener('click', (event) => {
            if ((event.target === event.currentTarget) || (event.target.classList.contains('popup__close'))) {
                this.close();
            }
        });
    }
}

export default Popup;