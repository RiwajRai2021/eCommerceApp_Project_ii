<br><br>
<h1>E-Commerce Web Application</h1>
The E-Commerce Web Application is a full-stack platform that allows 
users to browse products across multiple categories, search the catalog, 
add items to cart, and complete purchases seamlessly.
<br><br>

**Scope: Solo project – Designed and developed full frontend and backend**

🎥 Demo Video
https://drive.google.com/file/d/1qYDMjtVOd14jyRVqVKpqRQrdvl0gc_xt/view?usp=sharing

![App creenshot](https://github.com/RiwajRai2021/eCommerceApp_Project_ii/blob/main/screenshot_ecommerce_app.png)
<br><br>

## 📑 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Author](#author)

## Overview

The E-Commerce Web Application is a full-stack platform that allows
users to browse products across multiple categories, search the catalog,
add items to cart, and complete purchases seamlessly.

**Scope: Solo project – Designed and developed full frontend and backend**

## Features

- 🛍️ Browse products across multiple categories (Books, Coffee Mugs, Mouse Pads, Luggage Tags)
- 🔍 Search products by name
- 🛒 Add items to shopping cart
- 💳 Complete purchases seamlessly
- 🖥️ Responsive and clean user interface

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Angular | UI Framework |
| TypeScript | Programming Language |
| HTML & CSS | Structure & Styling |

### Backend
| Technology | Purpose |
|------------|---------|
| Java | Programming Language |
| Spring Boot | Backend Framework |
| Spring Data JPA | Database ORM |
| REST API | Communication |

### Database
| Technology | Purpose |
|------------|---------|
| MySQL | Relational Database |

### Clone the Repository
```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
```
### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Configure your MySQL database in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. Run the backend:
```bash
./mvnw spring-boot:run
```

The backend will run at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
ng serve
```

The app will run at `http://localhost:4200`


