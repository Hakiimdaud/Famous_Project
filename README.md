
# Tekra Connect Project Documentation

Welcome! This file explains everything about the Famous Project in simple English. You will find what the project does, how it is built, how to use it, and all the backend API endpoints.

---

## 1. Project Overview
This project is a web application for managing influencers (famous people), customers, complaints, contacts, and ratings. It has two main parts:
- **Backend** (Node.js, Express, MongoDB)
- **Frontend** (React, Vite, Tailwind CSS)

---

## 2. Project Structure
```
Famous_Project/
	backend/    # Server-side code (APIs, database)
	frontend/   # Client-side code (user interface)
```

---

## 3. Roadmap (How the Project Was Built)
1. **Setup backend**: Created backend folder, initialized Node.js, installed Express, Mongoose, etc.
2. **Setup frontend**: Created frontend folder, used Vite to start React app, installed Tailwind CSS.
3. **Database models**: Made models for admin, customer, famous, complaints, contact, rating.
4. **Controllers & Routers**: Wrote logic and routes for all features (CRUD for each model).
5. **Authentication**: Added login for admin and customer, with JWT tokens.
6. **File upload**: Enabled image upload for users and influencers.
7. **Testing**: Used Postman to test all backend APIs.
8. **Frontend pages**: Built pages for login, register, dashboard, add/view influencers, complaints, contacts, etc.
9. **Connect frontend to backend**: Used Axios/fetch to call backend APIs from React.
10. **Final testing**: Checked all features work together.

---

## 4. How to Run the Project

### Backend
1. Open terminal in `backend/`
2. Run: `npm install`
3. Run: `node server.js`

### Frontend
1. Open terminal in `frontend/`
2. Run: `npm install`
3. Run: `npm run dev`

---

## 5. API Documentation
All endpoints are relative to your backend server URL (e.g., http://localhost:5000/)

### Admin APIs
| Method | Path | Description |
|--------|------|-------------|
| POST   | /create/admin           | Create a new admin (with image) |
| POST   | /login/admin            | Admin login |
| GET    | /read/admin             | Get all admins |
| GET    | /readSingle/admin/:id   | Get one admin by ID |
| PUT    | /update/admin/:id       | Update admin (with image) |
| DELETE | /delete/admin/:id       | Delete admin by ID |

### Customer APIs
| Method | Path | Description |
|--------|------|-------------|
| POST   | /create/customer           | Create a new customer (with image) |
| POST   | /login/customer            | Customer login |
| GET    | /read/customer             | Get all customers (admin only) |
| GET    | /readSingle/customer/:id   | Get one customer by ID |
| PUT    | /update/customer/:id       | Update customer (with image) |
| DELETE | /delete/customer/:id       | Delete customer by ID |

### Famous (Influencer) APIs
| Method | Path | Description |
|--------|------|-------------|
| POST   | /create/famous           | Create a new influencer (with image) |
| GET    | /read/famous             | Get all influencers |
| GET    | /readSingle/famous/:id   | Get one influencer by ID |
| PUT    | /update/famous/:id       | Update influencer (with image) |
| DELETE | /delete/famous/:id       | Delete influencer by ID |

### Complaints APIs
| Method | Path | Description |
|--------|------|-------------|
| POST   | /post/complaints           | Create a complaint |
| GET    | /get/complaints            | Get all complaints |
| GET    | /get/complaints/:id        | Get one complaint by ID |
| PUT    | /update/complaints/:id     | Update complaint by ID |
| DELETE | /delete/complaints/:id     | Delete complaint by ID |

### Contact APIs
| Method | Path | Description |
|--------|------|-------------|
| POST   | /create/CONTACT           | Create a contact message |
| GET    | /read/CONTACT             | Get all contact messages |
| GET    | /readSingle/CONTACT/:id   | Get one contact by ID |
| PUT    | /update/CONTACT/:id       | Update contact by ID |
| PUT    | /delete/CONTACT/:id       | Delete contact by ID |

### Rating APIs
| Method | Path | Description |
|--------|------|-------------|
| POST   | /rating                  | Add a rating to an influencer |
| GET    | /ratings/:influencerId   | Get ratings for an influencer |

### Dashboard APIs
| Method | Path | Description |
|--------|------|-------------|
| GET    | /dashboard/stats         | Get dashboard statistics |

---

**Note:** Some endpoints need authentication (token). Check if you need to be logged in as admin or customer.

---

## 6. Extra Notes
- Make sure MongoDB is running or use MongoDB Atlas.
- Change API URLs in frontend if needed.
- All images/files are in `backend/document/`.

---

## 7. Contact
If you have any questions, contact the project owner.

---

Thank you for using the Famous Project!
