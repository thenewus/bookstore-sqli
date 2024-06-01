from flask import Flask, request, jsonify
import joblib
import logging

app = Flask(__name__)

# Настройка логирования
logging.basicConfig(level=logging.DEBUG)

# Загрузка модели и векторизатора
try:
    model = joblib.load('ml_model/sql_injection_model.pkl')
    vectorizer = joblib.load('ml_model/vectorizer.pkl')
except Exception as e:
    logging.error(f"Error loading model/vectorizer: {e}")

# Маршрут для предсказания
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Получение данных из запроса
        data = request.json
        query = data['query']

        # Преобразование запроса в числовые признаки
        features = vectorizer.transform([query])

        # Предсказание с использованием модели
        prediction = model.predict(features)[0]
        prediction = int(prediction)
        logging.debug(f"Prediction: {prediction}")

        # Возврат результата предсказания
        return jsonify({'prediction': prediction})
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

# Запуск приложения
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)