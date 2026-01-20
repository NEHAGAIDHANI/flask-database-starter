const API_BASE_URL = 'http://127.0.0.1:5000/api'; // Update if your port is different

// Initialize data on load
document.addEventListener('DOMContentLoaded', () => {
    loadAuthors();
    loadBooks();
});

// ================= AUTHOR FUNCTIONS =================

async function loadAuthors() {
    try {
        const response = await fetch(`${API_BASE_URL}/authors`);
        const data = await response.json();
        
        const list = document.getElementById('author-list');
        const dropdown = document.getElementById('book-author-id');
        
        list.innerHTML = '';
        dropdown.innerHTML = '<option value="">-- Select an Author --</option>';

        data.authors.forEach(auth => {
            // Fill Table
            list.innerHTML += `
                <tr>
                    <td>${auth.id}</td>
                    <td>${auth.name}</td>
                    <td>${auth.email}</td>
                    <td>${auth.bio}</td>
                    <td>${auth.city}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editAuthor(${auth.id})"> Edit </button>
                        <button class="action-btn delete-btn" onclick="deleteAuthor(${auth.id})"> Delete </button>
                    </td>
                </tr>`; 
            
            // Fill Book Form Dropdown
            dropdown.innerHTML += `<option value="${auth.id}">${auth.name}</option>`;
        });
    } catch (err) { console.error("Error loading authors:", err); }
}

async function addAuthor() {
    const payload = {
        name: document.getElementById('auth-name').value,
        email: document.getElementById('auth-email').value,
        city: document.getElementById('auth-city').value,
        bio: document.getElementById('auth-bio').value
    };

    const response = await fetch(`${API_BASE_URL}/authors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        alert("Author added!");
        loadAuthors(); // Refresh UI
    }
}

// --------- Edit Author Function ---------
async function editAuthor(id) {
    // 1. Get existing data (Optional but better for user experience)
    const name = prompt("Enter new Name:");
    const email = prompt("Enter new Email:");
    const city = prompt("Enter new City:");
    const bio = prompt("Enter new Bio:");

    // If the user cancels or leaves name/email empty, stop here
    if (!name || !email) {
        alert("Name and Email are required for update.");
        return;
    }

    const payload = { name, email, city, bio };

    try {
        const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Author updated successfully!");
            loadAuthors(); // Refresh table
        } else {
            alert("Update failed: " + result.error);
        }
    } catch (err) {
        console.error("Error updating author:", err);
    }
}

// --------- Delete Author Function (Verify Spelling) ---------
async function deleteAuthor(id) {
    if (confirm("Are you sure you want to delete this author?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/authors/${id}`, { 
                method: 'DELETE' 
            });

            if (response.ok) {
                alert("Author deleted!");
                loadAuthors(); // Refresh UI
            } else {
                const result = await response.json();
                alert("Error: " + result.error);
            }
        } catch (err) {
            console.error("Error deleting author:", err);
        }
    }
}// --------- Edit Author Function ---------
async function editAuthor(id) {
    // 1. Get existing data (Optional but better for user experience)
    const name = prompt("Enter new Name:");
    const email = prompt("Enter new Email:");
    const city = prompt("Enter new City:");
    const bio = prompt("Enter new Bio:");

    // If the user cancels or leaves name/email empty, stop here
    if (!name || !email) {
        alert("Name and Email are required for update.");
        return;
    }

    const payload = { name, email, city, bio };

    try {
        const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Author updated successfully!");
            loadAuthors(); // Refresh table
        } else {
            alert("Update failed: " + result.error);
        }
    } catch (err) {
        console.error("Error updating author:", err);
    }
}

// --------- Delete Author Function (Verify Spelling) ---------

async function deleteAuthor(id) {
    if (confirm("Are you sure you want to delete this author?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/authors/${id}`, { 
                method: 'DELETE' 
            });

            if (response.ok) {
                alert("Author deleted!");
                loadAuthors(); // Refresh UI
            } else {
                const result = await response.json();
                alert("Error: " + result.error);
            }
        } catch (err) {
            console.error("Error deleting author:", err);
        }
    }
}

// ================= BOOK FUNCTIONS =================

async function loadBooks() {
    try {
        const response = await fetch(`${API_BASE_URL}/books`);
        const data = await response.json();
        const list = document.getElementById('book-list');
        list.innerHTML = '';

        data.books.forEach(book => {
            list.innerHTML += `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.year || 'N/A'}</td>
                    <td>${book.isbn || 'N/A'}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editBook(${book.id})"> Edit </button>
                        <button class="action-btn delete-btn" onclick="deleteBook(${book.id})"> Delete </button>
                    </td>
                </tr>`;
        });
    } catch (err) { console.error("Error loading books:", err); }
}

async function addBook() {
    const payload = {
        title: document.getElementById('book-title').value,
        author_id: document.getElementById('book-author-id').value, // Matches your ForeignKey
        year: document.getElementById('book-year').value,
        isbn: document.getElementById('book-isbn').value
    };

    const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        alert("Book registered!");
        loadBooks();
    } else {
        const err = await response.json();
        alert("Error: " + err.error);
    }
}

// --------- Edit Book Function ---------
async function editBook(id) {
    // 1. Collect new data via prompts
    const title = prompt("Enter new Book Title:");
    const year = prompt("Enter new Publication Year:");
    const isbn = prompt("Enter new ISBN:");

    // 2. Simple validation - Title is usually required in your backend
    if (!title) {
        alert("Book Title is required for update.");
        return;
    }

    const payload = {
        title: title,
        year: year ? parseInt(year) : null, // Convert to number if provided
        isbn: isbn
    };

    try {
        const response = await fetch(`${API_BASE_URL}/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Book updated successfully!");
            loadBooks(); // Refresh the table
        } else {
            alert("Update failed: " + (result.error || "Unknown error"));
        }
    } catch (err) {
        console.error("Error updating book:", err);
        alert("Failed to connect to the server.");
    }
}

// --------- Refined Delete Book Function ---------
async function deleteBook(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${id}`, { 
                method: 'DELETE' 
            });

            if (response.ok) {
                alert("Book deleted successfully!");
                loadBooks(); // Refresh the table
            } else {
                const result = await response.json();
                alert("Error: " + result.error);
            }
        } catch (err) {
            console.error("Error deleting book:", err);
        }
    }
}