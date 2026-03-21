# 🚀 CodeFolio – Developer Portfolio Builder

> A no-code/low-code portfolio builder for developers to create and share stunning personal websites in minutes.

---

## 📌 Overview

In today’s tech ecosystem, a strong portfolio is as important as a resume. However, many developers struggle to build and deploy their own portfolio websites due to time constraints and design challenges.

**CodeFolio** solves this problem by acting as a **developer-focused website builder**, similar to platforms like Wix and Squarespace, but tailored specifically for engineers.

Users can input their professional details (projects, skills, bio, links), and CodeFolio dynamically generates a **beautiful, shareable portfolio website**.

---

## 🎯 Key Features

### 🛠️ Dashboard (CMS)

* Add and manage profile details
* Create and edit projects
* Organize skills by category
* Select portfolio templates
* (Bonus) Live preview while editing

### 🎨 Dynamic Template Engine

* Multiple portfolio themes (Minimal, Cyberpunk)
* Template switching using `templateId`
* Data-driven UI rendering

### 🌐 Public Portfolio

* Unique user URLs:

  ```
  codefolio.com/:username
  ```
* Fully responsive design
* SEO optimized pages

### 📧 Contact System

* Built-in contact form
* Secure email forwarding using Nodemailer

### 💎 Premium Features (Planned)

* Custom domains
* Pro badge
* Advanced customization

---

## 🧱 Tech Stack

### Frontend

* React
* React Router
* React Hook Form
* React Helmet

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Tools & Services

* Nodemailer
* Git & GitHub
* Vercel / Render (Deployment)

---

## 🏗️ Project Architecture

```
codefolio/
│
├── client/          # React Frontend
│   ├── components/
│   ├── pages/
│   ├── templates/
│   └── utils/
│
├── server/          # Node.js Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── config/
│
└── README.md
```

---

## 🧩 Core Concepts

### 🔹 Template Engine

Dynamic rendering based on selected template:

```js
const templateMap = {
  minimal: MinimalLayout,
  cyberpunk: CyberpunkLayout
};

const PortfolioLayout = templateMap[user.templateId];
return <PortfolioLayout data={userData} />;
```

---

### 🔹 Routing System

* Dashboard Routes:

  ```
  /dashboard
  /login
  /register
  ```

* Public Portfolio:

  ```
  /:username
  ```

Backend handles:

```js
GET /:username
```

---

### 🔹 Data Model (Simplified)

```js
{
  username,
  profile: { name, bio, socialLinks },
  skills: [{ category, items }],
  projects: [{ title, techStack, links }],
  templateId
}
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/codefolio.git
cd codefolio
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

Run server:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🚀 Deployment

* Frontend: Vercel
* Backend: Render / Railway
* Database: MongoDB Atlas

---

## 🧪 Testing Checklist

* ✅ Responsive design (mobile + desktop)
* ✅ API error handling
* ✅ Form validation
* ✅ SEO metadata
* ✅ Performance optimization

---

## 📅 Development Timeline

| Week   | Focus                          |
| ------ | ------------------------------ |
| Week 1 | Backend + Dashboard Forms      |
| Week 2 | Template Engine + Public Pages |
| Week 3 | Live Preview + SEO             |
| Week 4 | Contact Form + Deployment      |

---

## 📸 Demo (Add After Deployment)

```
codefolio.com/demo1  → Minimal Template  
codefolio.com/demo2  → Cyberpunk Template  
```

---

## 🧠 System Design Notes

* Used **dynamic routing (`/:username`)** for portfolio pages
* Template rendering handled via **component mapping**
* Separation of concerns:

  * CMS (Dashboard)
  * Portfolio Renderer (Public UI)

---

## 🔮 Future Enhancements

* Drag & drop layout builder
* Analytics dashboard (profile views)
* Theme customization
* Custom domain support

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Kiran Biradar**

* GitHub: [https://github.com/kiruop](https://github.com/kiruop)
* LinkedIn: [https://linkedin.com/in/kiranbiradar](https://linkedin.com/in/kiranbiradar)

---

## ⭐ Acknowledgements

Inspired by modern website builders like Wix and Squarespace.

---
