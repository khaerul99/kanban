# 🚀 Kanban Task Management (Fullstack)

<p align="center">
 <img width="1919" height="990" alt="Image" src="https://github.com/user-attachments/assets/d65eeb6c-ee06-4a61-a6b2-ef6402f0e7c2" />
  <br>
  <b>A modern, responsive Kanban board to organize your projects and expenses.</b>
  <br>
  <i>Built with Vue 3, Node.js, TypeScript, Prisma, Docker, and MongoDB Atlas. Delivered via Railway.</i>
</p>

<p align="center">
  <a href="https://github.com/username/kanban-app/stargazers"><img src="https://img.shields.io/github/stars/username/kanban-app?style=for-the-badge&color=238636" alt="GitHub stars"></a>
  <a href="https://github.com/username/kanban-app/network/members"><img src="https://img.shields.io/github/forks/username/kanban-app?style=for-the-badge&color=0366d6" alt="GitHub forks"></a>
  <a href="https://github.com/username/kanban-app/issues"><img src="https://img.shields.io/github/issues/username/kanban-app?style=for-the-badge&color=cb2431" alt="GitHub issues"></a>
  <a href="https://github.com/username/kanban-app/pulls"><img src="https://img.shields.io/github/pulls/username/kanban-app?style=for-the-badge&color=6f42c1" alt="GitHub pull requests"></a>
</p>

---

## 🎨 Main Features

| Feature | Description | Key Tech |
| :--- | :--- | :--- |
| **🌐 Integrated Project Workspace** | Separate tasks and expenses for each project board. | Pinia, MongoDB |
| **🗂️ Advanced Task Management** | Dynamic checklists, progress tracking, and priority labeling. | Vue 3, Tailwind |
| **🔄 Drag & Drop Interface** | Smooth card movement across status columns. | `vuedraggable` |
| **💰 Expenses Management** | Real-time budget tracking for each task. | Node.js, Prisma |
| **📱 Responsive Design** | Optimized for Desktop and Mobile (Dark Mode). | Tailwind CSS |

---

## 🏗️ Architecture & Tech Stack

Proyek ini menggunakan arsitektur modern yang memisahkan tanggung jawab antara Frontend dan Backend dalam satu kontainer Docker.

### High-Level Architecture Diagram
<p align="center">
  <img width="1080" height="1350" alt="Image" src="https://github.com/user-attachments/assets/b6e1585d-ab7c-4023-8aa7-98476e52a5df" />
</p>

### Technologies Used

| Category | stack |
| :--- | :--- |
| **Frontend** | <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white"> <img src="https://img.shields.io/badge/Pinia-FFC107?style=for-the-badge&logo=pinia&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> |
| **Backend** | <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"> |
| **Database** | <img src="https://img.shields.io/badge/MongoDB-47A431?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB_Atlas-47A431?style=for-the-badge&logo=mongodb&logoColor=white"> |
| **DevOps** | <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white"> <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"> |

---

## 🛠️ Installation & Setup

### Prerequisites
* **Node.js**: v18+
* **MongoDB**: Instance (local or Atlas)
* **Docker**: Optional (for containerized setup)

### Local Development Setup

#### 1. Clone & Install
```bash
git clone [https://github.com/username/kanban-app.git](https://github.com/username/kanban-app.git)
cd kanban-app
``` 

#### 2. Konfigurasi Backend
```bash <--- INI PINTU BUKA BARU
cd backend
npm install
npx prisma generate
npm run dev
``` 

#### 3. Konfigurasi Frontend
```bash <--- INI PINTU BUKA BARU
cd frontend
npm install
npm run dev
```
