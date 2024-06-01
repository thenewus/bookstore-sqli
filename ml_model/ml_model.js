const axios = require('axios');

// Функция для предсказания SQL-инъекций
async function predictSQLInjection(query) {
    try {
        // Отправка POST-запроса на сервер Flask для предсказания
        const response = await axios.post('http://localhost:5000/predict', { query });
        // Вывод предсказания в консоль
        console.log("Prediction from Flask:", response.data.prediction);
        // Возвращает true, если предсказание равно 1 (запрос зловредный), иначе false
        return response.data.prediction === 1;
    } catch (error) {
        // Вывод ошибки в консоль
        console.error(error);

        // Возвращает false в случае ошибки
        return false;
    }
}

// Экспорт функции для использования в других модулях
module.exports = predictSQLInjection;