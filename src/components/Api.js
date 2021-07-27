class Api {
    constructor(options) {
        this._options = options;
    }

    getProfile() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: this._options.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: this._options.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    profileUpdate(name, description) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteCard(cardId) {
        return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._options.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    addCard(name, link) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    addLike(cardId) {
        return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._options.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    deleteLike(cardId) {
        return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._options.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    profileAvatarUpdate(link) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

export default Api;