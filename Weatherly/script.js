// ===========================
// Configuration
// ===========================
// IMPORTANT: Replace with your own OpenWeatherMap API key
// Get your free API key at: https://openweathermap.org/api
const API_KEY = 'bed08cebba62c009b77383921a67a799'; // Replace with your OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ===========================
// State Management
// ===========================
let currentUnit = 'celsius'; // celsius or fahrenheit
let currentWeatherData = null;
let recentSearches = [];

// ===========================
// Initialize App
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Initialize the weather application
 */
function initializeApp() {
    // Load theme preference
    loadTheme();
    
    // Load temperature unit preference
    loadUnitPreference();
    
    // Load recent searches
    loadRecentSearches();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load last searched city or default city
    loadLastCity();
    
    // Check if API key is set
    checkAPIKey();
}

// ===========================
// Event Listeners Setup
// ===========================
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('cityInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Current location
    document.getElementById('locationBtn').addEventListener('click', getCurrentLocation);
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Unit toggle
    document.getElementById('unitToggle').addEventListener('click', toggleUnit);
    
    // Retry button
    document.getElementById('retryBtn').addEventListener('click', handleRetry);
}

// ===========================
// API Key Check
// ===========================
/**
 * Check if API key is configured
 */
function checkAPIKey() {
    if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
        showError(
            'API Key Needed',
            'Head over to openweathermap.org/api to grab your free API key, then pop it into script.js (line 6) to get started!'
        );
    }
}

// ===========================
// Search Handler
// ===========================
/**
 * Handle city search
 */
async function handleSearch() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        showToast('Please enter a city name', 'error');
        return;
    }
    
    await fetchWeatherByCity(city);
}

/**
 * Handle retry button click
 */
function handleRetry() {
    const cityInput = document.getElementById('cityInput');
    if (cityInput.value.trim()) {
        handleSearch();
    } else {
        loadLastCity();
    }
}

// ===========================
// Weather API Calls
// ===========================
/**
 * Fetch weather data by city name
 * @param {string} city - City name
 */
async function fetchWeatherByCity(city) {
    if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
        showError('API Key Needed', 'You\'ll need to add your API key in script.js first. It\'s free at openweathermap.org/api!');
        return;
    }
    
    showLoading();
    
    try {
        const url = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid or expired API key. Get a free key at openweathermap.org/api and update it in script.js');
            } else {
                throw new Error('Failed to fetch weather data. Please try again.');
            }
        }
        
        const data = await response.json();
        currentWeatherData = data;
        
        // Save to recent searches
        addToRecentSearches(city);
        
        // Save as last searched city
        localStorage.setItem('weatherly_last_city', city);
        
        // Display weather data
        displayWeather(data);
        
        showToast(`Weather data loaded for ${data.name}`, 'success');
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError('Unable to Fetch Weather', error.message);
    }
}

/**
 * Fetch weather data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
async function fetchWeatherByCoords(lat, lon) {
    if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
        showError('API Key Needed', 'You\'ll need to add your API key in script.js first. It\'s free at openweathermap.org/api!');
        return;
    }
    
    showLoading();
    
    try {
        const url = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data for your location.');
        }
        
        const data = await response.json();
        currentWeatherData = data;
        
        // Update input with city name
        document.getElementById('cityInput').value = data.name;
        
        // Save to recent searches
        addToRecentSearches(data.name);
        
        // Display weather data
        displayWeather(data);
        
        showToast(`Weather data loaded for your location`, 'success');
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError('Unable to Fetch Weather', error.message);
    }
}

// ===========================
// Geolocation
// ===========================
/**
 * Get user's current location and fetch weather
 */
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showToast('Geolocation is not supported by your browser', 'error');
        return;
    }
    
    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
            console.error('Geolocation error:', error);
            let message = 'Unable to get your location. ';
            
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    message += 'Please allow location access.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message += 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    message += 'Location request timed out.';
                    break;
                default:
                    message += 'An unknown error occurred.';
            }
            
            showError('Location Error', message);
        }
    );
}

// ===========================
// Display Weather Data
// ===========================
/**
 * Display weather data on the UI
 * @param {Object} data - Weather data from API
 */
function displayWeather(data) {
    // Hide loading and error states
    hideLoading();
    hideError();
    
    // Show weather display
    document.getElementById('weatherDisplay').classList.add('active');
    
    // Update city name and date
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('currentDate').textContent = formatDate(new Date());
    
    // Update temperature
    updateTemperatureDisplay(data.main.temp, data.main.feels_like);
    
    // Update weather icon
    updateWeatherIcon(data.weather[0].main, data.weather[0].icon);
    
    // Update weather condition
    document.getElementById('weatherCondition').textContent = data.weather[0].main;
    document.getElementById('weatherDescription').textContent = data.weather[0].description;
    
    // Update weather details
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    
    // Update sunrise and sunset
    document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise);
    document.getElementById('sunset').textContent = formatTime(data.sys.sunset);
    
    // Update temperature range
    updateTempRange(data.main.temp_min, data.main.temp_max);
    
    // Update wind details
    document.getElementById('windDirection').textContent = getWindDirection(data.wind.deg);
    document.getElementById('windGust').textContent = data.wind.gust 
        ? `${(data.wind.gust * 3.6).toFixed(1)} km/h` 
        : 'N/A';
    
    // Update background based on weather
    updateWeatherBackground(data.weather[0].main.toLowerCase());
}

/**
 * Update temperature display based on current unit
 * @param {number} temp - Temperature in Celsius
 * @param {number} feelsLike - Feels like temperature in Celsius
 */
function updateTemperatureDisplay(temp, feelsLike) {
    const tempValue = currentUnit === 'celsius' ? temp : celsiusToFahrenheit(temp);
    const feelsLikeValue = currentUnit === 'celsius' ? feelsLike : celsiusToFahrenheit(feelsLike);
    const unit = currentUnit === 'celsius' ? '°C' : '°F';
    
    document.getElementById('temperature').textContent = Math.round(tempValue);
    document.getElementById('tempUnit').textContent = unit;
    document.getElementById('feelsLike').textContent = Math.round(feelsLikeValue);
    document.getElementById('feelsLikeUnit').textContent = unit;
}

/**
 * Update temperature range display
 * @param {number} min - Minimum temperature in Celsius
 * @param {number} max - Maximum temperature in Celsius
 */
function updateTempRange(min, max) {
    const minValue = currentUnit === 'celsius' ? min : celsiusToFahrenheit(min);
    const maxValue = currentUnit === 'celsius' ? max : celsiusToFahrenheit(max);
    const unit = currentUnit === 'celsius' ? '°C' : '°F';
    
    document.getElementById('tempMin').textContent = `${Math.round(minValue)}${unit}`;
    document.getElementById('tempMax').textContent = `${Math.round(maxValue)}${unit}`;
}

/**
 * Update weather icon based on condition
 * @param {string} condition - Weather condition
 * @param {string} iconCode - Icon code from API
 */
function updateWeatherIcon(condition, iconCode) {
    const iconMap = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️',
        'Smoke': '💨',
        'Dust': '💨',
        'Sand': '💨',
        'Ash': '💨',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    
    const icon = iconMap[condition] || '🌤️';
    document.getElementById('weatherIconLarge').textContent = icon;
}

/**
 * Update background based on weather condition
 * @param {string} condition - Weather condition
 */
function updateWeatherBackground(condition) {
    // Remove all weather classes
    document.body.classList.remove(
        'weather-clear', 'weather-clouds', 'weather-rain', 
        'weather-drizzle', 'weather-thunderstorm', 'weather-snow',
        'weather-mist', 'weather-fog', 'weather-haze'
    );
    
    // Add appropriate weather class
    document.body.classList.add(`weather-${condition}`);
}

// ===========================
// Unit Conversion
// ===========================
/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

/**
 * Toggle temperature unit
 */
function toggleUnit() {
    currentUnit = currentUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    
    // Update UI
    document.querySelector('.unit-celsius').classList.toggle('active');
    document.querySelector('.unit-fahrenheit').classList.toggle('active');
    
    // Save preference
    localStorage.setItem('weatherly_unit', currentUnit);
    
    // Update display if weather data exists
    if (currentWeatherData) {
        updateTemperatureDisplay(
            currentWeatherData.main.temp,
            currentWeatherData.main.feels_like
        );
        updateTempRange(
            currentWeatherData.main.temp_min,
            currentWeatherData.main.temp_max
        );
    }
}

/**
 * Load unit preference from localStorage
 */
function loadUnitPreference() {
    const savedUnit = localStorage.getItem('weatherly_unit');
    if (savedUnit) {
        currentUnit = savedUnit;
        
        if (currentUnit === 'fahrenheit') {
            document.querySelector('.unit-celsius').classList.remove('active');
            document.querySelector('.unit-fahrenheit').classList.add('active');
        }
    }
}

// ===========================
// Recent Searches
// ===========================
/**
 * Add city to recent searches
 * @param {string} city - City name
 */
function addToRecentSearches(city) {
    // Remove if already exists
    recentSearches = recentSearches.filter(c => c.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning
    recentSearches.unshift(city);
    
    // Keep only last 5
    recentSearches = recentSearches.slice(0, 5);
    
    // Save to localStorage
    localStorage.setItem('weatherly_recent', JSON.stringify(recentSearches));
    
    // Update UI
    displayRecentSearches();
}

/**
 * Load recent searches from localStorage
 */
function loadRecentSearches() {
    const saved = localStorage.getItem('weatherly_recent');
    if (saved) {
        recentSearches = JSON.parse(saved);
        displayRecentSearches();
    }
}

/**
 * Display recent searches
 */
function displayRecentSearches() {
    const container = document.getElementById('recentCitiesList');
    const section = document.getElementById('recentSearches');
    
    if (recentSearches.length === 0) {
        section.classList.remove('active');
        return;
    }
    
    section.classList.add('active');
    
    container.innerHTML = recentSearches.map(city => `
        <button class="recent-city-btn" onclick="searchRecentCity('${city}')">
            ${city}
        </button>
    `).join('');
}

/**
 * Search a city from recent searches
 * @param {string} city - City name
 */
function searchRecentCity(city) {
    document.getElementById('cityInput').value = city;
    fetchWeatherByCity(city);
}

// ===========================
// Load Last City
// ===========================
/**
 * Load last searched city or default city
 */
function loadLastCity() {
    const lastCity = localStorage.getItem('weatherly_last_city');
    
    if (lastCity) {
        document.getElementById('cityInput').value = lastCity;
        fetchWeatherByCity(lastCity);
    } else {
        // Default city
        fetchWeatherByCity('London');
    }
}

// ===========================
// UI State Management
// ===========================
/**
 * Show loading state
 */
function showLoading() {
    document.getElementById('loadingState').classList.add('active');
    document.getElementById('errorState').classList.remove('active');
    document.getElementById('weatherDisplay').classList.remove('active');
}

/**
 * Hide loading state
 */
function hideLoading() {
    document.getElementById('loadingState').classList.remove('active');
}

/**
 * Show error state
 * @param {string} title - Error title
 * @param {string} message - Error message
 */
function showError(title, message) {
    hideLoading();
    document.getElementById('weatherDisplay').classList.remove('active');
    document.getElementById('errorState').classList.add('active');
    document.getElementById('errorTitle').textContent = title;
    document.getElementById('errorMessage').textContent = message;
}

/**
 * Hide error state
 */
function hideError() {
    document.getElementById('errorState').classList.remove('active');
}

// ===========================
// Theme Management
// ===========================
/**
 * Toggle dark/light theme
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('weatherly_theme', newTheme);
}

/**
 * Load theme preference
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('weatherly_theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
}

// ===========================
// Utility Functions
// ===========================
/**
 * Format date
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format time from Unix timestamp
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted time string
 */
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Get wind direction from degrees
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} Wind direction (N, NE, E, etc.)
 */
function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error)
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make searchRecentCity globally accessible
window.searchRecentCity = searchRecentCity;
