class UserInfo {
    constructor(userName, userDescription) {
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
    }

    getUserInfo = () => {
        return {
            name: this._userName.textContent,
            profession: this._userDescription.textContent,
        }
    }

    setUserInfo = (name,profession) => {
        this._userName.textContent = name;
        this._userDescription.textContent = profession;
    }
}
export default UserInfo;