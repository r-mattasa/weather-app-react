
# Getting Started with Create React App with vite

This project was bootstrapped with 

# Create a Vite project
npm create vite@latest weather-app --template react

# Navigate to the project directory
cd weather-app

# Install dependencies
npm install

# API Key Configuration
Before run the project you need to do the following steps:

1. Register an API key on openweathermap.
2. Register an API key on accuweather.
3. Create a .env file in your project root, Add the registered API keys in the .env file.
    VITE_OPENWEATHER_API_KEY=your_openweather_api_key
    VITE_ACCUWEATHER_API_KEY=your_accuweather_api_key


## Available Scripts

In the project directory, you can run:

### `npm run dev`
<img width="823" alt="climate" src="https://github.com/user-attachments/assets/5e0a0862-8e44-4483-ba6e-0c602c36e8b8" />

Runs the app in the development mode.\
Open [http://localhost:PORTNUMBER] to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


# React + Vite


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
