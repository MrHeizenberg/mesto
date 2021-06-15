function enableValidation(obj) {
    const popups = document.querySelectorAll(obj.popup);
    popups.forEach((popup) => {
        if (popup.querySelector(obj.inputs) != null) {
            const form = popup.querySelector(obj.form);
            const error = popup.querySelector(obj.inputHideError);
            form.addEventListener('input', (event) => handlerForInput(event, obj));
            error.addEventListener('click', () => hideError(obj, form));
            popup.addEventListener('click', (event) => {
                if (event.target === event.currentTarget) {
                    hideError(obj, form);
                }
            });
            popup.addEventListener('keydown', (event) => {
                if (event.code === 'Escape') {
                    hideError(obj, form);
                }
            });
        }
    });
};

function handlerForInput(event, obj) {
    const input = event.target;
    const form = event.currentTarget;
    showError(input, form);
    buttonDisabled(event, form, obj);
}

function showError(input, form) {
    const span = form.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;
}

function hideError(obj, form) {
    const spans = form.querySelectorAll(obj.inputs)
    spans.forEach((el) => {
        el.classList.remove(obj.inputError);
        const span = form.querySelector(`#${el.id}-error`);
        span.textContent = '';
    })
}

function buttonDisabled(event, form, obj) {
    const button = form.querySelector(obj.submitButton);
    const isValid = form.checkValidity();
    const input = event.target;
    const isValidInput = input.checkValidity();
    if (!isValid) {
        button.classList.add(obj.inactiveButton);
        button.setAttribute('disabled', 'disabled');
    }
    else {
        button.classList.remove(obj.inactiveButton);
        button.removeAttribute('disabled');
    }

    if (!isValidInput) {
        input.classList.add(obj.inputError);
    }
    else {
        input.classList.remove(obj.inputError);
    }
}

enableValidation({
    popup: '.popup',
    form: '.popup__infosave',
    submitButton: '.popup__save',
    inactiveButton: 'popup__save_disabled',
    inputs: '.popup__text',
    inputError: 'popup__text_type_error',
    inputHideError: '.popup__close'
});