const express = require("express")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 3000
const mysql = require("mysql")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

dotenv.config({ path: "./.env" })

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
})

// for css js files
// dirname shows current directory
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }))
// parse json bodies (as sent by API clients)
app.use(express.json())
app.use(cookieParser());

app.set('view engine', 'hbs')

db.connect((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log("mySQL connected!!!")
  }
})

// Define routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

// Launch server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
