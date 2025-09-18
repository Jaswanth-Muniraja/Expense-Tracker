# Expense-Tracker
A full-stack Expense Tracker web application built using the MERN stack (MongoDB, Express.js, React, Node.js). This app allows users to securely track their expenses, visualize spending patterns with charts and emojis, and manage their financial data with ease.

---

## 🚀 Features

- 🔐 **User Authentication** using JWT and bcrypt
- 📊 **Visual Analytics** with Pie Charts, Bar Graphs, and Emojis
- 📝 Add, edit, and delete expenses
- 📅 Track expenses by category and date
- 📂 Organized into separate `frontend` and `backend` folders
- ⚡ Run both servers with a single command: `npm run dev`

---

## 🛠️ Tech Stack

| Layer       | Technology Used           |
|-------------|----------------------------|
| Frontend    | React, Chart.js, Emoji Picker |
| Backend     | Node.js, Express.js        |
| Database    | MongoDB + Mongoose         |
| Auth        | JWT, bcrypt                |
| Styling     | CSS, Bootstrap             |

---

## 🧪 How to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   
2. **Install Dependencies**

    ```bash
    cd backend
    npm install
    
    cd ../frontend
    npm install

3. **Set Up Environment Variables**
   Create a .env file in the backend folder with:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    Run the App From the root folder:
    
    ```bash
    npm run dev
    This will concurrently run both frontend and backend servers.

## 🔍 Visuals & Charts
🥧 Pie Charts for category-wise spending

## 📊 Bar Graphs for monthly trends

## 😄 Emojis to make tracking fun and intuitive

## 🔐 Authentication
Passwords are hashed using bcrypt

Secure login and signup with JWT tokens

Protected routes for user-specific data

## 📬 Contributions
Feel free to fork the repo, submit pull requests, or open issues. Whether it's adding new chart types, improving UI, or optimizing backend logic—your input is welcome!
