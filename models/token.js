class Token {
    constructor(token_hash, created, user, expiration_date) {
        this.token_hash = token_hash;
        this.created = created;
        this.user = user;
        this.expiration_date = expiration_date;
    }
}
