// Получаем ссылки на все элементы списка жанров
const genreLinks = document.querySelectorAll('.popup__ul li');

// Получаем все блоки с информацией о книгах
const bookBlocks = document.querySelectorAll('.library__container__block');

// Функция для скрытия всех книг и отображения книг выбранного жанра
function showBooksByGenre(genre) {
  // Проходим по всем книгам
  bookBlocks.forEach(bookBlock => {
    // Получаем жанр текущей книги
    const bookGenre = bookBlock.querySelector('.book-info__copy__genre').innerText.toLowerCase();
    // Проверяем, соответствует ли жанр текущей книги выбранному жанру
    if (bookGenre.includes(genre)) {
      // Если да, отображаем книгу
      bookBlock.style.display = 'flex';
    } else {
      // Если нет, скрываем книгу
      bookBlock.style.display = 'none';
    }
  });
}

// Добавляем обработчики событий для каждой ссылки на жанр
genreLinks.forEach(genreLink => {
  genreLink.addEventListener('click', function(event) {
    event.preventDefault();
    const genre = genreLink.innerText.toLowerCase();
    showBooksByGenre(genre); 
  });
});