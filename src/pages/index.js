import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {popupEditOpen,popupAddCardOpen,formEdit,formAddCards,validConfig,initialCards} from '../components/constants.js';

const profileValidation = new FormValidator(validConfig, formEdit);
const cardFormValidation = new FormValidator(validConfig, formAddCards);
const popupWithImage = new PopupWithImage('.popup_type_image');
const popupProfile = new PopupWithForm('.popup_type_edit', (item) => {
    userInfo.setUserInfo(item.author,item.description);
});

const popupCardForm = new PopupWithForm('.popup_type_addcard',(item) => {
    section.addItemFromForm(createCard(item.area,item.imagelink));
});

const userInfo = new UserInfo('.profile__title','.profile__subtitle');
const section = new Section({
    items: initialCards,
    renderer: (item) => {
        return createCard(item.name,item.link);
    }
}, '.cards');

section.getCard();
profileValidation.enableValidation();
cardFormValidation.enableValidation();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupCardForm.setEventListeners();

function createCard(name,link) {
    const card = new Card(name, link, '#cards', (() => {popupWithImage.open(link,name)})).createCard();
    return card;
}

popupEditOpen.addEventListener('click', () => {
    const userData =userInfo.getUserInfo();
    formEdit.elements['author'].value = userData.name;
    formEdit.elements['description'].value = userData.profession;
    profileValidation.hideErrorWithOpen();
    profileValidation.toggleButtonState();
    popupProfile.open();
});

popupAddCardOpen.addEventListener('click', () => {
    cardFormValidation.hideErrorWithOpen();
    cardFormValidation.toggleButtonState();
    popupCardForm.open();
});