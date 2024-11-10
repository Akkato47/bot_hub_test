# Bothub Test

## 📋 Contents

- [Checklist](#-checklist)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [API Workflow](#-api-workflow)

---

## ✔ Checklist

Implemented features in the project:

- [x] Express.
- [x] PostgreSQL.
- [x] Drizzle ORM.
- [x] Basic database migrations configured.
- [x] Redis.
- [x] Dockerfile and Docker Compose.
- [x] Database schemas ready.
- [x] Connected with bothub API.
- [x] Configured Swagger.

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Akkato47/express-drizzle-redis-starter.git
   cd express-drizzle-redis-starter
   ```

2. Ensure that **Docker** and **Docker Compose** are installed on your machine. This project uses Docker for containerizing services.

## 🔧 Environment Setup

Create a `.env` file in the root folder of the project and fill it with the values based on the example below or the `.env.example`:

```env
PORT=8000
NODE_ENV=dev

DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=1234
DATABASE_NAME=bothub
DATABASE_URL=postgresql://postgres:1234@127.0.0.1:5432/bothub

JWT_ACCESS_SECRET=secret1
JWT_REFRESH_SECRET=secret2

REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_HOST=localhost
```

## ▶️ Running the Application

You can start the project using Docker Compose:

```bash
docker-compose up -d --build
```

After a successful start, the project will be available at: [http://localhost:8000/api](http://localhost:8000/api) or documentation at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🔄 API Workflow

Below is the recommended workflow to start interacting with the application via Swagger UI:

### 1. **User Registration**

- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new user by providing `firstName`, `lastName`, `mail`, `phone`, `role` (USER/ADMIN), and `password`.
- **Sample Payload**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "mail": "john.doe@example.com",
    "phone": "1234567890",
    "role": "USER",
    "password": "securepassword"
  }
  ```

### 2. **Log in**

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticate with `mail` and `password` to receive tokens.
- **Sample Payload**:
  ```json
  {
    "mail": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

### 3. **Create Transaction (Top-Up Balance)**

- **Endpoint**: `/transaction/my/make`
- **Method**: `POST`
- **Description**: Create a transaction to add balance. Requires `amount`, `type` (e.g., PURCHASE), and `description`.
- **Sample Payload**:
  ```json
  {
    "amount": 100,
    "type": "PURCHASE",
    "description": "Initial top-up"
  }
  ```

### 4. **Create Model**

- **Endpoint**: `/model/create`
- **Method**: `POST`
- **Description**: Define a new model for AI processing. Requires `name`, `description`, `token_cost`, `api_link`, and `auth_token`.
- **Sample Payload**:
  ```json
  {
    "name": "TestModel",
    "description": "AI Model for testing",
    "token_cost": 10,
    "api_link": "https://api.example.com/model",
    "auth_token": "secure_auth_token"
  }
  ```

### 5. **Create Chat**

- **Endpoint**: `/chat/create`
- **Method**: `POST`
- **Description**: Initializes a new chat instance for conversation.
- **Sample Response**:
  ```json
  {
    "chatUid": "unique_chat_uid"
  }
  ```

### 6. **Send a Message**

- **Endpoint**: `/chat/message`
- **Method**: `POST`
- **Description**: Send a message in an existing chat. Requires `role` (e.g., user), `message`, `chatUid`, and `modelUid`.
- **Sample Payload**:
  ```json
  {
    "role": "user",
    "message": "Hello, how can I assist you today?",
    "chatUid": "unique_chat_uid",
    "modelUid": "unique_model_uid"
  }
  ```

## 📡 Establishing an SSE Connection

1. **Open SSE Connection for Chat Updates**

   - **Endpoint**: `/chat/sse`
   - **Method**: `GET`
   - **Description**: Opens an SSE (Server-Sent Events) connection to receive real-time updates for all chats.

2. **Open SSE Connection for Specific Chat**

   - **Endpoint**: `/chat/sse/{chatUid}`
   - **Method**: `GET`
   - **Description**: Opens an SSE connection to receive real-time updates for a specific chat.

3. **Open SSE Connection for your Balance**

   - **Endpoint**: `/transaction/balance-sse`
   - **Method**: `GET`
   - **Description**: Opens an SSE connection to receive real-time updates for your balance.
