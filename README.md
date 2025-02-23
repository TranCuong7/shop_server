# Shop Server

## Introduction

The **Shop Server** project is a backend system built with **Node.js** and **Express.js**, utilizing **Sequelize** with **MySQL**. Key features:

- **User authentication** with JWT
- **Product, order, and user management**
- **Role-based access control**
- **Image upload & processing** with Multer & Sharp
- **Automated job scheduling** using node-cron
- **Data pagination** with express-paginate

## Installation

```sh
git clone https://github.com/TranCuong7/shop_server.git
cd shop_server
npm install
```

Configure environment variables in `.env` based on `.env.example`.

Run migrations and seed data:

```sh
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Start the server:

```sh
npm start
```

## Technologies Used

- **Node.js + Express.js**
- **Sequelize ORM + MySQL**
- **JWT (jsonwebtoken)**
- **Multer + Sharp** (Image upload & processing)
- **Node-cron** (Scheduled tasks)
- **Express-validator** (Data validation)

## License

Developed by **TranCuong**.
