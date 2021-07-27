import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Api from '../components/Api.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import { popupEditOpen, popupAddCardOpen, formEdit, formAddCards, validConfig, profileName, profileAbout, popupProfileUpdateOpen, formWithAvatar, profileAvatar } from '../components/constants.js';

const section = (items) => new Section({
    items: items,
    renderer: (item) => {
        return createCard(item.name, item.link, item.likes, item.owner._id, item._id);
    }
}, '.cards');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
        authorization: '254f4d19-4cbe-4ebe-a16e-0232684f7a64',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithSubmit = new PopupWithSubmit('.popup_type_deletecard');
const popupProfile = new PopupWithForm('.popup_type_edit', (item) => {
    const popupButton = document.querySelector('.popup__save_edit');
    renderLoading(true, popupButton, popupProfile);
    api.profileUpdate(item.author, item.description)
        .finally(() => {
            userInfo.setUserInfo(item.author, item.description);
            renderLoading(false, popupButton, popupProfile)
        })
});

const popupCardForm = new PopupWithForm('.popup_type_addcard', (item) => {
    const popupButton = document.querySelector('.popup__save_add');
    renderLoading(true, popupButton, popupCardForm);
    api.addCard(item.area, item.imagelink).then((card) => {
        item = card;
        section(item).addItemFromForm(createCard(item.name, item.link, item.likes, item.owner._id, item._id));
    }).finally(() => renderLoading(false, popupButton, popupCardForm));
});

const popupProfileUpdate = new PopupWithAvatar('.popup_type_profileUpdate', (item) => {
    const popupButton = document.querySelector('.popup__save_profileUpdate');
    renderLoading(true, popupButton, popupProfileUpdate);
    api.profileAvatarUpdate(item.avatar).then(data => profileAvatar.src = data.avatar).finally(() => renderLoading(false, popupButton, popupProfileUpdate))
});

const profileValidation = new FormValidator(validConfig, formEdit);
const cardFormValidation = new FormValidator(validConfig, formAddCards);
const avatarFormValidation = new FormValidator(validConfig, formWithAvatar);

api.getProfile().then((res) => {
    profileName.textContent = res.name;
    profileAbout.textContent = res.about;
    profileAvatar.src = res.avatar;
})
api.getInitialCards().then((items) => {
    section(items).getCard();
});

profileValidation.enableValidation();
cardFormValidation.enableValidation();
avatarFormValidation.enableValidation();

popupProfileUpdate.setEventListeners();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupCardForm.setEventListeners();
popupWithSubmit.setEventListeners();

function renderLoading(isLoading, popupButton, popup) {
    if (isLoading) {
        popupButton.textContent = popupButton.textContent + "..."
    }
    else {
        popupButton.textContent = popupButton.textContent.replace('...', '')
        popup.close();
    }
}

function createCard(name, link, like, id, cardId) {
    const card = new Card({
        data: { name, link, like, id },
        handleCardClickImage: () => { popupWithImage.open(link, name) },
        handleCardClickLike: (event, likesCounter) => {
            const userLikes = new Array();
            like.forEach((el) => {
                userLikes.push(el._id);
            })
            if (like.length > 0 && userLikes.includes('2780bf4680712425a2ce7298')) {
                api.deleteLike(cardId)
                    .then(data => {
                        if (like.length === 1) {
                            likesCounter.classList.remove('cards__like-counter_visible');
                        }
                        likesCounter.textContent = like.length - 1;
                        event.target.classList.remove('cards__like_active');
                        like = data.likes
                    });
            }
            else {
                api.addLike(cardId).then(data => {
                    likesCounter.classList.add('cards__like-counter_visible');
                    likesCounter.textContent = like.length + 1;
                    event.target.classList.add('cards__like_active');
                    like = data.likes
                });
            }
        },
        handleCardClickDelete: (event) => {
            const card = event.target.closest('.cards__card');
            popupWithSubmit.open();
            popupWithSubmit.submitAction(() => {
                const popupButton = document.querySelector('.popup__save_deletecard')
                renderLoading(true, popupButton, popupWithSubmit);
                event.preventDefault();
                api.deleteCard(cardId).finally(() => {
                    renderLoading(false, popupButton, popupWithSubmit);
                    card.remove();
                });
            })
        }
    }, '#cards').createCard();
    return card;
}

popupEditOpen.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
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

popupProfileUpdateOpen.addEventListener('click', () => {
    avatarFormValidation.hideErrorWithOpen();
    avatarFormValidation.toggleButtonState();
    popupProfileUpdate.open();
});