let myLibrary = [];
const table = document.querySelector('.table');
const button = document.querySelector('button');
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read === 'Y' ? true : false);
    myLibrary.push(book);
}

Book.prototype.toggle = function() {
    this.read = this.read ? false : true;
}

function render() {
    let text = `<tr>
    <th>Name</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Read</th>
    <th></th>
    <th></th>
    </tr>`
    let index = 1;
    const adding = myLibrary.map(book =>   `<tr data-index=${index}>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>
        <td><button data-index=${index} class="del">Delete</button></td>
        <td><button data-index=${index++} class="change">Change</td>
        </tr>`).join('');
    text += adding;
    table.innerHTML = text;
    for(let i = 0; i < myLibrary.length; i++) {
        document.querySelector(`tr[data-index="${i+1}"]>td>.del`).addEventListener('click', del);
        document.querySelector(`tr[data-index="${i+1}"]>td>.change`).addEventListener('click', change);
    }
}

function add() {
    let title = prompt('What is the title of the book?');
    let author = prompt('Who is the author of the book?');
    let pages = prompt('How many pages long is the book?');
    let read = prompt('Have you read the book? Y/N');
    addBookToLibrary(title, author, pages, read);
    localStorage.setItem('books', JSON.stringify(myLibrary));
    render();
}

function del() {
    const index = parseInt(this.dataset.index) - 1;
    myLibrary = [...myLibrary.slice(0, index), ...myLibrary.slice(index + 1)];
    console.log('hey')
    localStorage.setItem('books', JSON.stringify(myLibrary));
    render();
}

function change() {
    const index = parseInt(this.dataset.index) - 1;
    myLibrary[index].toggle();
    render();
}

function create() {
    myLibrary = JSON.parse(localStorage.getItem('books')) || [];
    console.log('yo');
    render();
}

function reset() {
    myLibrary = [];
    localStorage.setItem('books', JSON.stringify(myLibrary));
    render();
}

button.addEventListener('click', add);
document.querySelector('#reset').addEventListener('click', reset);
window.addEventListener('load', create);