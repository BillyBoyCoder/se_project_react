# WTWR (What to Wear?)

## Live Project

View the live application here: [WTWR Live Site](https://se-project-react-nine.vercel.app/)

## Backend Repository

The backend API for this project can be found here: [WTWR Backend Repository](https://github.com/BillyBoyCoder/se_project_express)

## Deployment Architecture

This project uses a modern hybrid deployment approach that separates frontend and backend infrastructure:

### Frontend: Vercel (Static Hosting + CDN)
- **Platform**: Deployed to Vercel
- **URL**: https://se-project-react-nine.vercel.app/
- **Automatic HTTPS**: SSL/TLS certificates managed by Vercel
- **CI/CD**: Automatic deployments on git push to main branch
- **Global CDN**: Content served from edge locations worldwide for minimal latency

### Backend: Google Cloud VM + PM2
- **Platform**: Google Cloud Compute Engine VM
- **Process Manager**: PM2 for process management and zero-downtime restarts
- **Database**: MongoDB Atlas (cloud-hosted)
- **Environment**: Production environment with secure .env configuration

### Why This Approach is Superior to Traditional Nginx-Only Deployment

**Traditional Approach (Single VM + Nginx):**
```
User → Nginx (serves React build + proxies API) → Node.js → MongoDB
```

**Our Hybrid Approach:**
```
User → Vercel CDN (React) → Google Cloud VM (Node.js API) → MongoDB Atlas
```

**Advantages:**

1. **Performance & Scalability**
   - Frontend assets served from Vercel's global CDN (300+ edge locations)
   - Traditional nginx serves from a single geographic location
   - Vercel automatically scales to handle traffic spikes
   - Single VM requires manual scaling and load balancing

2. **Reliability & Availability**
   - Vercel provides 99.99% uptime SLA
   - CDN ensures frontend remains available even if backend goes down
   - Traditional approach: entire site down if VM fails
   - PM2 on backend provides automatic process restart and monitoring

3. **Security**
   - Vercel manages SSL certificates automatically (auto-renewal)
   - DDoS protection and WAF included with Vercel
   - Traditional approach requires manual Let's Encrypt setup and renewal
   - Reduced attack surface: static files can't be compromised

4. **Developer Experience**
   - Zero-configuration deployments via git push
   - Automatic preview deployments for pull requests
   - Traditional approach requires manual build, transfer, and nginx reload
   - Instant rollbacks to previous deployments

5. **Cost Efficiency**
   - Vercel Free tier handles frontend (unlimited bandwidth)
   - Only pay for backend compute resources
   - Traditional approach requires larger VM to handle both frontend and backend
   - No need to configure and maintain nginx, SSL certificates, or build pipelines

6. **Separation of Concerns**
   - Frontend and backend can be scaled independently
   - Frontend updates don't require backend redeployment
   - Backend API changes don't affect frontend delivery
   - Easier to maintain and debug issues

7. **Modern Best Practices**
   - Static site generation (SSG) and edge computing
   - Aligns with Jamstack architecture principles
   - Industry-standard approach used by major companies
   - Future-proof: easy to add serverless functions if needed

**Trade-offs:**

The hybrid approach does introduce slightly more complexity in terms of CORS configuration and managing two deployment platforms. However, these are minor compared to the significant advantages in performance, reliability, and developer experience.

## Objective

Create a full-stack web application called "WTWR". This application will read weather data from a [Weather API](https://openweathermap.org/) and then recommend suitable clothing to the user based on that data. In this project, your objective is to create a front end for the application using the fundamental principles of React.

## Video Pitch: WTWR React Routes - Sprint 11

[View Video Pitch](https://drive.google.com/drive/folders/10MJeVvLkVELGmMRfRK0Yz-gqNR1B7fyx)

## How to Run the Application Locally

This application connects to a production backend API and MongoDB database. To run the frontend locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the React development server:**
   ```bash
   npm run dev
   ```
   This will open the application in your default browser at `http://localhost:5173`

**Note:** The frontend will connect to the production backend API. For local backend development, see the [WTWR Backend Repository](https://github.com/BillyBoyCoder/se_project_express).

## Project Overview

This is a full-stack React application that provides weather-based clothing recommendations. Here is an overview of the features implemented:

### Core Features
- **Weather Integration**: Real-time temperature, location, and weather display using OpenWeatherMap API
- **Clothing Management**: Add, edit, and delete clothing items with image URLs
- **Smart Filtering**: Clothing items automatically filtered by current weather conditions
- **User Authentication**: Signup, login, and logout functionality with JWT tokens
- **User Profiles**: Personalized profiles with avatar and name customization
- **Social Features**: Like/unlike clothing items from the community wardrobe
- **Ownership Display**: Color-coded owner tags (green for your items, red for others)
- **Temperature Units**: Toggle between Fahrenheit and Celsius

### Technical Features
- **Protected Routes**: Authentication-required pages using React Router
- **Form Validation**: Client-side validation with real-time error feedback
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints
- **Error Handling**: User-friendly error messages for API failures
- **Loading States**: Smooth UX with loading indicators
- **Confetti Animations**: Celebratory animations on profile updates

## Project Structure

```
se_project_react/
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
├── public/
│   └── vite.svg
└── src/
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   └── images/              # Weather condition icons
    │       ├── logo.svg
    │       ├── avatarTrue.svg
    │       ├── avatarFalse.svg
    │       └── [weather icons...]
    ├── components/
    │   ├── App/                 # Main application component
    │   ├── AddItemModal/        # Modal for adding/editing clothing items
    │   ├── ClothesSection/      # Display clothing items grid
    │   ├── Dashboard/           # Main dashboard layout
    │   ├── DeleteClothingItemModal/  # Confirmation modal for deletions
    │   ├── EditProfileModal/    # Modal for updating user profile
    │   ├── Footer/              # Application footer
    │   ├── Header/              # Navigation header with auth buttons
    │   ├── ItemCard/            # Individual clothing item card
    │   ├── ItemModal/           # Detailed view of clothing item
    │   ├── LoginModal/          # User login form
    │   ├── Main/                # Main page content
    │   ├── ModalWithForm/       # Reusable modal wrapper component
    │   ├── Profile/             # User profile page
    │   ├── ProtectedRoute/      # Authentication guard for routes
    │   ├── RegisterModal/       # User registration form
    │   ├── SideBar/             # Profile sidebar with user info
    │   ├── ToggleSwitch/        # Temperature unit toggle
    │   └── WeatherCard/         # Current weather display
    ├── hooks/
    │   └── useForm.js           # Custom hook for form state management
    ├── utils/
    │   ├── api.js               # Backend API integration (auth, items, likes)
    │   ├── constants.js         # Application constants and config
    │   ├── contexts/            # React Context providers
    │   │   ├── CurrentTemperatureUnitContext.js
    │   │   └── CurrentUserContext.js
    │   ├── weatherApi.js        # OpenWeatherMap API integration
    │   └── weatherUtils.js      # Weather condition logic and mapping
    └── vendor/
        ├── normalize.css        # CSS reset
        └── fonts/               # Custom fonts (Cabinet Grotesk)
```

## Technologies Used

### Frontend
- **React 18**: Component-based UI library
- **React Router 6**: Client-side routing and navigation
- **Vite**: Fast build tool and development server
- **Canvas Confetti**: Celebration animations

### Backend Integration
- **REST API**: Full CRUD operations for clothing items and users
- **JWT Authentication**: Secure token-based authentication
- **MongoDB**: NoSQL database for data persistence

### APIs
- **OpenWeatherMap API**: Real-time weather data
- **Custom Express API**: Backend server for application data

### Styling
- **CSS3**: Custom styling with BEM methodology
- **Responsive Design**: Mobile-first with media queries
- **Custom Fonts**: Cabinet Grotesk font family
