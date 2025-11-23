# WTWR (What to Wear?)

## Objective

Create a full-stack web application called "WTWR". This application will read weather data from a [Weather API](https://openweathermap.org/) and then recommend suitable clothing to the user based on that data. In this project, your objective is to create a front end for the application using the fundamental principles of React.

## Project Overview

In this project, you'll focus on creating and styling the components that make up the frontend of the "WTWR" app. Here is an overview of the features you will implement by the end of this project iteration:

- A set of clothing cards, generated from a hard-coded array of data.
- Temperature, location, and weather display components, styled with hard-coded content.
- The new garment modal, which can be opened and closed.
- The image modal will appear when a card is clicked.

You will add additional functionality in future sprints.

The Figma specs are linked at the top of this page. At this stage, you won't need to implement functionality for adding, liking, or deleting items or logging in; you'll simply add the "like" icon.

Above the app frames, you'll find the UI Kit. It includes font styles and many basic components that will be reused throughout the "WTWR" app. You can refer back to it for an overview of the app's main components or to see the hover states of the buttons and other components.

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
    │   ├── contexts/
    │   │   └── CurrentTemperatureUnitContext.js
    │   ├── Header/
    │   │   ├── Header.css
    │   │   └── Header.jsx
    │   ├── Main/
    │   │   ├── Main.css
    │   │   └── Main.jsx
    │   ├── Footer/
    │   │   ├── Footer.css
    │   │   └── Footer.jsx
    │   ├── ModalWithForm/
    │   │   ├── ModalWithForm.css
    │   │   └── ModalWithForm.jsx
    │   ├── ItemModal/
    │   │   ├── ItemModal.css
    │   │   └── ItemModal.jsx
    │   ├── WeatherCard/
    │   │   ├── WeatherCard.css
    │   │   └── WeatherCard.jsx
    │   ├── ItemCard/
    │   │   ├── ItemCard.css
    │   │   └── ItemCard.jsx
    │   └── ToggleSwitch/
    │       ├── ToggleSwitch.css
    │       └── ToggleSwitch.jsx
    ├── utils/
    │   ├── constants.js
    │   ├── defaultClothing.js
    │   └── weatherApi.js
    └── vendor/
        ├── normalize.css
        └── fonts/
            ├── fonts.css
            └── CabinetGrotesk_Complete/
```
