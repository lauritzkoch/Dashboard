class WeatherWidget extends HTMLElement {
    static CITIES = [
        { label: 'Aabenraa', id: 2625070 },
        { label: 'Aalborg', id: 2624886 },
        { label: 'Aarhus', id: 2624652 },
        { label: 'Birkerød', id: 2624112 },
        { label: 'Brønderslev', id: 2623337 },
        { label: 'Copenhagen', id: 2618425 },
        { label: 'Esbjerg', id: 2622447 },
        { label: 'Fredensborg', id: 2621956 },
        { label: 'Fredericia', id: 2621951 },
        { label: 'Frederikshavn', id: 2621927 },
        { label: 'Frederikssund', id: 2621912 },
        { label: 'Glostrup', id: 2621356 },
        { label: 'Grenaa', id: 2621230 },
        { label: 'Haderslev', id: 2620964 },
        { label: 'Hadsten', id: 2620956 },
        { label: 'Hedensted', id: 2620583 },
        { label: 'Helsingør', id: 2620473 },
        { label: 'Herning', id: 2620425 },
        { label: 'Hillerød', id: 2620320 },
        { label: 'Hjørring', id: 2620214 },
        { label: 'Holbæk', id: 2620147 },
        { label: 'Holstebro', id: 2620046 },
        { label: 'Horsens', id: 2619771 },
        { label: 'Hvidovre', id: 2619528 },
        { label: 'Ikast', id: 2619426 },
        { label: 'Kalundborg', id: 2619154 },
        { label: 'Kolding', id: 2618528 },
        { label: 'Køge', id: 2618415 },
        { label: 'Lemvig', id: 2617812 },
        { label: 'Middelfart', id: 2616933 },
        { label: 'Nyborg', id: 2616015 },
        { label: 'Nykøbing Falster', id: 2615961 },
        { label: 'Næstved', id: 2616038 },
        { label: 'Odense', id: 2615876 },
        { label: 'Randers', id: 2615006 },
        { label: 'Ringsted', id: 2614764 },
        { label: 'Roskilde', id: 2614481 },
        { label: 'Silkeborg', id: 2614030 },
        { label: 'Skanderborg', id: 2613887 },
        { label: 'Skive', id: 2613731 },
        { label: 'Slagelse', id: 2613460 },
        { label: 'Struer', id: 2612204 },
        { label: 'Svendborg', id: 2612045 },
        { label: 'Sønderborg', id: 2613102 },
        { label: 'Taastrup', id: 2611828 },
        { label: 'Thisted', id: 2611755 },
        { label: 'Tønder', id: 2611497 },
        { label: 'Varde', id: 2610726 },
        { label: 'Vejen', id: 2610634 },
        { label: 'Vejle', id: 2610613 },
        { label: 'Viborg', id: 2610319 },
    ];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.cityId = parseInt(this.getAttribute('city-id')) || 2624652;
        this.render();
        this.fetchWeather();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .weather-container {
                    background: linear-gradient(135deg, #fefff9 0%, #f5ffb5 100%);
                    border-radius: 12px;
                    padding: 24px;
                    color: black;
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
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    margin-top: 16px;
                }

                .refresh-btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(0, 0, 0, 0.3);
                    color: black;
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 12px;
                    font-size: 14px;
                }

                .refresh-btn:hover {
                    background: rgba(0, 0, 0, 0.3);
                }

                .city-select {
                    background: rgba(255, 255, 255, 0.5);
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    color: black;
                    padding: 6px 10px;
                    border-radius: 6px;
                    font-size: 14px;
                    cursor: pointer;
                    outline: none;
                    margin-left: auto;
                }

                .city-select:hover {
                    background: rgba(255, 255, 255, 0.7);
                }
            </style>

            <div class="weather-container">
                <div class="loading" id="loading">
                    <div>Loading weather...</div>
                </div>
                <div class="weather-content" id="weatherContent" style="display: none;">
                    <div class="weather-header">
                        <div class="weather-icon" id="weatherIcon"></div>
                        <div class="weather-location" id="locationLabel">Aarhus, Denmark</div>
                        <select class="city-select" id="citySelect">
                            ${WeatherWidget.CITIES.map(c => 
                                `<option value="${c.id}" ${c.id === this.cityId ? 'selected' : ''}>${c.label}</option>`
                            ).join('')}
                        </select>
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
        this.shadowRoot.getElementById('citySelect').addEventListener('change', (e) => {
            this.cityId = parseInt(e.target.value);
            this.fetchWeather();
        });
    }

    async fetchWeather() {
        const loading = this.shadowRoot.getElementById('loading');
        const content = this.shadowRoot.getElementById('weatherContent');
        const error = this.shadowRoot.getElementById('error');

        loading.style.display = 'block';
        content.style.display = 'none';
        error.style.display = 'none';

        try {
            const weatherData = await this.getWeatherData(this.cityId);
            this.updateWeatherDisplay(weatherData);
            loading.style.display = 'none';
            content.style.display = 'block';
        } catch (err) {
            console.error('Weather fetch error:', err);
            loading.style.display = 'none';
            error.style.display = 'block';
        }
    }

    async getWeatherData(cityId = 2624652) {
        const response = await fetch(`/api/weather/${cityId}`);
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
        const selected = WeatherWidget.CITIES.find(c => c.id === this.cityId);
        this.shadowRoot.getElementById('locationLabel').textContent = selected ? `${selected.label}, Denmark` : 'Denmark';
    }
}

customElements.define('weather-widget', WeatherWidget);
