let express = require('express')
let bodyParser = require('body-parser')
let db = require('./utils/db')

let app = express()
app.use(bodyParser.json())   //在其他路由中间件前（尽可能靠前，以能够通过bodyPaser获取req.body）
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', (req, res) => {
    console.log('- 收到'/'的 get 请求')

    conn.query('SELECT * from student', (error, results) => {
        if (error) console.log(error)
        console.log('The solution is: ', results[0])
        res.json({ code: 200, desc: results, affextedRows: results.affextedRows })
    })
})

app.get('/api/getStudentList', (req, res) => {
    console.log("- 收到'/api/getStudentList' 的请求")

    const sqlStr = 'select * from student'
    conn.query(sqlStr, (error, results) => {
        if (error) return res.json({ code: -1, desc: 'failed', details: error })
        res.json({ code: 200, desc: 'success', details: results })
    })
})

app.post('/api/addStudent', (req, res) => {
    console.log("- 收到'/api/addStudent' 的请求，req.body: ", req.body)

    let conn = db.connect()
    const sqlString = 'insert into student set ?'
    const params = req.body

    db.insert(conn, sqlString, params, response => { // 第四个函数是callback
        console.log('inserted response is: ' + response)
        res.json({ code: 200, desc: 'success', details: response })
    })
    db.close(conn)
})

app.listen(8088, () => console.log('服务端开启成功，端口是%s', 8088))

 