let bookNameInput = document.getElementById("bookNameInput");
let bookUrlInput = document.getElementById("bookUrlInput");
let submitBtn = document.getElementById("submitBtn");
let deleteBtn = document.getElementById("deleteBtn");
let alertDivUrl = document.getElementById("alertDivUrl");
let alertDivName = document.getElementById("alertDivName");
let booksContainer;

if (localStorage.getItem("books") == null) {
  booksContainer = [];
} else {
  booksContainer = JSON.parse(localStorage.getItem("books"));
  displayBook();
}




function addBook() {

  if(validateUrlInput()&&validateUrlName()==true )
  {
    let book = {
        name: bookNameInput.value,
        url: bookUrlInput.value,
      };
      booksContainer.push(book);
      localStorage.setItem("books", JSON.stringify(booksContainer));
      eraseInputsValues();
      displayBook();

  }

  
}

function eraseInputsValues() {
  bookNameInput.value = "";
  bookUrlInput.value = "";
}

function displayBook() {
  let box = ``;
  for (let i = 0; i < booksContainer.length; i++) {
    box += `
             <tr>
                 <td>${booksContainer[i].name}</td>
                 <td><button type="button" class="btn btn-outline-success" id="visitBtn"><a target="_blank" href="${booksContainer[i].url}">visit</a></button></td>
                 <td><button type="button" class="btn btn-outline-success" onclick="deleteBook(${i})" id="deleteBtn">delete</button></td>
            </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = box;
}

function deleteBook(idexNumber) {
  booksContainer.splice(idexNumber, 1);
  localStorage.setItem("books", JSON.stringify(booksContainer));
  displayBook();
}

function validateUrlInput() {
  let regex =/^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  if (regex.test(bookUrlInput.value) == true) {
    bookUrlInput.classList.add("is-valid");
    bookUrlInput.classList.remove("is-invalid");
    alertDivUrl.classList.add("d-none");
    return true;
  } else {
    bookUrlInput.classList.add("is-invalid");
    bookUrlInput.classList.remove("is-valid");
    alertDivUrl.classList.remove("d-none");

    return false;
  }
}

function validateUrlName() {
  let regex =/^[a-z]{4,16}$/;

  if (regex.test(bookNameInput.value) == true) {
    bookNameInput.classList.add("is-valid");
    bookNameInput.classList.remove("is-invalid");
    alertDivName.classList.add("d-none");
    return true;
  } else {
    bookNameInput.classList.add("is-invalid");
    bookNameInput.classList.remove("is-valid");
    alertDivName.classList.remove("d-none");
    return false ;
  }
}

bookNameInput.addEventListener("keyup", function () {
  validateUrlName();
});

bookUrlInput.addEventListener("keyup", function () {
  validateUrlInput();
});

submitBtn.addEventListener("click", function () {
  addBook();
});
