# TechZone - Premium E-Commerce Store

TechZone is a beautifully crafted, modern e-commerce web application built with **React** and **Tailwind CSS**. It focuses on delivering a highly premium, responsive, and seamless shopping experience.

## ✨ Features

- **Stunning UI/UX**: Features an ultra-premium aesthetic with glassmorphism (frosted glass) effects, modern typography, hover micro-interactions, and a fully dynamic animated mesh gradient background.
- **Fully Responsive**: Optimized for all screens. Desktop users enjoy a floating pill-shaped navigation bar, while mobile users get a beautifully integrated native-app-like Bottom Navigation Bar.
- **State Management**: Robust cart state managed through the React Context API, allowing seamless additions, quantity adjustments, and removals across pages.
- **Search Functionality**: A reactive desktop and mobile search bar that gracefully filters products based on the URL query.
- **Authentication UI**: A sleek, securely styled pseudo-login and responsive account dropdowns ready for backend integration.
- **Fast Routing**: Seamless single-page transitions managed heavily by `react-router-dom`.

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 
- **Routing**: React Router v6
- **Icons**: Lucide React

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone or Download the repository.**
2. **Navigate to the project directory**:
   ```bash
   cd ecommerce-store
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** and visit exactly what's printed in your terminal (usually `http://localhost:5173`).

## 📁 Project Structure

- `src/components/` - Reusable UI components including the Navbar and ProductCards.
- `src/context/` - Context providers (e.g., Cart context).
- `src/pages/` - Full page views (e.g., Cart checkout, Login, Home overview).
- `src/data/` - Static mock data.

---
*Built with ❤️ to demonstrate modern front-end e-commerce standards.*
