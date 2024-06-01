import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
import joblib

# Загрузка данных из CSV файла, пропуск строк с ошибками
data = pd.read_csv('Modified_SQL_Dataset.csv', on_bad_lines='skip')

# Преобразование меток в целые числа и удаление пробелов
data['Label'] = data['Label'].astype(str).str.strip().astype(int)

# Сохранение очищенных данных в новый CSV файл
data.to_csv('Cleaned_SQL_Dataset.csv', index=False)

# Удаление строк с пропущенными значениями
data = data.dropna()

# Разделение данных на признаки (X) и метки (y)
X = data['Query']
y = data['Label']

# Преобразование текстовых запросов в числовые признаки с использованием TF-IDF
vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X)

# Разделение данных на обучающую и тестовую выборки
X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)

# Обучение модели случайного леса
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Предсказание на тестовой выборке
y_pred = model.predict(X_test)

# Вычисление метрик точности, прецизионности, полноты и F1-score
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, pos_label=1)
recall = recall_score(y_test, y_pred, pos_label=1)
f1 = f1_score(y_test, y_pred, pos_label=1)

# Печать метрик модели
print('')
print(f"Model Evaluation Metrics:\n")
print(f"Accuracy : {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall   : {recall:.4f}")
print(f"F1 Score : {f1:.4f}\n")

# Печать подробного отчета о классификации
print("Detailed Classification Report:")
print(classification_report(y_test, y_pred))

# Сохранение метрик модели в текстовый файл
with open('ml_model/evaluation_metrics.txt', 'w') as f:
    f.write(f"Model Evaluation Metrics:\n\n")
    f.write(f"Accuracy : {accuracy:.4f}\n")
    f.write(f"Precision: {precision:.4f}\n")
    f.write(f"Recall   : {recall:.4f}\n")
    f.write(f"F1 Score : {f1:.4f}\n\n")
    f.write("Detailed Classification Report:\n")
    f.write(classification_report(y_test, y_pred))

# Сохранение обученной модели и векторизатора в файлы
joblib.dump(model, 'ml_model/sql_injection_model.pkl')
joblib.dump(vectorizer, 'ml_model/vectorizer.pkl')