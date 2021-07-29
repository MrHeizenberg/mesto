class UserInfo {
    constructor(userName, userDescription, userAvatar) {
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo = () => {
        return {
            name: this._userName.textContent,
            profession: this._userDescription.textContent,
        }
    }

    setUserInfo = (name,profession) => {
        if (name) {
            this._userName.textContent = name;
        }
        if (profession) {
            this._userDescription.textContent = profession;
        }
    }

    setUserAvatar = (userAvatar) => {
        if (userAvatar) {
            this._userAvatar.src = userAvatar;
        }  
    }
}
export default UserInfo;