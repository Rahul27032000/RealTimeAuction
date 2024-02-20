# Real Time Auction Platform

This project is a real-time bidding platform built with React for the frontend, Node.js for the backend, and Redis for pub/sub functionality. The platform facilitates real-time auctions and bidding, providing a seamless and dynamic experience for users engaged in bidding actions. WebSocket is employed for real-time communication, ensuring instant updates and notifications.

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

## Key Features

- Real-time bidding: Experience auctions and bidding in real-time.
- Utilize WebSocket for instant communication and updates.
- Build a robust backend server to manage auctions and bidding logic.
- Redis pub/sub: Leverage Redis for pub/sub functionality, enabling scalable real-time communication.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Rahul27032000/RealTimeAuction
```

Go to the project directory

```bash
  cd RealTimeAuction
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd server/
  npm run dev
```

Start the client

```bash
  cd client/
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_KEY`

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility

## License

[MIT](https://choosealicense.com/licenses/mit/)
