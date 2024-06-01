const express = require("express")
const authController = require("../controllers/auth")
const predictSQLInjection = require('../ml_model/ml_model')

const router = express.Router()

// Маршрут для регистрации пользователя
router.post('/signup', authController.signup)

// Маршрут для входа пользователя в систему
router.post('/login', authController.login );

// Маршрут для тестирования SQL-инъекций
router.post('/test-sql-injection', async (req, res) => {
  try {
    const query = req.body.query;
    const isMalicious = await predictSQLInjection(query);
    if (isMalicious) {
      return res.status(400).send('Malicious query detected');
    } else {
      return res.status(200).send('Query is safe');
    }
  } catch (error) {
    console.error('Error predicting SQL injection:', error);
    return res.status(500).send('Server error');
  }
});

// Маршрут для выхода пользователя из системы
router.get('/logout', authController.logout );

module.exports = router