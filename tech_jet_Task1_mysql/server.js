const express = require('express')

const app = express()
// const port=3000;
app.use(express.json())
app.use(express.urlencoded({extended: false}))



// Importing module
const mysql = require('mysql')
 
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aayush",
    database: "aayush"
})
 
// Connecting to database
connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log(`Database Connected`)
        connection.query(`SHOW DATABASES`,
            function (err, result) {
                if (err)
                    console.log(`Error executing the query - ${err}`)
                else
                    console.log("Result: ", result)
            })
    }
})