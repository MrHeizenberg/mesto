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
import { popupEditOpen, popupAddCardOpen, formEdit, formAddCards, validConfig, popupProfileUpdateOpen, formWithAvatar, popupButtonSaveEdit, popupButtonSaveProfileUpdate, popupButtonSaveAdd, popupButtonSaveDelete} from '../utils/constants.js';
import {renderLoading} from '../utils/utils.js';

const section = (items,userId) => new Section({
    items: items,
    renderer: (item) => {
        section().appendItem(createCard(item.name, item.link, item.likes, item.owner._id, item._id, userId));
    }
}, '.cards');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
        authorization: '254f4d19-4cbe-4ebe-a16e-0232684f7a64',
        'Content-Type': 'application/json'
    }
});

const popupCardForm = new PopupWithForm('.popup_type_addcard', (item) => {
    renderLoading(true, popupButtonSaveAdd);
    api.addCard(item.area, item.imagelink).then((card) => {
        item = card;
        const userId = card.owner._id;
        section(item,userId).prependItem(createCard(item.name, item.link, item.likes, item.owner._id, item._id, userId));
        popupCardForm.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoading(false, popupButtonSaveAdd));
});

const elId = {};
api.getProfile().then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAvatar(res.avatar);
    const userId = res._id;
    return userId;
})
.then((userId) => {
    api.getInitialCards().then((items) => {
        section(items,userId).renderCards();
    }).catch((err) => {
        console.log(err);
    });
})
.catch((err) => {
    console.log(err);
});

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupWithSubmit = new PopupWithSubmit('.popup_type_deletecard');
const popupProfile = new PopupWithForm('.popup_type_edit', (item) => {
    renderLoading(true, popupButtonSaveEdit);
    api.profileUpdate(item.author, item.description)
        .then(() => {
            userInfo.setUserInfo(item.author, item.description);
            popupProfile.close()})
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, popupButtonSaveEdit)
        })
});

const popupUpdateAvatar = new PopupWithAvatar('.popup_type_profileUpdate', (item) => {
    renderLoading(true, popupButtonSaveProfileUpdate);
    api.profileAvatarUpdate(item.avatar).then(data => {
        userInfo.setUserAvatar(data.avatar)
        popupUpdateAvatar.close()})
    .catch((err) => {
        console.log(err);
    })
    .finally(() => renderLoading(false, popupButtonSaveProfileUpdate))
});

const profileValidation = new FormValidator(validConfig, formEdit);
const cardFormValidation = new FormValidator(validConfig, formAddCards);
const avatarFormValidation = new FormValidator(validConfig, formWithAvatar);

profileValidation.enableValidation();
cardFormValidation.enableValidation();
avatarFormValidation.enableValidation();

popupUpdateAvatar.setEventListeners();
popupCardForm.setEventListeners();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithSubmit.setEventListeners();

function createCard(name, link, like, id, cardId, userId) {
    const card = new Card({
        data: { name, link, like, id, userId },
        handleCardClickImage: () => { popupWithImage.open(link, name) },
        handleCardClickLike: (event, likesCounter) => {
            const userLikes = new Array();
            like.forEach((el) => {
                userLikes.push(el._id);
            })
            if (like.length > 0 && userLikes.includes(userId)) {
                api.deleteLike(cardId)
                    .then(data => {
                        if (like.length === 1) {
                            likesCounter.classList.remove('cards__like-counter_visible');
                        }
                        likesCounter.textContent = like.length - 1;
                        event.target.classList.remove('cards__like_active');
                        like = data.likes
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                api.addLike(cardId).then(data => {
                    likesCounter.classList.add('cards__like-counter_visible');
                    likesCounter.textContent = like.length + 1;
                    event.target.classList.add('cards__like_active');
                    like = data.likes
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        },
        handleCardClickDelete: (event) => {
            const card = event.target.closest('.cards__card');
            popupWithSubmit.open();
            popupWithSubmit.submitAction(() => {
                renderLoading(true, popupButtonSaveDelete);
                event.preventDefault();
                api.deleteCard(cardId)
                .then(() => {
                    card.remove();
                    popupWithSubmit.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    renderLoading(false, popupButtonSaveDelete);
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

popupProfileUpdateOpen.addEventListener('click', () => {
    avatarFormValidation.hideErrorWithOpen();
    avatarFormValidation.toggleButtonState();
    popupUpdateAvatar.open();
});

popupAddCardOpen.addEventListener('click', () => {
    cardFormValidation.hideErrorWithOpen();
    cardFormValidation.toggleButtonState();
    popupCardForm.open();
});