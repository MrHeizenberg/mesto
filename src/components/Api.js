class Api {
    constructor(options) {
        this.options = options;
    }

    getCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', {
            headers: {
                authorization: '254f4d19-4cbe-4ebe-a16e-0232684f7a64'
            }
        })
            .then(res => {
                return res.json()
            });
    }
}

export default Api;