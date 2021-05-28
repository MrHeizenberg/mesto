let popupOpen = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
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
const cardsElement = cardsTemplate.cloneNode(true);
const cardsTable = document.querySelector('.cards');
const Cardsall = document.querySelector('.cards__card');


        cardsElement.querySelector('.cards__photo').src = initialCards[1].link;
        cardsTable.append(cardsElement);
        
        /* cardsAll.append(cardsElement); */
    
        


function openPopup() {
    nameInput.value = author.textContent;
    jobInput.value = descriptionAuthor.textContent;
    popup.classList.add('popup_open');
}

function closePopup() {
    popup.classList.remove('popup_open');
}

function saveFormProfile(event) {
    event.preventDefault();
    author.textContent = nameInput.value;
    descriptionAuthor.textContent = jobInput.value;
    closePopup();
}

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
form.addEventListener('submit', saveFormProfile);
