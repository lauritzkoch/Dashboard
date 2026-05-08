class WeatherWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.fetchWeather();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .weather-container {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 12px;
                    padding: 24px;
                    color: white;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .weather-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .weather-icon {
                    font-size: 48px;
                    margin-right: 16px;
                }

                .weather-location {
                    font-size: 18px;
                    font-weight: 600;
                }

                .weather-temperature {
                    font-size: 36px;
                    font-weight: bold;
                    margin-bottom: 8px;
                }

                .weather-description {
                    font-size: 16px;
                    opacity: 0.9;
                    margin-bottom: 16px;
                }

                .weather-details {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    font-size: 14px;
                }

                .weather-detail {
                    display: flex;
                    align-items: center;
                }

                .weather-detail-icon {
                    margin-right: 8px;
                }

                .loading {
                    text-align: center;
                    padding: 40px 20px;
                }

                .error {
                    text-align: center;
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    margin-top: 16px;
                }

                .refresh-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 12px;
                    font-size: 14px;
                }

                .refresh-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            </style>

            <div class="weather-container">
                <div class="loading" id="loading">
                    <div>Loading weather...</div>
                </div>
                <div class="weather-content" id="weatherContent" style="display: none;">
                    <div class="weather-header">
                        <div class="weather-icon" id="weatherIcon"></div>
                        <div class="weather-location">Aarhus, Denmark</div>
                    </div>
                    <div class="weather-temperature" id="temperature">--°C</div>
                    <div class="weather-description" id="description">Loading...</div>
                    <div class="weather-details">
                        <div class="weather-detail">
                            <span class="weather-detail-icon">💧</span>
                            <span id="humidity">--% humidity</span>
                        </div>
                        <div class="weather-detail">
                            <span class="weather-detail-icon">💨</span>
                            <span id="wind">-- m/s wind</span>
                        </div>
                        <div class="weather-detail">
                            <span class="weather-detail-icon">🌡️</span>
                            <span id="feelsLike">Feels like --°C</span>
                        </div>
                        <div class="weather-detail">
                            <span class="weather-detail-icon">👁️</span>
                            <span id="visibility">-- km visibility</span>
                        </div>
                    </div>
                    <button class="refresh-btn" id="refreshBtn">Refresh</button>
                </div>
                <div class="error" id="error" style="display: none;">
                    <div>Unable to load weather data</div>
                    <button class="refresh-btn" id="retryBtn">Try Again</button>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('refreshBtn').addEventListener('click', () => this.fetchWeather());
        this.shadowRoot.getElementById('retryBtn').addEventListener('click', () => this.fetchWeather());
    }

    async fetchWeather() {
        const loading = this.shadowRoot.getElementById('loading');
        const content = this.shadowRoot.getElementById('weatherContent');
        const error = this.shadowRoot.getElementById('error');

        loading.style.display = 'block';
        content.style.display = 'none';
        error.style.display = 'none';

        try {
            const weatherData = await this.getWeatherData();
            this.updateWeatherDisplay(weatherData);
            loading.style.display = 'none';
            content.style.display = 'block';
        } catch (err) {
            console.error('Weather fetch error:', err);
            loading.style.display = 'none';
            error.style.display = 'block';
        }
    }

    async getWeatherData() {
        // Mock data for demonstration - replace with real API call
        // Sign up for free API key at https://openweathermap.org/api
        return {
            temperature: 18,
            description: 'Partly cloudy',
            humidity: 65,
            windSpeed: 3.2,
            feelsLike: 17,
            visibility: 10,
            icon: '⛅'
        };

        // Example real API call (uncomment and add API key):
        /*
        const apiKey = 'YOUR_API_KEY_HERE';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Aarhus,DK&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error('Weather API failed');

        const data = await response.json();
        return {
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            feelsLike: Math.round(data.main.feels_like),
            visibility: data.visibility / 1000,
            icon: this.getWeatherIcon(data.weather[0].main)
        };
        */
    }

    getWeatherIcon(weatherMain) {
        const icons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Fog': '🌫️',
            'Haze': '🌤️'
        };
        return icons[weatherMain] || '🌤️';
    }

    updateWeatherDisplay(data) {
        this.shadowRoot.getElementById('temperature').textContent = `${data.temperature}°C`;
        this.shadowRoot.getElementById('description').textContent = data.description;
        this.shadowRoot.getElementById('humidity').textContent = `${data.humidity}% humidity`;
        this.shadowRoot.getElementById('wind').textContent = `${data.windSpeed} m/s wind`;
        this.shadowRoot.getElementById('feelsLike').textContent = `Feels like ${data.feelsLike}°C`;
        this.shadowRoot.getElementById('visibility').textContent = `${data.visibility} km visibility`;
        this.shadowRoot.getElementById('weatherIcon').textContent = data.icon;
    }
}

customElements.define('weather-widget', WeatherWidget);
