# Library Management System

## Project Description

The Library Management System is a robust backend solution designed to streamline the operations of a library. It provides a set of RESTful endpoints that allow library staff and members to manage books, memberships, and borrowing activities efficiently.

## Live URL

https://library-management-weld-seven.vercel.app

## Technology Stack & Packages

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/jakariamasum/Library_Management_Server
   cd Library_Management_Server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your PostgreSQL database and update the connection string in the `.env` file:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/library_db?schema=public"
   ```

4. Run Prisma migrations:

   ```
   npx prisma migrate dev
   ```

5. Start the development server:
   ```
   npm run start:dev
   ```

## Key Features & Functionality

### 1. Book Management

- Create new books
- Retrieve all books or a specific book by ID
- Update book information
- Delete books from the system

### 2. Member Management

- Register new library members
- Retrieve all members or a specific member by ID
- Update member information
- Remove members from the system

### 3. Borrowing System

- Borrow books
- Return books
- Track overdue books

### 4. Error Handling

- Comprehensive error responses for various scenarios

## API Endpoints

### Books

- POST /api/books - Create a new book
- GET /api/books - Retrieve all books
- GET /api/books/:bookId - Retrieve a specific book
- PUT /api/books/:bookId - Update a book
- DELETE /api/books/:bookId - Delete a book

### Members

- POST /api/members - Create a new member
- GET /api/members - Retrieve all members
- GET /api/members/:memberId - Retrieve a specific member
- PUT /api/members/:memberId - Update a member
- DELETE /api/members/:memberId - Delete a member

### Borrowing

- POST /api/borrow - Borrow a book
- POST /api/return - Return a book
- GET /api/borrow/overdue - Retrieve overdue books

## Known Issues/Bugs

Currently, there are no known issues or bugs. If you encounter any problems, please open an issue in the GitHub repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
