# Invoice Generator Application

A full-stack Invoice Generator application built with the MERN stack, featuring modern UI design, PDF generation, and user authentication.

![Invoice Generator](https://img.shields.io/badge/Status-Complete-brightgreen) ![React](https://img.shields.io/badge/React-18+-blue) ![Node.js](https://img.shields.io/badge/Node.js-16+-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## 🚀 Features

- **User Authentication** - JWT-based login/registration system
- **Product Management** - Add, remove, and manage products dynamically
- **Invoice Generation** - Create professional invoices with automatic calculations
- **PDF Export** - Download invoices as PDF files using Puppeteer
- **Real-time Calculations** - Automatic subtotal, GST (18%), and total calculations
- **Responsive Design** - Modern dark theme with glassmorphism effects
- **State Management** - Redux Toolkit for efficient state management
- **Type Safety** - Full TypeScript implementation
- **Modern UI** - Tailwind CSS with custom components

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **TanStack Query** - Data fetching and caching
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Puppeteer** - PDF generation
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- [Git](https://git-scm.com/)
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/invoice-generator.git
cd invoice-generator
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure environment variables in `backend/.env`:**

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/invoice-generator
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure environment variables in `frontend/.env`:**

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup

**Option 1: Local MongoDB**
```bash
# Start MongoDB service
mongod

# Or if using systemctl (Linux)
sudo systemctl start mongod
```

**Option 2: Docker MongoDB**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option 3: MongoDB Atlas**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Replace `MONGODB_URI` in your `.env` file with your Atlas connection string

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
invoice-generator/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── invoiceController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Invoice.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── invoice.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Input.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useInvoice.ts
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── AddProductsPage.tsx
│   │   ├── store/
│   │   │   ├── store.ts
│   │   │   ├── authSlice.ts
│   │   │   └── invoiceSlice.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── api.ts
│   │   │   └── cn.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## 🎯 Usage

### 1. User Registration/Login
- Navigate to the login page
- Create a new account or login with existing credentials
- JWT tokens are used for authentication

### 2. Adding Products
- After login, you'll be redirected to the "Add Products" page
- Fill in product details: name, price, and quantity
- Click "Add Product" to add items to your invoice

### 3. Generating Invoice
- Review your products in the table
- View automatic calculations (subtotal, GST, total)
- Click "Generate PDF Invoice" to create the invoice
- Download the PDF file to your device

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev     # Start development server with hot reload
npm run build   # Build TypeScript to JavaScript
npm start       # Start production server
```

### Frontend Scripts
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

## 🚀 Deployment

### Backend Deployment (Railway/Heroku)

1. **Build the application:**
```bash
cd backend
npm run build
```

2. **Set environment variables on your hosting platform**

3. **Deploy using your preferred platform**

### Frontend Deployment (Vercel/Netlify)

1. **Build the application:**
```bash
cd frontend
npm run build
```

2. **Deploy the `dist` folder**

3. **Set environment variables:**
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Invoice Management
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/:id/pdf` - Generate and download PDF

## 🐛 Troubleshooting

### Common Issues

**1. TypeScript compilation errors:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**2. MongoDB connection issues:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database permissions

**3. Port already in use:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in .env file
PORT=5001
```

**4. CORS errors:**
- Verify frontend URL in CORS configuration
- Check API URL in frontend `.env`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🌟 Acknowledgments

- [React](https://reactjs.org/) - For the amazing UI library
- [MongoDB](https://www.mongodb.com/) - For the flexible database
- [Puppeteer](https://pptr.dev/) - For PDF generation capabilities
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework

---

⭐ If you found this project helpful, please give it a star on GitHub!