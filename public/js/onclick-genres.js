document.addEventListener("DOMContentLoaded", function() {
  const popupLink = document.querySelector('.popup__link');
  const popupShowUl = document.querySelector('.popup__show-ul');

  // Флаг, который будет отслеживать состояние отображения списка
  let isPopupUlVisible = false;

  // Функция для скрытия или отображения списка жанров
  function togglePopupUl() {
    if (isPopupUlVisible) {
      popupShowUl.style.display = 'none'; // Скрываем список жанров
    } else {
      popupShowUl.style.display = 'block'; // Показываем список жанров
    }
    isPopupUlVisible = !isPopupUlVisible; // Инвертируем флаг
  }

  // Обработчик события для клика по кнопке "Genres"
  popupLink.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем стандартное действие ссылки
    togglePopupUl(); // Вызываем функцию для скрытия или отображения списка жанров
  });

  // Обработчик события для клика по документу для скрытия списка при клике вне него
  document.addEventListener('click', function(event) {
    const isClickedInsidePopup = popupLink.contains(event.target) || popupShowUl.contains(event.target);
    if (!isClickedInsidePopup && isPopupUlVisible) {
      togglePopupUl(); // Вызываем функцию для скрытия списка жанров, если оно отображается
    }
  });
});