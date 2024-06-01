const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require('util');

// Настройка соединения с базой данных MySQL
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// Метод для входа пользователя
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка на наличие email и пароля
    if (!email || !password) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      });
    }

    // Поиск пользователя по email в базе данных
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).render('login', {
          message: 'Server error'
        });
      }
      // Проверка на существование пользователя и совпадение пароля
      if (!results || results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
        return res.status(401).render('login', {
          message: 'Email or Password is incorrect'
        });
      } else {
        // Генерация JWT токена для пользователя
        const id = results[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        // Настройка опций cookie
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        };

        // Установка cookie с токеном и редирект на главную страницу
        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect("/");
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).render('login', {
      message: 'Server error'
    });
  }
};

// Метод для регистрации нового пользователя
exports.signup = async (req, res) => {
  const { name, email, password, passwordConf } = req.body;

  // Проверка на заполненность всех полей
  if (!name || !email || !password || !passwordConf) {
    return res.status(400).render('signup', {
      message: 'Please fill in all fields'
    });
  }

  // Проверка на совпадение паролей
  if (password !== passwordConf) {
    return res.status(400).render('signup', {
      message: 'Passwords do not match'
    });
  }

  try {
    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 8);

    // Проверка на наличие email в базе данных
    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).render('signup', {
          message: 'Server error'
        });
      }

      // Если email уже используется
      if (results.length > 0) {
        return res.status(400).render('signup', {
          message: 'That email is already in use'
        });
      }

      // Вставка нового пользователя в базу данных
      db.query('INSERT INTO users SET ?', { name, email, password: hashedPassword }, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).render('signup', {
            message: 'Server error'
          });
        }

        // Генерация JWT токена для нового пользователя
        const id = results.insertId;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        // Настройка опций cookie
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        };

        // Установка cookie с токеном и редирект на главную страницу
        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect("/");
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).render('signup', {
      message: 'Server error'
    });
  }
};

// Middleware для проверки, вошел ли пользователь в систему
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
    try {
      // Верификация JWT токена
      const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

      // Поиск пользователя в базе данных по ID из токена
      db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
        if (error || !result || result.length === 0) {
          return next();
        }

        // Сохранение данных пользователя в запросе
        req.user = result[0];
        return next();
      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
};

// Метод для выхода пользователя из системы
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true
  });

  res.status(200).redirect('/');
};
