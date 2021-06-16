function enableValidation({form, ...rest }) {
    const forms = Array.from(document.querySelectorAll(form));
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, rest);
    });
};

function setEventListeners(form, {inputs,submitButton,inactiveButton,...rest}) {
    const inputsList = Array.from(form.querySelectorAll(inputs));
    inputsList.forEach((input) => {
        input.addEventListener('input', () => {
            isValid(form, input, rest);
            toggleButtonState(form,submitButton,inactiveButton);
        });
    });
};

function isValid(form, input, rest) {
    if (!input.validity.valid) {
        showError(form,input,input.validationMessage,rest);
    }
    else {
        hideError(form, input,rest);
    }
};

function toggleButtonState(form,submitButton,inactiveButton) {
    const button = form.querySelector(submitButton);
    if (!form.checkValidity()) {
        button.classList.add(inactiveButton);
        button.setAttribute('disabled', 'disabled');
    }
    else {
        button.classList.remove(inactiveButton);
        button.removeAttribute('disabled');
    }
};

function showError(form,input,errorMessage,{inputError}) {
    const span = form.querySelector(`#${input.id}-error`);
    span.textContent = errorMessage;
    input.classList.add(inputError);
};

function hideError(form,input,{inputError}) {
    const span = form.querySelector(`#${input.id}-error`);
    span.textContent = '';
    input.classList.remove(inputError);
};

enableValidation({
    form: '.popup__infosave',
    submitButton: '.popup__save',
    inactiveButton: 'popup__save_disabled',
    inputs: '.popup__text',
    inputError: 'popup__text_type_error'
});