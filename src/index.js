import './pages/index.css';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';
const popupEditOpen = document.querySelector('.profile__edit');
const popupAddCardOpen = document.querySelector('.profile__add');
const jobInput = document.querySelector('input[name=description]');
const nameInput = document.querySelector('input[name=author]');
const formEdit = document.querySelector('.popup__infosave_type_edit');
const formAddCards = document.querySelector('.popup__infosave_type_addcard');
const fullImage = document.querySelector('.popup__image');
const fullImageDescription = document.querySelector('.popup__subtitle');
const editPopupSaveButton = document.querySelector('.popup__save_edit');
const addPopupSaveButton = document.querySelector('.popup__save_add');
const validConfig = {
    form: '.popup__infosave',
    submitButton: '.popup__save',
    inactiveButton: 'popup__save_disabled',
    inputs: '.popup__text',
    inputError: 'popup__text_type_error'
};

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsTable = document.querySelector('.cards');

new FormValidator(validConfig, formEdit).enableValidation();
new FormValidator(validConfig, formAddCards).enableValidation();
new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '#cards', (() => {new PopupWithImage('.popup_type_image',item.name,item.link).open()})).createCard();
        return card;
    }
}, '.cards').getCard();
new Popup('.popup_type_edit').setEventListeners();
new Popup('.popup_type_addcard').setEventListeners();
new Popup('.popup_type_image').setEventListeners();

function saveFormProfile(event) {
    event.preventDefault();
    new UserInfo('.profile__title','.profile__subtitle').setUserInfo();
    new Popup('.popup_type_edit').close();
}

popupEditOpen.addEventListener('click', () => {
    new UserInfo('.profile__title','.profile__subtitle').getUserInfo();
    document.getElementById('author-error').textContent = nameInput.validationMessage;
    document.getElementById('description-error').textContent = jobInput.validationMessage;
    document.getElementById('author').classList.remove('popup__text_type_error');
    document.getElementById('description').classList.remove('popup__text_type_error');
    editPopupSaveButton.classList.remove('popup__save_disabled');
    editPopupSaveButton.removeAttribute('disabled');
    new Popup('.popup_type_edit').open();
});

popupAddCardOpen.addEventListener('click', () => {
    const valid = formAddCards.checkValidity();
    if (!valid) {
        addPopupSaveButton.classList.add('popup__save_disabled');
        addPopupSaveButton.setAttribute('disabled', 'disabled');
    };
    new Popup('.popup_type_addcard').open();
});

formEdit.addEventListener('submit', saveFormProfile);

new PopupWithForm('.popup_type_addcard',(el) => {
    cardsTable.prepend(new Card(el.name, el.link, '#cards').createCard());
}).setEventListeners();

export { fullImage, fullImageDescription };