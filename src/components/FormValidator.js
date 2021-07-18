class FormValidator {
    constructor(validConfig, form) {
        this._form = form;
        this._submitButton = validConfig.submitButton;
        this._inactiveButton = validConfig.inactiveButton;
        this._inputs = validConfig.inputs;
        this._inputError = validConfig.inputError;
    }

    enableValidation = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners = () => {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputs));
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._input = input;
                this._isValid();
                this.toggleButtonState();
            });
        });
    }

    _isValid = () => {
        if (!this._input.validity.valid) {
            this._showError(this._input.validationMessage);
        }
        else {
            this._hideError();
        }
    }

    toggleButtonState = () => {
        this._button = this._form.querySelector(this._submitButton);
        if (!this._form.checkValidity()) {
            this._button.classList.add(this._inactiveButton);
            this._button.setAttribute('disabled', 'disabled');
        }
        else {
            this._button.classList.remove(this._inactiveButton);
            this._button.removeAttribute('disabled');
        }
    }

    _showError = (errorMessage) => {
        this._span = this._form.querySelector(`#${this._input.id}-error`);
        this._span.textContent = errorMessage;
        this._input.classList.add(this._inputError);
    }

    _hideError = () => {
        this._span = this._form.querySelector(`#${this._input.id}-error`);
        this._span.textContent = '';
        this._input.classList.remove(this._inputError);
    }

    hideErrorWithOpen = () => {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputs));
            this._inputList.forEach((input) => {
                input.classList.remove('popup__text_type_error');
                this._span = document.getElementById([`${input.id}-error`]);
                this._span.textContent = '';
            }
            )
    }
}

export default FormValidator;