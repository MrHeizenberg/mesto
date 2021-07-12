class FormValidator {
    #form;
    #submitButton;
    #inactiveButton;
    #inputs;
    #inputError;
    #inputList;
    #input;
    #button;
    #span;
    constructor(validConfig, form) {
        this.#form = form;
        this.#submitButton = validConfig.submitButton;
        this.#inactiveButton = validConfig.inactiveButton;
        this.#inputs = validConfig.inputs;
        this.#inputError = validConfig.inputError;
    }

    enableValidation = () => {
        this.#form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this.#setEventListeners();
    }

    #setEventListeners = () => {
        this.#inputList = Array.from(this.#form.querySelectorAll(this.#inputs));
        this.#inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this.#input = input;
                this.#isValid();
                this.#toggleButtonState();
            });
        });
    }

    #isValid = () => {
        if (!this.#input.validity.valid) {
            this.#showError(this.#input.validationMessage);
        }
        else {
            this.#hideError();
        }
    }

    #toggleButtonState = () => {
        this.#button = this.#form.querySelector(this.#submitButton);
        if (!this.#form.checkValidity()) {
            this.#button.classList.add(this.#inactiveButton);
            this.#button.setAttribute('disabled', 'disabled');
        }
        else {
            this.#button.classList.remove(this.#inactiveButton);
            this.#button.removeAttribute('disabled');
        }
    }

    #showError = (errorMessage) => {
        this.#span = this.#form.querySelector(`#${this.#input.id}-error`);
        this.#span.textContent = errorMessage;
        this.#input.classList.add(this.#inputError);
    }

    #hideError = () => {
        this.#span = this.#form.querySelector(`#${this.#input.id}-error`);
        this.#span.textContent = '';
        this.#input.classList.remove(this.#inputError);
    }
}

export default FormValidator;