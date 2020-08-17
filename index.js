const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/key')
const { User } = require('./models/User')
const app = express()
const port = 3000 // 포트 설정(웹 서버 기본 포트는 80)

// URL 분석
app.use(bodyParser.urlencoded({ extended: true }))
// JSON 분석
app.use(bodyParser.json())

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
app.post('/register', (req, res) => {

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

app.listen(port, () => console.log(`port is ${port}`))