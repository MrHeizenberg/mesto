const popupEditOpen = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCardOpen = document.querySelector('.profile__add');
const popupAddCard = document.querySelector('.popup_type_addcard');
const popupEditClose = document.querySelector('.popup__close_type_edit');
const popupAddCardClose = document.querySelector('.popup__close_type_addcard');
const author = document.querySelector('.profile__title');
const descriptionAuthor = document.querySelector('.profile__subtitle');
const jobInput = document.querySelector('input[name=description]');
const nameInput = document.querySelector('input[name=author]');
const formEdit = document.querySelector('.popup__infosave_type_edit');
const nameNone = document.querySelector('input[name="area"]');
const linkNone = document.querySelector('input[name="imagelink"]');
const formAddCards = document.querySelector('.popup__infosave_type_addcard');
const popupImage = document.querySelector('.popup_type_image');
const popupImageClose = document.querySelector('.popup__close_type_image');
const fullImage = document.querySelector('.popup__image');
const fullImageDescription = document.querySelector('.popup__subtitle');
const editPopupSaveButton = document.querySelector('.popup__save_edit');
const addPopupSaveButton = document.querySelector('.popup__save_add');

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

const cardsTemplate = document.querySelector('#cards').content;
const cardsTable = document.querySelector('.cards');

initialCards.forEach(function (el) {
    cardsTable.append(createCard(el));
})

function toggleModal(modal) {
    modal.classList.toggle('popup_visible_on');
    if (modal.classList.contains('popup_visible_on')) {
        document.addEventListener('keydown', handlerOfEsc);
    } else {
        document.removeEventListener('keydown', handlerOfEsc);
    }
}

function saveFormProfile(event) {
    event.preventDefault();
    author.textContent = nameInput.value;
    descriptionAuthor.textContent = jobInput.value;
    toggleModal(popupEdit);
}

function createCard(el) {
    const cardsElement = cardsTemplate.cloneNode(true);
    cardsElement.querySelector('.cards__photo').src = el.link;
    cardsElement.querySelector('.cards__photo').alt = el.name;
    cardsElement.querySelector('.cards__title').textContent = el.name;
    cardsElement.querySelector('.cards__like').addEventListener('click', ({ target }) => {
        target.classList.toggle('cards__like_active');
    });
    cardsElement.querySelector('.cards__delete').addEventListener('click', ({ target }) => {
        target.closest('.cards__card').remove();
    });
    cardsElement.querySelector('.cards__fullphoto').addEventListener('click', (event) => {
        toggleModal(popupImage);
        fullImage.src = el.link;
        fullImage.alt = el.name;
        fullImageDescription.textContent = el.name;
    });
    return (cardsElement);
}

popupEditOpen.addEventListener('click', () => {
    nameInput.value = author.textContent;
    jobInput.value = descriptionAuthor.textContent;
    document.getElementById('author-error').textContent = nameInput.validationMessage;
    document.getElementById('description-error').textContent = jobInput.validationMessage;
    document.getElementById('author').classList.remove('popup__text_type_error'); 
    document.getElementById('description').classList.remove('popup__text_type_error');
    editPopupSaveButton.classList.remove('popup__save_disabled');
    editPopupSaveButton.removeAttribute('disabled');
    toggleModal(popupEdit);
});

function handlerOfEsc(event) {
    if (event.code === 'Escape') {
        toggleModal(document.querySelector('.popup_visible_on'));
    }
}

popupEdit.addEventListener('click', (event) => {
    if ((event.target === event.currentTarget) || (event.target.classList.contains('popup__close'))) {
        toggleModal(popupEdit)
    }
});

popupAddCardOpen.addEventListener('click', () => {
    const Valid = formAddCards.checkValidity();
    if (!Valid) {
        addPopupSaveButton.classList.add('popup__save_disabled');
        addPopupSaveButton.setAttribute('disabled', 'disabled');
    };
    toggleModal(popupAddCard);
});

popupAddCard.addEventListener('click', (event) => {
    if ((event.target === event.currentTarget) || (event.target.classList.contains('popup__close'))) {
        toggleModal(popupAddCard);
    }
});

popupImage.addEventListener('click', (event) => {
    if ((event.target === event.currentTarget) || (event.target.classList.contains('popup__close'))) {
        toggleModal(popupImage);
    }
});

formEdit.addEventListener('submit', saveFormProfile);
formAddCards.addEventListener('submit', (event) => {
    event.preventDefault();
    const el = {
        name: '',
        link: ''
    };
    el.name = nameNone.value;
    el.link = linkNone.value;
    cardsTable.prepend(createCard(el));
    formAddCards.reset();
    toggleModal(popupAddCard);
});