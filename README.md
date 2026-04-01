🚀 Kanban Task Management (Fullstack)
Aplikasi manajemen tugas bergaya Kanban yang dibangun dengan stack modern. Proyek ini merupakan bagian dari perjalanan belajar saya dalam memahami arsitektur Fullstack, Containerization, dan Automated Deployment.

🎨 Main Features
Integrated Project Workspace: Pemisahan tugas dan pengeluaran (expenses) untuk setiap proyek.

Drag & Drop Interface: Perpindahan tugas antar kolom status yang mulus menggunakan vuedraggable.

Advanced Todolist: Fitur checklist subtask dengan progress tracking otomatis.

Expenses Management: Monitoring anggaran dan pengeluaran biaya per tugas secara real-time.

Responsive Design: Antarmuka Dark Mode yang optimal untuk Desktop dan Mobile (Mobile Fallback).

🏗️ Architecture & Tech Stack
Frontend Architecture
Framework: Vue.js 3 (Composition API)

State Management: Pinia

Styling: Tailwind CSS

Icons: Lucide Vue / Heroicons

HTTP Client: Axios

Backend Architecture
Runtime: Node.js & Express (TypeScript)

ORM: Prisma

Database: MongoDB Atlas (Cloud)

Architecture: Layered Architecture (Controller, Service, Repository)

DevOps & Deployment
Containerization: Docker (Multi-stage Build)

Reverse Proxy: NGINX

Platform: Railway

CI/CD: GitHub Actions / Railway Webhooks

🛠️ Installation & Setup
Prerequisites
Node.js (v18+)

Docker (Optional)

MongoDB Instance

1. Clone Repository
Bash
git clone https://github.com/username/kanban-app.git
cd kanban-app
2. Backend Setup
Bash
cd backend
npm install
# Buat file .env dan masukkan DATABASE_URL (Prisma)
npx prisma generate
npm run dev
3. Frontend Setup
Bash
cd frontend
npm install
# Buat file .env dan masukkan VITE_API_URL
npm run dev
📈 Learning Journey
Proyek ini memberikan banyak pelajaran berharga bagi saya, di antaranya:

Environment Syncing: Menangani perbedaan URL API antara lingkungan lokal (localhost) dan produksi (Railway).

DNS & Networking: Memecahkan masalah DNS resolution dan timeout saat menghubungkan Prisma ke MongoDB Atlas melalui jaringan ISP tertentu.

Deployment Pipeline: Mengoptimalkan ukuran image Docker menggunakan multi-stage build untuk memisahkan tahap build dan production.

👨‍💻 Author
Muhamad Khaerul Rijal

LinkedIn: linkedin.com/in/nama-kamu

GitHub: @username
