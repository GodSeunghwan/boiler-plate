const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    },
    password: {
        type: String,
        maxlength: 100,
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
    const user = this
    if (user.isModified('password')) {
        // 비밀번호 가져옴
        const myPlaintextPassword = user.password
        bcrypt.genSalt(saltRounds, (err, salt) => {
            // 에러 리턴
            if (err) return next(err)
            bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
                if (err) return next(err)
                // 비밀번호를 hash로 변경
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (myPlaintextPassword, callback) {
    bcrypt.compare(myPlaintextPassword, this.password, (err, isMatch) => {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function (callback) {
    const user = this
    // JWT를 이용하여 토큰 생성
    const token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save((err, user) => {
        if (err) return callback(err)
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback) {
    const user = this
    jwt.verify(token, 'secretToken', (err, decoded) => {
        user.findOne({_id: decoded, token: token}, (err, user) => {
            if(err) return callback(err)
            callback(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }