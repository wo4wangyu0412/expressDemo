var schema = {
    people: {
        openid: String,
        session: String,
        name: String,
        sex: String,
        age: Number,
        star: String,
        paper: String,
        paperPic: Array,
        cardNum: String,
        country: String,
        province: String,
        city: String,
        want: String,
        intro: String
    },
    visitor: {
        openid: String,
        session: String,
        session_key: String,
        isVip: Boolean
    }
};

module.exports = schema;