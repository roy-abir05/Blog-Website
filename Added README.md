# InsightSphere - A Modern Blog Platform

## Overview

InsightSphere is a feature-rich blog platform designed for seamless content creation and sharing. Built with React for the frontend and Spring Boot for the backend, it provides a robust and scalable solution for bloggers and content creators. PostgreSQL is used as the database to ensure efficient data management.

## Features

- **User Authentication**: Secure login and registration system.
- **Rich Text Editor**: Create and format blog posts effortlessly.
- **Categories & Tags**: Organize content efficiently.
- **Comment System**: Engage readers through discussions.
- **SEO Optimization**: Boost search engine visibility.
- **Dark Mode**: User-friendly theme toggle.
- **Social Sharing**: Share posts with a single click.

## Tech Stack

### Frontend

- React
- Redux (State Management)
- Tailwind CSS (Styling)
- Axios (API Calls)

### Backend

- Spring Boot
- Spring Security (Authentication & Authorization)
- Hibernate (ORM)
- PostgreSQL (Database)

### Deployment

- Frontend: Vercel / Netlify
- Backend: AWS / Heroku
- Database: PostgreSQL on AWS RDS

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js & npm
- Java (JDK 17+)
- PostgreSQL
- Maven

### Installation

#### Clone the Repository:

```sh
git clone https://github.com/yourusername/InsightSphere.git
cd InsightSphere
```

#### Backend Setup:

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Configure the `application.properties` file with PostgreSQL credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/yourdbname
   spring.datasource.username=yourusername
   spring.datasource.password=yourpassword
   ```
3. Build and run the backend:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

#### Frontend Setup:

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm start
   ```

## API Endpoints

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | /api/posts      | Fetch all blog posts |
| GET    | /api/posts/{id} | Fetch a single post  |
| POST   | /api/posts      | Create a new post    |
| PUT    | /api/posts/{id} | Update a post        |
| DELETE | /api/posts/{id} | Delete a post        |
