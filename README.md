# WTWR (What to Wear?)

## Backend Repository

The backend API for this project can be found here: [WTWR Backend Repository](https://github.com/BillyBoyCoder/se_project_express)

## Objective

Create a full-stack web application called "WTWR". This application will read weather data from a [Weather API](https://openweathermap.org/) and then recommend suitable clothing to the user based on that data. In this project, your objective is to create a front end for the application using the fundamental principles of React.

## Video Pitch: WTWR React Routes - Sprint 11

[View Video Pitch](https://drive.google.com/drive/folders/10MJeVvLkVELGmMRfRK0Yz-gqNR1B7fyx)

## How to Run the Application

This application uses a mock JSON server database to store clothing items. To run the application:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the JSON server (in one terminal):**
   ```bash
   npm run server
   ```
   This will start the mock API server on `http://localhost:3001`

3. **Start the React development server (in another terminal):**
   ```bash
   npm run dev
   ```
   This will open the application in your default browser.

## Project Overview

In this project, you'll focus on creating and styling the components that make up the frontend of the "WTWR" app. Here is an overview of the features implemented:

- Clothing cards retrieved from the mock database (db.json)
- Temperature, location, and weather display using OpenWeatherMap API
- Add new garment modal with form functionality
- Delete item functionality
- Item modal that appears when a card is clicked
- Temperature unit toggle (Fahrenheit/Celsius)
- Profile page with user's clothing items

The application uses `db.json` as a mock database. All clothing items are:
- Retrieved from db.json on page load
- Added to db.json when creating new items
- Deleted from db.json when removing items

## Project Structure

```
se_project_react/
├── .eslintrc.cjs
├── .gitignore
├── db.json                    # Mock database for clothing items
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
    │   └── images/
    │       ├── logo.svg
    │       ├── avatarTrue.svg
    │       ├── avatarFalse.svg
    │       ├── sunny.svg
    │       ├── cloudy.svg
    │       ├── fog.svg
    │       ├── rain.svg
    │       ├── snow.svg
    │       ├── storm.svg
    │       ├── night.svg
    │       ├── cloudyNight.svg
    │       ├── foggyNight.svg
    │       ├── rainyNight.svg
    │       ├── snowyNight.svg
    │       └── stormyNight.svg
    ├── components/
    │   ├── App/
    │   │   ├── App.css
    │   │   └── App.jsx
    │   ├── ClothesSection/
    │   │   ├── ClothesSection.css
    │   │   └── ClothesSection.jsx
    │   ├── Dashboard/
    │   │   ├── Dashboard.css
    │   │   └── Dashboard.jsx
    │   ├── DeleteClothingItemModal/
    │   │   ├── DeleteClothingItemModal.css
    │   │   └── DeleteClothingItemModal.jsx
    │   ├── Footer/
    │   │   ├── Footer.css
    │   │   └── Footer.jsx
    │   ├── Header/
    │   │   ├── Header.css
    │   │   └── Header.jsx
    │   ├── ItemCard/
    │   │   ├── ItemCard.css
    │   │   └── ItemCard.jsx
    │   ├── ItemModal/
    │   │   ├── ItemModal.css
    │   │   └── ItemModal.jsx
    │   ├── Main/
    │   │   ├── Main.css
    │   │   └── Main.jsx
    │   ├── ModalWithForm/
    │   │   ├── ModalWithForm.css
    │   │   └── ModalWithForm.jsx
    │   ├── AddItemModal/
    │   │   ├── AddItemModal.css
    │   │   └── AddItemModal.jsx
    │   ├── Profile/
    │   │   ├── Profile.css
    │   │   └── Profile.jsx
    │   ├── SideBar/
    │   │   ├── SideBar.css
    │   │   └── SideBar.jsx
    │   ├── ToggleSwitch/
    │   │   ├── ToggleSwitch.css
    │   │   └── ToggleSwitch.jsx
    │   └── WeatherCard/
    │       ├── WeatherCard.css
    │       └── WeatherCard.jsx
    ├── hooks/
    │   └── useForm.js            # Custom hook for form state management
    ├── utils/
    │   ├── api.js                # API functions for db.json CRUD operations
    │   ├── constants.js
    │   ├── contexts/
    │   │   └── CurrentTemperatureUnitContext.js
    │   ├── defaultClothing.js
    │   ├── weatherApi.js         # OpenWeatherMap API integration
    │   └── weatherUtils.js       # Weather condition logic
    └── vendor/
        ├── normalize.css
        └── fonts/
            ├── fonts.css
            └── CabinetGrotesk_Complete/
```
