const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000 // 포트 설정(웹 서버 기본 포트는 80)

// 몽고디비 연결 및 설정
mongoose.connect('mongodb+srv://<username>:<password>@boiler-plate-a9iwf.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB Connected.")) // 연결 성공 시
    .catch(err => console.log(err)) // 연결 실패 시

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`port is ${port}`))