export const popupEditOpen = document.querySelector('.profile__edit');
export const popupAddCardOpen = document.querySelector('.profile__add');
export const jobInput = document.querySelector('input[name=description]');
export const nameInput = document.querySelector('input[name=author]');
export const formEdit = document.querySelector('.popup__infosave_type_edit');
export const formAddCards = document.querySelector('.popup__infosave_type_addcard');
export const editPopupSaveButton = document.querySelector('.popup__save_edit');
export const addPopupSaveButton = document.querySelector('.popup__save_add');
export const authorError = document.getElementById('author-error');
export const descriptionError = document.getElementById('description-error');
export const validConfig = {
    form: '.popup__infosave',
    submitButton: '.popup__save',
    inactiveButton: 'popup__save_disabled',
    inputs: '.popup__text',
    inputError: 'popup__text_type_error'
};

export const initialCards = [
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

export const cardsTable = document.querySelector('.cards');