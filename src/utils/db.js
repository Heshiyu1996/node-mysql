// 数据库连接模块
let mysql = require('mysql')
let db = {}

// 数据库连接信息
const MYSQL_INFO = {
    host: 'localhost',
    user: 'root',
    password: 'localhost',
    database: 'heshiyu',
    port: 3306
}

db.close = connection => {
    connection.end(err => {
        if (err) return
        console.log('数据库 [关闭连接]')
    })
}

db.connect = () => {
    let connection = mysql.createConnection(MYSQL_INFO)
    connection.connect(err => err)
    console.log('数据库 [开启连接]')
    return connection // 数据库连接，返回了一个connection对象
}

// 插入
db.insert = (connection, sql, params, callback) => {
    connection.query(sql, params, (error, results) => {
        if (error) {
            callback(error) //返回插入的id，作为第四个参数
            throw error
        }
        callback(results.insertId) //返回插入的id，作为第四个参数
    })
}

module.exports = db