# Product API

## Overview

This project is a Node.js and MySQL-based application that provides user registration, user login, JWT token verification, and CRUD operations for products. Users need to be authenticated to perform certain actions.

## Features

- User Registration:
  - While registering, the user's password is encrypted using a 'pre' method.

- User Login:
  - User authentication through login.

- JWT Token Verification:
  - JWT (JSON Web Token) is used to verify user identity.

- Get All Users:
  - User authentication is required to access user details.

- Create Products:
  - User authentication is necessary to add new products.

- Read All Products:
  - User authentication is required to view the list of products.

- Update Product:
  - User authentication is necessary to modify product information.

- Delete Product:
  - User authentication is required to delete a product.

## Technologies Used

- Node.js
- MySQL
- JWT (JSON Web Token)

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a .env file for environment variables.

## Environment Variables (.env)

Create a `.env` file in the root directory and set the following environment variables:

NODE_ENV=dev
NODE_PORT=8000
API_KEY=m1O2kL9b1H4mS9M3w1s6F1dM1q0LzoMn

DEFAULT_DB=mysql

DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=product_demo
DB_USERNAME=root
DB_PASSWORD=root
PASSWORD_SALT_ROUND=12
DIALECT=mysql

ACCESS_TOKEN_SECRET=random
ACCESS_TOKEN_EXPIRED=86400


## Usage

1. Run the application using `npm run dev`.
2. Access the application through your preferred web browser.


