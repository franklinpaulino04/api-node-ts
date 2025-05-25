// generate readme the this project
# API Node TypeScript
This is a Node.js API project written in TypeScript. It provides a RESTful API for managing resources.
## Features
- TypeScript for type safety
- Express.js for building the API
- MYSQL for the database
- ESLint for linting
- Prettier for code formatting
- dotenv for environment variable management
- CORS for cross-origin resource sharing
- Compression
- Validation
- Error handling



## Getting Started
### Prerequisites
- Node.js
- npm or yarn
- MySQL
- Postman or any API testing tool
- Elasticsearch (optional)
- Elasticsearch (optional)

### Installation
1. Clone the repository:
   ```bash
   git clone
    cd api-node-ts
    ```
2. Install dependencies:
3. ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables:
   ```bash
    NODE_ENV="development"
    DB_HOST="localhost"
    DB_PORT="3306"
    DB_USERNAME="root"
    DB_PASSWORD="password"
    DB_NAME="api_node_ts"
    JWT_SECRET="your_jwt_secret"
    ```
5. Create a MySQL database and update the `.env` file with your database credentials.
6. Run the following command to create the database:
   ```bash
   npx typeorm migration:run
   ```
   This will create the necessary tables in your MySQL database.
7. Run the migrations to create the necessary tables:
   ```bash
   npm run migration:generate
   ```

7. ```bash
   npm run dev
   ```
8. The API will be running at `http://localhost:3000`.
9. You can use Postman or any API testing tool to test the API endpoints.