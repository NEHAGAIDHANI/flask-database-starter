"""
<<<<<<< HEAD
Part 1: Basic Flask with SQLite Database
=========================================
Your first step into databases! Moving from hardcoded lists to real database.

What You'll Learn:
- Connecting Flask to SQLite database
- Creating a table
- Inserting data (Create)
- Reading data (Read)

Prerequisites: You should know Flask basics (routes, templates, render_template)
"""

from flask import Flask, render_template
import sqlite3  # Built-in Python library for SQLite database

app = Flask(__name__)

DATABASE = 'students.db'  # Database file name (will be created automatically)


# =============================================================================
# DATABASE HELPER FUNCTIONS
# =============================================================================

def get_db_connection():
    """Create a connection to the database"""
    conn = sqlite3.connect(DATABASE)  # Connect to database file
    conn.row_factory = sqlite3.Row  # This allows accessing columns by name (like dict)
=======
Part 2: Full CRUD Operations with HTML Forms
=============================================
Complete Create, Read, Update, Delete operations with user forms.

What You'll Learn:
- HTML forms with POST method
- request.form to get form data
- UPDATE and DELETE SQL commands
- redirect() and url_for() functions
- Flash messages for user feedback

Prerequisites: Complete part-1 first
"""

from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Required for flash messages

DATABASE = 'students2.db'


def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
>>>>>>> a9d1265 (Initial commit for part-2)
    return conn


def init_db():
<<<<<<< HEAD
    """Create the table if it doesn't exist"""
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            course TEXT NOT NULL
        )
    ''')  # SQL command to create table with 4 columns
    conn.commit()  # Save changes to database
    conn.close()  # Close connection


# =============================================================================
# ROUTES
=======
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS students (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name TEXT NOT NULL,
           email TEXT NOT NULL UNIQUE,
           course TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()


# =============================================================================R
# CREATE - Add new student
# =============================================================================

@app.route('/add', methods=['GET', 'POST'])  # Allow both GET and POST
def add_student():
    if request.method == 'POST':  # Form was submitted
        name = request.form['name']  # Get data from form field named 'name'
        email = request.form['email']
        course = request.form['course']

        conn = get_db_connection()

        # == 1. Check if the email already exists ======
        existing_student = conn.execute(
            'SELECT id FROM students WHERE email = ?', (email,)
        ).fetchone()

        if existing_student:
            conn.close()     
        # == 2. If it exists, show an error and don't add ======
            flash('Error: This email is already registered!', 'warning')
            return render_template('add.html')
        
        conn.execute(
            'INSERT INTO students (name, email, course) VALUES (?, ?, ?)',
            (name, email, course)
        )
        conn.commit()
        conn.close()
        flash('Student added successfully!', 'success')  # Show success message
        return redirect(url_for('index'))  # Go back to home page

    return render_template('add.html')  # GET request: show empty form


# =============================================================================
# READ - Display all students
>>>>>>> a9d1265 (Initial commit for part-2)
# =============================================================================

@app.route('/')
def index():
<<<<<<< HEAD
    """Home page - Display all students from database"""
    conn = get_db_connection()  # Step 1: Connect to database
    students = conn.execute('SELECT * FROM students').fetchall()  # Step 2: Get all rows
    conn.close()  # Step 3: Close connection
    return render_template('index.html', students=students)


@app.route('/add')
def add_sample_student():
    """Add a sample student to database (for testing)"""
    conn = get_db_connection()
    students = [
       ('Teena', 'teena@gmail.com', 'HTML'),
       ('Meena', 'meena@gmail.com', 'CSS'),
       ('Reena', 'reena@gmail.com', 'JAVA'),
       ('Heena', 'heena@gmail.com', 'Python'),
    ]
    conn.executemany ( 
       'INSERT INTO students (name,email,course)VALUES(?,?,?)',
       students
    )
    
    conn.commit()  # Don't forget to commit!
    conn.close()
    return 'Student added! <a href="/">Go back to home</a>'


if __name__ == '__main__':
    init_db()  # Create table when app starts
=======
    conn = get_db_connection()
    students = conn.execute('SELECT * FROM students ORDER BY id DESC').fetchall()  # Newest first
    conn.close()
    return render_template('index.html', students=students)


# =============================================================================
# UPDATE - Edit existing student
# =============================================================================

@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_student(id):
    conn = get_db_connection()

    if request.method == 'POST':  # Form submitted with new data
        name = request.form['name']
        email = request.form['email']
        course = request.form['course']

        conn.execute(
            'UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?',
            (name, email, course, id)  # Update WHERE id matches
        )
        conn.commit()
        conn.close()

        flash('Student updated successfully!', 'success')
        return redirect(url_for('index'))

    # GET request: fetch current data and show in form
    student = conn.execute('SELECT * FROM students WHERE id = ?', (id,)).fetchone()
    conn.close()
    return render_template('edit.html', student=student)


# =============================================================================
# DELETE - Remove student
# =============================================================================

@app.route('/delete/<int:id>')
def delete_student(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM students WHERE id = ?', (id,))  # Remove row
    conn.commit()
    conn.close()

    flash('Student deleted!', 'danger')  # Show delete message
    return redirect(url_for('index'))

@app.route('/search')
def search_students():
    # Get the search term from the URL (e.g., /search?name=John)
    query = request.args.get('query')
    conn = get_db_connection()
    students = conn.execute(
            'SELECT * FROM students WHERE name LIKE ?', 
            ('%' + query + '%',)
    ).fetchall()
    conn.close()
    return render_template('index.html', students=students)


if __name__ == '__main__':
    init_db()
>>>>>>> a9d1265 (Initial commit for part-2)
    app.run(debug=True)


# =============================================================================
<<<<<<< HEAD
# KEY CONCEPTS EXPLAINED:
# =============================================================================
#
# 1. SQLite: A lightweight database stored in a single file (.db)
#    - No server needed (unlike MySQL/PostgreSQL)
#    - Perfect for learning and small projects
#
# 2. Connection Flow:
#    connect → execute SQL → commit (if changing data) → close
#
# 3. SQL Commands Used:
#    - CREATE TABLE: Define table structure
#    - SELECT * FROM: Get all data
#    - INSERT INTO: Add new data
#
# 4. row_factory = sqlite3.Row:
#    - Without this: row[0], row[1] (access by index)
#    - With this: row['name'], row['email'] (access by column name)
=======
# CRUD SUMMARY:
# =============================================================================
#
# Operation | HTTP Method | SQL Command | Route Example
# ----------|-------------|-------------|---------------
# Create    | POST        | INSERT INTO | /add
# Read      | GET         | SELECT      | / or /student/1
# Update    | POST        | UPDATE      | /edit/1
# Delete    | GET/POST    | DELETE      | /delete/1
#
# =============================================================================
# NEW CONCEPTS:
# =============================================================================
#
# 1. methods=['GET', 'POST']
#    - GET: Display the form (empty or with current data)
#    - POST: Process the submitted form
#
# 2. request.form['field_name']
#    - Gets the value from HTML form input with that name
#
# 3. redirect(url_for('function_name'))
#    - Sends user to another page after action completes
#
# 4. flash('message', 'category')
#    - Shows one-time message to user
#    - Categories: 'success', 'danger', 'warning', 'info'
>>>>>>> a9d1265 (Initial commit for part-2)
#
# =============================================================================


# =============================================================================
# EXERCISE:
# =============================================================================
#
<<<<<<< HEAD
# Try modifying `add_sample_student()` to add different students with
# different names!
=======
# 1. Add a "Search" feature to find students by name
# 2. Add validation to check if email already exists before adding
>>>>>>> a9d1265 (Initial commit for part-2)
#
# =============================================================================
