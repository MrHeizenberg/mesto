let popupOpen = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let author = document.querySelector('.profile__title');
let descriptionAuthor = document.querySelector('.profile__subtitle');
let jobInput = document.querySelector('input[name=author]');
let nameInput = document.querySelector('input[name=description]');
let form = document.querySelector('.popup__infosave');

function openPopup() {
    nameInput.value = author.textContent;
    jobInput.value = descriptionAuthor.textContent;
    popup.classList.add('popup_open');
}

function closePopup() {
    popup.classList.remove('popup_open');
}

function save() {
    author.textContent = nameInput.value;
    descriptionAuthor.textContent = jobInput.value;
    closePopup();
}

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
form.addEventListener('submit', save);
