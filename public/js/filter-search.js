function search() {
  let filter = document.getElementById("find").value.toUpperCase()
  
  let items = document.querySelectorAll(".product")


  items.forEach(item => {
    let title = item.querySelector(".book-info__copy__title").textContent.toUpperCase();
    let author = item.querySelector(".book-info__copy__author").textContent.toUpperCase();

    // Check if filter matches title or author
    if (title.includes(filter) || author.includes(filter)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}