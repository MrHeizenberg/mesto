const popupEditOpen = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCardOpen = document.querySelector('.profile__add');
const popupAddCard = document.querySelector('.popup_type_addcard');
const popupEditClose = document.querySelector('.popup__close');
const popupAddCardClose = document.querySelector('.popup__close_type_addcard');
const author = document.querySelector('.profile__title');
const descriptionAuthor = document.querySelector('.profile__subtitle');
const jobInput = document.querySelector('input[name=description]');
const nameInput = document.querySelector('input[name=author]');
const form = document.querySelector('.popup__infosave');
const nameNone = document.querySelector('input[name="area"]');
const linkNone = document.querySelector('input[name="imagelink"]');
const formAddCards = document.querySelector('.popup__infosave_type_addcard');
const popupImageOpen = document.querySelector('.popup_type_image');
const popupImageClose = document.querySelector('.popup__close_type_image');

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

initialCards.forEach(function (el, i) {
    const cardsElement = cardsTemplate.cloneNode(true);
    cardsElement.querySelector('.cards__photo').src = el.link;
    cardsElement.querySelector('.cards__photo').alt = el.name;
    cardsElement.querySelector('.cards__title').textContent = el.name;
    cardsTable.append(cardsElement);
})

let cardsLikeIcon = document.querySelectorAll('.cards__like');
cardsLikeIcon.forEach((icon) => {
    icon.addEventListener('click', ({ target }) => {
        target.classList.toggle('cards__like_active');
    })
})

let cardsDeleteIcon = document.querySelectorAll('.cards__delete');
cardsDeleteIcon.forEach((icon) => {
    icon.addEventListener('click', ({ target }) => {
        target.closest('.cards__card').remove();
    })
})

let buttonPhoto = document.querySelectorAll('.cards__fullphoto');
buttonPhoto.forEach((el) => {
    el.addEventListener('click', () => {
        popupImageOpen.classList.add('show');
        document.querySelector('.popup__image').src = el.querySelector('.cards__photo').src;
        document.querySelector('.popup__subtitle').textContent = el.nextElementSibling.querySelector('.cards__title').textContent;
    })
})

function toggleModal(modal) {
    modal.classList.toggle('show');
}

function saveFormProfile(event) {
    event.preventDefault();
    author.textContent = nameInput.value;
    descriptionAuthor.textContent = jobInput.value;
    toggleModal(popupEdit);
}

function createCards(event) {
    event.preventDefault();
    const cardsElement = cardsTemplate.cloneNode(true);
    cardsElement.querySelector('.cards__photo').src = linkNone.value;
    cardsElement.querySelector('.cards__title').textContent = nameNone.value;
    cardsTable.prepend(cardsElement);
    cardsLikeIcon = document.querySelector('.cards__like').addEventListener('click', ({ target }) => {
        target.classList.toggle('cards__like_active');
    });
    cardsDeleteIcon = document.querySelector('.cards__delete').addEventListener('click', ({ target }) => {
        target.closest('.cards__card').remove();
    });
    buttonPhoto = document.querySelector('.cards__fullphoto').addEventListener('click', () => {
        popupImageOpen.classList.add('show');
        document.querySelector('.popup__image').src = document.querySelector('.cards__photo').src;
        document.querySelector('.popup__subtitle').textContent = document.querySelector('.cards__title').textContent;
    });
    toggleModal(popupAddCard);
}

function invisText(event) {
    if (event.target === nameNone) {
        nameNone.placeholder = '';
    }
    else nameNone.placeholder = 'Название';

    if (event.target === linkNone) {
        linkNone.placeholder = '';
    }
    else linkNone.placeholder = 'Ссылка на картинку';
}

popupEditOpen.addEventListener('click', () => {
    nameInput.value = author.textContent;
    jobInput.value = descriptionAuthor.textContent;
    toggleModal(popupEdit)
});
popupEditClose.addEventListener('click', () => toggleModal(popupEdit));

popupAddCardOpen.addEventListener('click', () => toggleModal(popupAddCard));
popupAddCardClose.addEventListener('click', () => toggleModal(popupAddCard));
popupImageClose.addEventListener('click', () => toggleModal(popupImageOpen));

popupAddCard.addEventListener('click', (event) => invisText(event));

form.addEventListener('submit', saveFormProfile);
formAddCards.addEventListener('submit', createCards);