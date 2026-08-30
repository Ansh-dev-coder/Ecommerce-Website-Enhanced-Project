<div align="center">

# 🛒 Ecommerce Platform (Full Stack)

**An enterprise-grade full-stack ecommerce application** built with Spring Boot, React, and PostgreSQL — featuring JWT authentication, role-based access control, Stripe payments, and a fully containerized, production-deployed backend.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-sb--ecom.netlify.app-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://sb-ecom.netlify.app/)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://sb-ecom.netlify.app/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://sb-ecom.netlify.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://sb-ecom.netlify.app/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://sb-ecom.netlify.app/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://sb-ecom.netlify.app/)

[🔴 Live Demo](https://sb-ecom.netlify.app/) · [Report Bug](https://github.com/Ansh-dev-coder/Ecommerce-Website-Enhanced-Project/issues) · [Request Feature](https://github.com/Ansh-dev-coder/Ecommerce-Website-Enhanced-Project/issues)

</div>

---

## 📖 Overview

A full-featured ecommerce web application supporting three roles — **User, Seller, and Admin** — with complete product browsing, cart, checkout, order management, and secure online payments. Built to mirror real-world production concerns: authentication, authorization, containerized deployment, and cloud database migration.

## ✨ Features

- 🔐 **JWT Authentication** with HttpOnly cookies for secure, stateless sessions
- 🛡️ **3-tier Role-Based Access Control** — `ROLE_USER`, `ROLE_SELLER`, `ROLE_ADMIN`
- 🛍️ **Product catalog** with categories, pagination, sorting, and search
- 🛒 **Cart & Checkout** flow with address management
- 📦 **Complete order lifecycle** — cart → order → payment → delivery tracking
- 💳 **Stripe integration** for secure online payments
- 🖼️ **Product image upload** (MultipartFile handling)
- 📊 **Seller dashboard** — manage own products and orders
- 🛠️ **Admin dashboard** — manage all products, orders, categories, and sellers
- 📑 **Swagger/OpenAPI** documentation for all 25+ REST endpoints
- 🐳 **Dockerized backend** with multi-stage builds
- ☁️ **Production deployment** — Render (backend) + Neon (PostgreSQL) + Netlify (frontend)

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java 17, Spring Boot 3.5, Spring Security 6, Spring Data JPA / Hibernate |
| **Frontend** | React, Redux, TailwindCSS |
| **Database** | PostgreSQL (Neon, serverless) |
| **Auth** | JWT (HttpOnly cookies), BCrypt |
| **Payments** | Stripe |
| **Docs** | Swagger / OpenAPI |
| **DevOps** | Docker (multi-stage build), Render, Netlify |

## 🏗️ Architecture

```
┌─────────────┐      HTTPS       ┌──────────────────┐      JDBC      ┌─────────────┐
│   React     │ ───────────────▶ │  Spring Boot API │ ─────────────▶ │  PostgreSQL │
│  (Netlify)  │ ◀─────────────── │    (Render,       │ ◀───────────── │   (Neon)    │
│             │   JWT / Cookies  │    Dockerized)     │                │             │
└─────────────┘                  └──────────────────┘                └─────────────┘
                                          │
                                          ▼
                                  ┌───────────────┐
                                  │    Stripe     │
                                  │   Payments    │
                                  └───────────────┘
```

## 📂 Project Structure

```
Ecommerce-Website-Enhanced-Project/
├── backend/                # Spring Boot application
│   ├── src/main/java/...   # Controllers, services, repositories, entities
│   ├── src/main/resources/ # application.properties
│   ├── Dockerfile
│   └── pom.xml
└── frontend/                # React application
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   └── api/
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL (local or a Neon/cloud instance)
- Docker (optional, for containerized run)
- A Stripe account (test mode API key)

### Backend Setup

```bash
cd backend
cp .env.example .env      # add your DB + Stripe credentials
mvn clean install -DskipTests
mvn spring-boot:run
```

Runs on `http://localhost:8080`. Swagger UI available at `/swagger-ui.html`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

### Environment Variables

**Backend** (`application.properties` / env vars):
```
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:5432/<db>
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
```

**Frontend** (`.env`):
```
VITE_BACK_END_URL=http://localhost:8080
```

### Run with Docker

```bash
cd backend
docker build -t sb-ecom-backend .
docker run -p 8080:8080 --env-file .env sb-ecom-backend
```

## 📑 API Documentation

Full interactive API documentation (25+ endpoints across Products, Cart, Orders, Categories, Address, and Auth modules) is available via Swagger:

```
http://localhost:8080/swagger-ui.html
```

## 🌐 Deployment

| Service | Platform |
|---|---|
| Backend API | [Render](https://render.com) (Dockerized Spring Boot) |
| Database | [Neon](https://neon.tech) (Serverless PostgreSQL) |
| Frontend | [Netlify](https://netlify.com) |

## 🔮 Roadmap

- [ ] Wishlist / favorites
- [ ] Product reviews & ratings
- [ ] Email notifications for order updates
- [ ] Admin analytics dashboard enhancements

## 👤 Author

**Ansh Saxena**
Full Stack Java Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ansh-saxena-067315327)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=netlify&logoColor=white)](https://ansh-portofolio.netlify.app/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:saxenaansh27@gmail.com)

## 📄 License

This project is available for viewing and educational purposes. Please reach out for reuse permissions.
