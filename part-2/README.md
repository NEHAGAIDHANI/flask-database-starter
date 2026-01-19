<<<<<<< HEAD
<<<<<<< HEAD
# Part 1: Basic Flask with SQLite Database

## One-Line Summary
Basic Flask app with SQLite connection and one simple table (Create & Read)

## What You'll Learn
- How to connect Flask to SQLite database
- Creating a database table with SQL
- Reading data from database (SELECT)
- Inserting data into database (INSERT)

## Prerequisites
- Flask basics (routes, templates, render_template)
- Completed flask-basics course

## How to Run
```bash
# Navigate to this folder
cd part-1

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install Flask (if not installed)
pip install flask

# Run the app
python app.py
```

## Test It
1. Open browser: http://localhost:5000
2. You'll see empty student list
3. Click "Add Sample Student" button
4. See the student appear in the table!

## Key Files
```
part-1/
├── app.py              <- Main Flask app with database code
├── templates/
│   └── index.html      <- Display students table
├── students.db         <- Database file (created when you run app)
└── README.md           <- You are here
```

## Key Concepts
| Concept | Explanation |
|---------|-------------|
| `sqlite3.connect()` | Opens connection to database file |
| `conn.execute()` | Runs SQL command |
| `conn.commit()` | Saves changes to database |
| `conn.close()` | Closes the connection |
| `fetchall()` | Gets all rows from SELECT query |

## Exercise
Try modifying `add_sample_student()` to add different students with different names!

## Next Step
→ Go to **part-2** to learn Update and Delete operations (full CRUD)
=======
# Part 2: Full CRUD Operations with HTML Forms

## One-Line Summary
Full CRUD operations (Create, Read, Update, Delete) with HTML forms

## What You'll Learn
- HTML forms with POST method
- Getting form data with `request.form`
- UPDATE and DELETE SQL commands
- `redirect()` and `url_for()` functions
- Flash messages for user feedback

## Prerequisites
- Complete part-1 first
- Understand basic database connection

## How to Run
```bash
cd part-2
python app.py
```
Open: http://localhost:5000

## CRUD Operations Explained

| Operation | HTTP Method | SQL Command | Route | Description |
|-----------|-------------|-------------|-------|-------------|
| **C**reate | POST | INSERT INTO | `/add` | Add new student |
| **R**ead | GET | SELECT | `/` | Display all students |
| **U**pdate | POST | UPDATE | `/edit/<id>` | Modify existing student |
| **D**elete | GET | DELETE | `/delete/<id>` | Remove student |

## Key Files
```
part-2/
├── app.py              <- CRUD operations
├── templates/
│   ├── index.html      <- List all students with Edit/Delete buttons
│   ├── add.html        <- Form to add new student
│   └── edit.html       <- Form to edit existing student
└── README.md
```

## New Concepts

### 1. Form Handling
```python
@app.route('/add', methods=['GET', 'POST'])
def add_student():
    if request.method == 'POST':  # Form submitted
        name = request.form['name']  # Get form data
```

### 2. Redirect After Action
```python
return redirect(url_for('index'))  # Go to home page
```

### 3. Flash Messages
```python
flash('Student added!', 'success')  # Show message once
```

## Exercise
1. Add a "Search" feature to find students by name
2. Add validation to check if email already exists before adding

## Next Step
→ Go to **part-3** to learn Flask-SQLAlchemy ORM (cleaner database code!)
>>>>>>> a9d1265 (Initial commit for part-2)
=======
# Flask Database Learning Repository

A step-by-step guide to learn Flask with databases - from basic SQLite to production-ready PostgreSQL/MySQL.

## Prerequisites
- Python basics
- Flask basics (routes, templates, Jinja2)

## Course Structure

| Part | Topic | One-Line Summary |
|------|-------|------------------|
| **part-1** | Basic SQLite | Basic Flask app with SQLite connection and one simple table (Create & Read) |
| **part-2** | Full CRUD | Full CRUD operations (Create, Read, Update, Delete) with HTML forms |
| **part-3** | SQLAlchemy ORM | Flask-SQLAlchemy ORM integration with models and relationships |
| **part-4** | REST API | REST API with Flask for database operations (JSON responses) |
| **part-5** | Production DB | Switching to PostgreSQL/MySQL with environment configuration |
| **part-6** | Homework | Product Inventory App - Apply everything you learned |

## Difficulty Progression

```
Easy ────────────────────────────────────► Advanced

part-1 → part-2 → part-3 → part-4 → part-5 → part-6
SQLite   CRUD     ORM      API      PostgreSQL  Homework
```

---

## Instructions

Read this README.md for overview.

Create virtual environment:
```bash
python -m venv venv
```

Activate venv and install dependencies:
```bash
# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate

# Install:
pip install flask flask-sqlalchemy
```

Read each `part-X/README.md` → Run `python app.py` → Test all routes.

**Homework:** Open `part-6/Instruction.md` — read the full requirements → Complete homework.

Stage and commit:
```bash
git add . && git commit -m "Completed Flask Database exercises"
```

Push to your repo:
```bash
git push -u origin main
```

---

## Folder Structure

```
flask-database-starter/
├── README.md               <- You are here
├── part-1/                 <- Basic SQLite
│   ├── app.py
│   ├── templates/
│   └── README.md
├── part-2/                 <- Full CRUD
│   ├── app.py
│   ├── templates/
│   └── README.md
├── part-3/                 <- SQLAlchemy ORM
│   ├── app.py
│   ├── templates/
│   └── README.md
├── part-4/                 <- REST API
│   ├── app.py
│   └── README.md
├── part-5/                 <- PostgreSQL/MySQL
│   ├── app.py
│   ├── .env.example
│   ├── templates/
│   └── README.md
└── part-6/                 <- Homework
    ├── app.py
    └── Instruction.md
```

---

## Key Concepts Covered

- SQLite database connection
- SQL commands (CREATE, SELECT, INSERT, UPDATE, DELETE)
- Flask request handling (GET, POST)
- HTML forms and form data
- Flask-SQLAlchemy ORM
- Database relationships (One-to-Many)
- REST API design
- JSON responses
- Environment variables
- PostgreSQL/MySQL configuration

## Tips for Learning

1. **Run each part** before reading the code
2. **Read comments** in the code - they explain everything
3. **Try the exercises** at the end of each README
4. **Break things** - see what errors look like
5. **Modify the code** - add your own features

## Common Issues

### Port already in use
```bash
# Change port in app.py
app.run(debug=True, port=5001)
```

### Module not found
```bash
# Make sure venv is activated and packages installed
pip install flask flask-sqlalchemy
```

### Database locked (SQLite)
```bash
# Close other connections or restart the app
```
>>>>>>> 7dfcb07e9c7dda7b0d30847f58021b8343497ada
