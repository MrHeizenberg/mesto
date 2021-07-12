class UserInfo {
    #form;
    #userName;
    #userDescription;
    constructor(userName,userDescription) {
        this.#form = document.forms['infosave-edit'];
        this.#userName = document.querySelector(userName);
        this.#userDescription = document.querySelector(userDescription);
    }

    getUserInfo = () => {
        this.#form.elements['author'].value = this.#userName.textContent;
        this.#form.elements['description'].value = this.#userDescription.textContent;
    }

    setUserInfo = () => {
        this.#userName.textContent = this.#form.elements['author'].value;
        this.#userDescription.textContent = this.#form.elements['description'].value;
    }
}
export default UserInfo;