# ⚡ MVC — Django + React Sample Project

A beginner-friendly sample project demonstrating the **MVC (Model–View–Controller)** architecture using:

- **Django** for backend logic and data handling
- **React** for frontend user interface

This repository is created purely for **learning and educational purposes** to understand project structure, MVC flow, and basic frontend-backend organization.

> ⚠️ Note: This is not a production-ready application.  
> It is only a structural and conceptual demo project.

---

# 📌 About the Project

This project helps beginners understand how:

- Django manages backend logic
- React handles frontend UI
- MVC concepts can be mapped in modern web development
- Frontend and backend folders are organized separately

It provides a clean folder structure for exploring:
- Django apps
- React components
- Routing basics
- MVC architecture concepts

---

# 🏗️ Project Structure

```bash
MVC/
│
├── Backend/                    # Django backend
│
│   ├── Approval/               # Sample Django app
│   ├── Backend/                # Django project settings & URLs
│   ├── Quiz/                   # Sample Django app
│   ├── myapp/                  # Sample Django app
│   ├── db.sqlite3              # SQLite database
│   └── manage.py               # Django management file
│
└── frontend/                   # React frontend
    │
    ├── public/                 # Static/public assets
    ├── src/
    │   ├── components/         # React components
    │   ├── pages/              # React pages
    │   ├── App.js
    │   └── index.js
    │
    ├── package.json
    └── package-lock.json
```

---

# 🚀 Features

✅ Demonstrates MVC architecture basics  
✅ Separate frontend and backend structure  
✅ Beginner-friendly organization  
✅ Sample Django apps included  
✅ React component structure  
✅ Basic routing examples  
✅ SQLite database support  
✅ Educational project setup  

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Python | Backend Programming |
| Django | Backend Framework |
| React.js | Frontend Library |
| SQLite | Database |
| HTML/CSS | UI Design |
| JavaScript | Frontend Logic |

---

# 🎯 Purpose of This Repository

This repository is created for:

- Understanding MVC concepts
- Learning Django project structure
- Exploring React folder organization
- Practicing frontend & backend separation
- Understanding routing and views
- Educational demonstrations

This project focuses mainly on:
- Structure
- Flow
- Architecture concepts

rather than full application functionality.

---

# 🧩 MVC Architecture Mapping

| MVC Part | Django / React Equivalent |
|----------|---------------------------|
| Model | Django Models (`models.py`) |
| View | React Components / Django Templates |
| Controller | Django Views (`views.py`) |

---

# ⚙️ Installation & Setup

## 📥 Clone the Repository

```bash
git clone https://github.com/Sujanprasad/MVC.git
cd MVC
```

---

# 🔧 Backend Setup (Django)

## Navigate to Backend Folder

```bash
cd Backend
```

## Create Virtual Environment (Optional)

### Windows
```bash
python -m venv .venv
.venv\Scripts\activate
```

### Linux / macOS
```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

## Install Django

```bash
pip install django
```

---

## Run Migrations

```bash
python manage.py migrate
```

---

## Start Django Server

```bash
python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000/
```

---

# 💻 Frontend Setup (React)

## Navigate to Frontend Folder

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Start React Development Server

```bash
npm start
```

Frontend runs at:

```text
http://localhost:3000/
```

---

# 📘 Learning Outcomes

By exploring this project, you can learn:

- MVC architecture basics
- Django project structure
- React frontend structure
- Backend & frontend separation
- Routing concepts
- Component organization
- Basic full-stack workflow

---

# 📌 Important Notes

⚠️ This is NOT a complete application  
⚠️ No advanced API integration included  
⚠️ Mainly focused on architecture understanding  
⚠️ Created for educational purposes only  
⚠️ Not intended for production deployment  

---

# 📂 Useful Commands

## Django Commands

### Run Server
```bash
python manage.py runserver
```

### Create Migrations
```bash
python manage.py makemigrations
```

### Apply Migrations
```bash
python manage.py migrate
```

### Create Superuser
```bash
python manage.py createsuperuser
```

---

## React Commands

### Install Packages
```bash
npm install
```

### Start Development Server
```bash
npm start
```

### Build React App
```bash
npm run build
```

---

# 🤝 Contributing

Contributions are welcome for educational improvements.

Steps:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

# ⭐ Support

If you found this repository helpful, consider giving it a ⭐ on GitHub!

---

# 👨‍💻 Author

## Sujan Prasad

B.Tech CSIT Student  
Interested in Python, Django, React, Web Development & Open Source

---

# 📜 License

This project is open-source and available under the MIT License.
