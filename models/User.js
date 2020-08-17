const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    }, password: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    }
})

// 비밀번호 암호화
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        // 비밀번호 가져옴
        const myPlaintextPassword = this.password
        bcrypt.genSalt(saltRounds, (err, salt) => {
            // 에러 리턴
            if (err) return next(err)
            bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
                if (err) return next(err)
                // 비밀번호를 hash로 변경
                this.password = hash
                next()
            })
        })
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }