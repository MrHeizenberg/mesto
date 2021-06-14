function enableValidation(obj) {
    obj.forEach((form,i) => {
        const forms = document.querySelector(obj[i].form);
        const error = document.querySelector(obj[i].inputHideError);
        error.addEventListener('click', () => hideError(obj[i],forms));
        forms.addEventListener('input', (event) => handlerForInput(event, obj[i]))
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

function hideError(obj,form) {
    const spans = form.querySelectorAll(obj.inputs)
    spans.forEach((el) => {
        el.classList.remove(obj.inputError);
        const span = form.querySelector(`#${el.id}-error`);
        span.textContent = '';
    })
}

function buttonDisabled(event, form, obj) {
    const button = document.querySelector(obj.submitButton);
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

enableValidation([{
    form: '.popup__infosave_type_edit',
    submitButton: '.popup__save_edit',
    inactiveButton: 'popup__save_disabled',
    inputs: '.popup__text',
    inputError: 'popup__text_type_error',
    inputHideError: '.popup__close_type_edit'
},
{
    form: '.popup__infosave_type_addcard',
    submitButton: '.popup__save_add',
    inactiveButton: 'popup__save_disabled',
    inputs: '.popup__text',
    inputError: 'popup__text_type_error',
    inputHideError: '.popup__close_type_addcard'
}]);