function enableValidation(obj) {
    const form = document.querySelector(obj.form);
    form.addEventListener('input', (event) => handlerForInput(event, obj))
};

function handlerForInput(event, obj) {
    const input = event.target;
    const form = event.currentTarget;
    showError(input);
    buttonDisabled(event, form, obj);
}

function showError(input) {
    const span = document.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;
}

function buttonDisabled(event, form, obj) {
    const button = document.querySelector(obj.submitButton);
    const isValid = form.checkValidity();
    const input = event.target;
    const isValidInput = input.checkValidity();
    console.log(input);
    console.log(isValid)
    if (!isValid) {
        button.classList.add(obj.inactiveButton);
    }
    else {
        button.classList.remove(obj.inactiveButton);
    }

    if (!isValidInput) {
        input.classList.add('popup__text_type_error');
        console.log(input)
    }
    else {
        input.classList.remove('popup__text_type_error');
    }
}

enableValidation({
    form: '.popup__infosave_type_edit',
    submitButton: '.popup__save_edit',
    inactiveButton: 'popup__save_disabled',
});

enableValidation({
    form: '.popup__infosave_type_addcard',
    submitButton: '.popup__save_add',
    inactiveButton: 'popup__save_disabled',
});