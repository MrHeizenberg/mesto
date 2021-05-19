let popupOpen = document.querySelector(".profile__edit");
let popup = document.querySelector(".popup");
let popupClose = document.querySelector(".popup__close");

popupOpen.addEventListener("click", toggleClass)
popupClose.addEventListener("click", toggleClass)

function toggleClass() {
    popup.classList.toggle("popup_open");
}

let Author = document.querySelector(".profile__title");
let descriptionAuthor = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector(".popup__text_author");
let jobInput = document.querySelector(".popup__text_description");
nameInput.value = Author.textContent;
jobInput.value = descriptionAuthor.textContent;

popupClose.addEventListener("click", function() {
    nameInput.value = Author.textContent;
    jobInput.value = descriptionAuthor.textContent;
})

let submit = document.querySelector(".poppup__save");
submit.addEventListener("click", function() {
    Author.textContent = nameInput.value;
    descriptionAuthor.textContent = jobInput.value;
    popup.classList.toggle("popup_open");
}); 

let like = document.querySelectorAll(".cards__like");

for (let i = 0; i < like.length; i++) {
like[i].addEventListener("click", toggleClassLike) 
function toggleClassLike() {
    like[i].classList.toggle("cards__like_active")}};
