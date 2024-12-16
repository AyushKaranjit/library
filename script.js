const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  const tableBody = document.querySelector("#libraryTable tbody");
  tableBody.innerHTML = "";
  myLibrary.forEach((book) => {
    const row = document.createElement("tr");

    Object.values(book).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
addBookToLibrary("The Silmarillion", "J.R.R. Tolkien", 365, false);
addBookToLibrary("The Children of Húrin", "J.R.R. Tolkien", 313, true);

// Create a div with the class "button-container"
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");

// Create a "New Book" button
const newBookButton = document.createElement("button");
newBookButton.classList.add("addBookBtn");
newBookButton.textContent = "New Book";

// Append the button to the div
buttonContainer.appendChild(newBookButton);

// Append the div to the body
document.body.appendChild(buttonContainer);

// Create a form inside a <dialog> element for inputting book details
const newBookDialog = document.createElement("dialog");
newBookDialog.innerHTML = `
  <div id="form-container">
    <form id="newBookForm">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required><br>
      <label for="author">Author:</label>
      <input type="text" id="author" name="author" required><br>
      <label for="pages">Number of Pages:</label>
      <input type="number" id="pages" name="pages" required><br>
      <label for="read">Read:</label>
      <input type="checkbox" id="read" name="read"><br>
      <button type="submit">Add Book</button>
      <button type="button" id="cancelButton">Cancel</button>
    </form>
  </div>
`;
document.body.appendChild(newBookDialog);

// Show the dialog when the "New Book" button is clicked
newBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

// Close the dialog when the "Cancel" button is clicked
const cancelButton = newBookDialog.querySelector("#cancelButton");
cancelButton.addEventListener("click", () => {
  newBookDialog.close();
});

// Handle form submission
const newBookForm = document.getElementById("newBookForm");
newBookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the form data
  const title = newBookForm.title.value;
  const author = newBookForm.author.value;
  const pages = parseInt(newBookForm.pages.value, 10);
  const read = newBookForm.read.checked;

  // Add the new book to the library
  addBookToLibrary(title, author, pages, read);

  // Close the dialog
  newBookDialog.close();

  // Reset the form
  newBookForm.reset();
});
