const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')
const app = express()
const port = 3000 // 포트 설정(웹 서버 기본 포트는 80)

// URL 분석
app.use(bodyParser.urlencoded({ extended: true }))
// JSON 분석
app.use(bodyParser.json())

app.use(cookieParser())

// 몽고디비 연결 및 설정
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB Connected.")) // 연결 성공 시
    .catch(err => console.log(err)) // 연결 실패 시

// localhost:3000으로 접속 시
app.get('/', (req, res) => res.send('Hello World!!'))

// 회원 가입 정보를 데이터베이스에 저장
app.post('/api/users/register', (req, res) => {

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

// 로그인
app.post('/api/users/login', (req, res) => {
    // 데이터베이스에 이메일이 있는지 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "User not found."
            })
        }
        // 이메일이 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "Wrong password"
                })
            }
            //비밀번호가 맞다면 토큰 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)
                res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

// Auth
app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 오면 Auth 통과
    res.status(200).json({ user: req.user })
})

app.listen(port, () => console.log(`port is ${port}`))