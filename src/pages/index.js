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
const popupProfile = new Popup('.popup_type_edit');
const popupCardForm = new PopupWithForm('.popup_type_addcard');
const userInfo = new UserInfo('.profile__title','.profile__subtitle');
profileValidation.enableValidation();
cardFormValidation.enableValidation();
new Section({
    items: initialCards,
    renderer: (item) => {
        return createCard(item);
    }
}, '.cards').getCard();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();

function saveFormProfile(event) {
    event.preventDefault();
    const name = formEdit.elements['author'].value;
    const profession = formEdit.elements['description'].value;
    userInfo.setUserInfo(name,profession);
    popupProfile.close();
}

function createCard(item) {
    const card = new Card(item.name, item.link, '#cards', (() => {popupWithImage.open(item.link,item.name)})).createCard();
    return card;
}

popupEditOpen.addEventListener('click', () => {
    formEdit.elements['author'].value = userInfo.getUserInfo().name;
    formEdit.elements['description'].value = userInfo.getUserInfo().profession;
    profileValidation.hideErrorWithOpen();
    profileValidation.toggleButtonState();
    popupProfile.open();
});

popupAddCardOpen.addEventListener('click', () => {
    cardFormValidation.hideErrorWithOpen();
    cardFormValidation.toggleButtonState();
    popupCardForm.open();
});

formEdit.addEventListener('submit', saveFormProfile);

new PopupWithForm('.popup_type_addcard',(el) => {
    new Section({
        items: el,
        renderer: (el) => {
            new Card(el.area, el.imagelink, '#cards',(() => {popupWithImage.open(el.link,el.name)})).createCard()
        }
    }, '.cards').addItemFromForm(new Card(el.area, el.imagelink, '#cards',(() => {popupWithImage.open(el.link,el.name)})).createCard());
}).setEventListeners();