const API = "http://127.0.0.1:5000/api";

// 1. Initial Load
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks(1);
    fetchAuthors(1);
    loadDropdowns(); 
});

// 2. Load Authors into the Dropdown for Adding Books
async function loadDropdowns() {
    try {
        const res = await fetch(`${API}/authors`);
        const data = await res.json();
        const dropdown = document.getElementById("bookAuthor");
        if (dropdown) {
            dropdown.innerHTML = '<option value="">Select an author</option>';
            (data.authors || []).forEach(a => {
                dropdown.innerHTML += `<option value="${a.id}">${a.name}</option>`;
            });
        }
    } catch (err) { console.error("Dropdown load failed:", err); }
}

/* ========== BOOK COLLECTION LOGIC ========== */
let currentPage = 1;
const perPage = 5;

async function fetchBooks(page = 1) {
    try {
        const response = await fetch(`${API}/books-with-pagination?page=${page}&per_page=${perPage}`);
        const data = await response.json();

        if (data.success) {
            renderBooksTable(data.books);
            currentPage = data.page;
            
            // Updates Total Books Stat Card directly from paginated data
            document.getElementById('statBooks').innerText = data.total_records || 0;
            document.getElementById('pageInfo').innerText = `Page ${data.page} of ${data.total_pages}`;
            
            document.getElementById('prevBtn').disabled = (currentPage <= 1);
            document.getElementById('nextBtn').disabled = (currentPage >= data.total_pages);
        }
    } catch (error) { console.error("Book fetch error:", error); }
}

function renderBooksTable(booksList) {
    const tableBody = document.getElementById('booksTable');
    if (!tableBody) return;
    tableBody.innerHTML = ''; 
    booksList.forEach(book => {
        tableBody.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author || 'Unknown'}</td>
                <td>${book.year || '-'}</td>
                <td>${book.isbn || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-warning" onclick="editBook(${book.id}, '${book.title}', '${book.year}', '${book.isbn}', ${book.author_id})">Edit</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteBook(${book.id})">Delete</button>
                </td>
            </tr>`;
    });
}

function changePage(step) { fetchBooks(currentPage + step); }

/* ========== AUTHOR REGISTRY LOGIC ========== */
/* ========== AUTHOR REGISTRY LOGIC ========== */
let currentAuthorPage = 1;
const authorsPerPage = 5;

async function fetchAuthors(page = 1) {
    try {
        const response = await fetch(`${API}/authors-with-pagination?page=${page}&per_page=${authorsPerPage}`);
        const data = await response.json();

        if (data.success) {
            renderAuthorsTable(data.authors);
            currentAuthorPage = data.page;

            // Updates the Page text below the table
            document.getElementById('authorPageInfo').innerText = `Page ${data.page} of ${data.total_pages}`;
            
            // Updates the Total Authors card at the top
            document.getElementById("statAuthors").innerText = data.total_records;
            
            document.getElementById('prevAuthorBtn').disabled = (currentAuthorPage <= 1);
            document.getElementById('nextAuthorBtn').disabled = (currentAuthorPage >= data.total_pages);
        }
    } catch (error) {
        console.error("Author pagination error:", error);
    }
}
function renderAuthorsTable(authorsList) {
    const tableBody = document.getElementById('authorsTable');
    if (!tableBody) return;
    tableBody.innerHTML = ''; 

    authorsList.forEach(author => {
        // Corrected with backticks ( ` ) below
        tableBody.innerHTML += `
            <tr>
                <td>${author.id}</td>
                <td>${author.name}</td>
                <td>${author.city || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-warning" 
                        onclick="editAuthor(${author.id}, '${author.name}', '${author.city}', '${author.bio}')">
                        Edit
                    </button>
                    <button class="btn btn-sm btn-outline-danger" 
                        onclick="deleteAuthor(${author.id})">
                        Delete
                    </button>
                </td>
            </tr>`;
    });
}
function changeAuthorPage(step) {
    fetchAuthors(currentAuthorPage + step);
}



/* ========== DATA REFRESH & CRUD ========== */
function refreshData() {
    fetchBooks(currentPage);
    fetchAuthors(currentAuthorPage);
    loadDropdowns();
}

function saveBook() {
    const id = document.getElementById("bookId").value;
    const data = {
        title: document.getElementById("bookTitle").value,
        author_id: document.getElementById("bookAuthor").value,
        year: document.getElementById("bookYear").value,
        isbn: document.getElementById("bookIsbn").value
    };
    if (!data.title || !data.author_id) return alert("Title and Author are required");

    fetch(id ? `${API}/books/${id}` : `${API}/books`, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(() => {
        ["bookId", "bookTitle", "bookYear", "bookIsbn"].forEach(i => document.getElementById(i).value = "");
        refreshData();
    });
}

// ... include your existing saveAuthor, editBook/Author, and deleteBook/Author functions here ...

/* ========== SEARCH LOGIC ========== */
async function filterBooks() {
    const searchVal = document.getElementById('searchInput').value;
    const sortVal = document.getElementById('sortSelect').value;
    const [column, direction] = sortVal.split('-');
    try {
        const response = await fetch(`${API}/books/search-sort?search=${searchVal}&sort_by=${column}&order=${direction}`);
        const data = await response.json();
        if (data.books && data.books.length > 0) {
            document.getElementById('noResultsMessage').classList.add('d-none');
            renderBooksTable(data.books);
            document.getElementById('pageInfo').innerText = "Search Results";
            document.getElementById('prevBtn').disabled = true;
            document.getElementById('nextBtn').disabled = true;
        } else {
            document.getElementById('booksTable').innerHTML = '';
            document.getElementById('noResultsMessage').classList.remove('d-none');
        }
    } catch (err) { console.error("Search failed:", err); }
}

function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('noResultsMessage').classList.add('d-none');
    fetchBooks(1);
}
