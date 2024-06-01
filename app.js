const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Порт, на котором будет запущен сервер
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Загрузка переменных окружения из файла .env
dotenv.config({ path: './.env' });

// Настройка подключения к базе данных MySQL
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// Middleware для парсинга URL-кодированных и JSON тел запросов
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Подключение к базе данных
db.connect((error) => {
  if (error) {
    console.log('Database connection error:', error);
  } else {
    console.log('MySQL connected!');
  }
});

// Настройка статических файлов
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Настройка шаблонизатора
app.set('view engine', 'hbs');

// Подключение маршрутов
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});