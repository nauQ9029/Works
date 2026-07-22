# 🚚 HOMS - Home Moving Service (Frontend)

Welcome to the Frontend repository for **HOMS (Home Moving Service)**! This web application provides a modern, responsive, and user-friendly interface for customers to book moving services, and for staff/admins to manage operations.

## 🚀 Technologies Used
- **Core:** React 18, React Router DOM
- **State Management:** Redux Toolkit, React Redux
- **UI & Styling:** Ant Design (antd), Framer Motion, Recharts
- **Mapping & Location:** Leaflet, React Leaflet
- **AI & Machine Learning:** TensorFlow.js (`@tensorflow/tfjs`, `@tensorflow-models/coco-ssd`) for object detection
- **Real-time Communication:** Socket.io Client
- **Authentication:** Google & Facebook OAuth (`@react-oauth/google`, `@greatsumini/react-facebook-login`)
- **HTTP Client:** Axios

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16 or higher recommended) and npm installed.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/HOMS-Project/HOMS_FE.git
   cd HOMS_FE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the necessary environment variables (e.g., API base URL, OAuth client IDs).

### Running the App

Start the development server:
```bash
npm start
```
The app will be available at `http://localhost:3000` (or another port if 3000 is occupied).

### Build for Production
```bash
npm run build
```
This builds the app for production to the `build` folder.

## 📁 Project Structure
- `src/` - Contains all React components, pages, Redux slices, and utilities.
- `public/` - Static assets and `index.html`.

## 📄 License
This project is licensed under the ISC License.
