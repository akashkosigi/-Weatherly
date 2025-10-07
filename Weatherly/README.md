# 🌤️ Weatherly - Real-Time Weather App

A beautiful, responsive weather application that fetches real-time weather data using the OpenWeatherMap API. Built with vanilla JavaScript, HTML, and CSS.

![Weatherly Preview](preview.png)

## ✨ Features

### Core Features
- **Real-Time Weather Data**: Fetches current weather information for any city worldwide
- **Geolocation Support**: Get weather for your current location with one click
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop

### Weather Information Displayed
- Current temperature and "feels like" temperature
- Weather condition with animated icons
- Humidity percentage
- Wind speed and direction
- Atmospheric pressure
- Visibility distance
- Sunrise and sunset times
- Temperature range (min/max)
- Wind gust speed

### Advanced Features
- **Recent Searches**: Quick access to your last 5 searched cities
- **LocalStorage Caching**: Remembers your last searched city, theme preference, and temperature unit
- **Loading States**: Smooth loading animations while fetching data
- **Error Handling**: Graceful error messages for various scenarios (city not found, network errors, etc.)
- **Dynamic Backgrounds**: Background changes based on weather conditions
- **Animated Icons**: Weather-appropriate emoji icons with smooth animations

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- An OpenWeatherMap API key (free)

### Installation

1. **Clone or Download** this repository to your local machine

2. **Get an API Key**:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to "API keys" section
   - Copy your API key

3. **Configure the API Key**:
   - Open `script.js`
   - Find line 7: `const API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key:
     ```javascript
     const API_KEY = 'your_actual_api_key_here';
     ```

4. **Run the Application**:
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```
   - Navigate to `http://localhost:8000` in your browser

## 📖 Usage

### Search for a City
1. Type a city name in the search box
2. Click the "Search" button or press Enter
3. View the weather information

### Use Current Location
1. Click the "Current Location" button
2. Allow location access when prompted
3. Weather data for your location will be displayed

### Toggle Temperature Unit
- Click the °C/°F toggle in the header to switch between Celsius and Fahrenheit

### Toggle Theme
- Click the sun/moon icon in the header to switch between light and dark themes

### Quick Access Recent Searches
- Previously searched cities appear below the weather display
- Click any city to quickly view its weather again

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
  - CSS Variables for theming
  - Animations and transitions
  - Responsive design with media queries
- **JavaScript (ES6+)**:
  - Async/await for API calls
  - Fetch API for HTTP requests
  - LocalStorage for data persistence
  - Geolocation API
  - DOM manipulation

### API Integration
- **OpenWeatherMap API**: Current Weather Data endpoint
- **Error Handling**: Comprehensive error handling for various scenarios
- **Rate Limiting**: Be mindful of API rate limits (60 calls/minute for free tier)

### Key Skills Demonstrated
1. **Asynchronous JavaScript**:
   - `async/await` syntax
   - Promise handling
   - Error handling with try/catch

2. **API Integration**:
   - RESTful API calls
   - Query parameter encoding
   - Response parsing

3. **DOM Manipulation**:
   - Dynamic content updates
   - Event handling
   - State management

4. **Responsive Design**:
   - Mobile-first approach
   - CSS Grid and Flexbox
   - Media queries

5. **UX Considerations**:
   - Loading states
   - Error states
   - User feedback (toasts)
   - Accessibility features

6. **Data Persistence**:
   - LocalStorage for caching
   - User preferences
   - Recent searches

## 📁 Project Structure

```
Weatherly/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # JavaScript logic and API integration
└── README.md           # This file
```

## 🎨 Customization

### Change Default City
In `script.js`, modify the `loadLastCity()` function:
```javascript
function loadLastCity() {
    const lastCity = localStorage.getItem('weatherly_last_city');
    
    if (lastCity) {
        document.getElementById('cityInput').value = lastCity;
        fetchWeatherByCity(lastCity);
    } else {
        // Change 'London' to your preferred default city
        fetchWeatherByCity('Your City Name');
    }
}
```

### Customize Colors
In `style.css`, modify the CSS variables in the `:root` selector:
```css
:root {
    --primary-color: #3b82f6;    /* Change primary color */
    --secondary-color: #8b5cf6;  /* Change secondary color */
    /* ... other variables */
}
```

### Add More Weather Details
The OpenWeatherMap API provides additional data. You can extend the app to display:
- Air quality index
- UV index
- Precipitation probability
- 5-day forecast

## 🐛 Troubleshooting

### "API Key Required" Error
- Make sure you've replaced `YOUR_API_KEY_HERE` with your actual API key
- Verify your API key is active on OpenWeatherMap

### "City not found" Error
- Check the spelling of the city name
- Try adding the country code (e.g., "London,UK")

### Location Access Denied
- Check your browser's location permissions
- Make sure you're using HTTPS or localhost

### API Rate Limit Exceeded
- Free tier allows 60 calls/minute
- Wait a minute and try again
- Consider upgrading your API plan for higher limits

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and emojis from Unicode Standard
- Inspired by modern weather apps

## 📧 Contact

For questions or feedback, please reach out to [your-email@example.com]

---

**Note**: This is a demo application for educational purposes. For production use, consider implementing additional features like:
- Backend proxy to hide API keys
- Extended forecast (5-day, hourly)
- Weather alerts
- Multiple location tracking
- Charts and graphs
- Progressive Web App (PWA) features
