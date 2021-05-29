let popupOpen = document.querySelector('.profile__edit');
let popupEdit = document.querySelector('.popup_type_edit');
let popup = document.querySelector('.popup_type_addcard');
let popupClose = document.querySelector('.popup__close');
let author = document.querySelector('.profile__title');
let descriptionAuthor = document.querySelector('.profile__subtitle');
let jobInput = document.querySelector('input[name=description]');
let nameInput = document.querySelector('input[name=author]');
let form = document.querySelector('.popup__infosave');
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

initialCards.forEach(function(el,i) {
    const cardsElement = cardsTemplate.cloneNode(true);
    cardsElement.querySelector('.cards__photo').src = initialCards[i].link;
    cardsElement.querySelector('.cards__photo').alt = initialCards[i].name;
    cardsElement.querySelector('.cards__title').textContent = initialCards[i].name;
    cardsTable.append(cardsElement);
})

function toggleModal(modal) {
    modal.classList.toggle('popup_open');
}

function saveFormProfile(event) {
    event.preventDefault();
    author.textContent = nameInput.value;
    descriptionAuthor.textContent = jobInput.value;
    closePopup();
}

popupOpen.addEventListener('click', () => {
    nameInput.value = author.textContent;
    jobInput.value = descriptionAuthor.textContent;
    toggleModal(popupEdit)})
popupClose.addEventListener('click', () => toggleModal(popupEdit));
form.addEventListener('submit', saveFormProfile);
