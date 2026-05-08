# Internal Dashboard

A modern internal dashboard built with ASP.NET Core Razor Pages and Custom Web Components. This project was completed as part of a technical interview assignment for Better Developers.

## Features

- **Quick Links Section**: Easy access to commonly used tools and resources
- **Weather Widget**: Displays current weather information for Aarhus, Denmark
- **Quote Widget**: Shows motivational quotes with refresh functionality
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Error Handling**: Graceful handling of API failures and loading states

## Technology Stack

- **Backend**: ASP.NET Core 10.0 (Razor Pages)
- **Frontend**: Vanilla JavaScript with Custom Web Components
- **Styling**: CSS3 with modern features (Grid, Flexbox, CSS Variables)
- **Icons**: Emoji icons for universal compatibility

## Setup and Run Instructions

### Prerequisites

- .NET 10.0 SDK or later
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/lauritzkoch/dashboard.git
   cd dashboard
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the application:
   ```bash
   dotnet run
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Project Structure

```
Dashboard/
├── Pages/
│   ├── Index.cshtml           # Main dashboard page
│   ├── Index.cshtml.cs        # Page model
│   └── Shared/                # Shared layouts
├── wwwroot/
│   ├── css/
│   │   └── site.css          # Main stylesheet
│   └── js/
│       ├── weather-widget.js  # Weather web component
│       └── quote-widget.js    # Quote web component
├── Properties/
│   └── launchSettings.json   # Development configuration
└── Dashboard.csproj          # Project file
```

## Architecture Decisions

### Custom Web Components
- **Chosen for**: Encapsulation, reusability, and framework independence
- **Benefits**: No external dependencies, native browser support, clean separation of concerns
- **Trade-off**: More verbose than framework alternatives but provides better understanding of web standards

### Razor Pages
- **Chosen for**: Simplicity and familiarity with existing .NET ecosystem
- **Benefits**: Server-side rendering, built-in security, easy deployment
- **Trade-off**: Less interactive than SPA architectures but sufficient for dashboard requirements

### CSS Grid & Flexbox
- **Chosen for**: Modern, responsive layout capabilities
- **Benefits**: Clean responsive design without external frameworks
- **Trade-off**: Requires modern browser support (acceptable for internal tool)

## API Integration

### Weather Widget
Currently uses mock data for demonstration. To enable real weather data:

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Uncomment the API call in `wwwroot/js/weather-widget.js`
3. Replace `YOUR_API_KEY_HERE` with your actual API key

### Quote Widget
Currently uses a curated collection of motivational quotes. Can be extended to use external quote APIs.

## Environment Variables

See `.env.example` for required environment variables:

```
OPENWEATHER_API_KEY=your_api_key_here
```

**Important**: Never commit actual API keys to the repository. Share any secret values securely via [https://scrt.link/](https://scrt.link/).

## Time Spent

**Total development time: ~3 hours**

Breakdown:
- Project setup and structure: 30 minutes
- Dashboard layout and styling: 45 minutes
- Weather widget implementation: 45 minutes
- Quote widget implementation: 30 minutes
- Testing and refinement: 30 minutes

## Potential Improvements

With more time, I would implement:

1. **Real API Integration**: Connect to actual weather and quote APIs
2. **User Persistence**: Save user preferences (favorite links, widget positions)
3. **Drag & Drop**: Allow reordering of widgets and links
4. **Dark Mode**: Theme switcher for different viewing preferences
5. **Caching**: Implement client-side caching for API responses
6. **Accessibility**: Enhanced ARIA labels and keyboard navigation
7. **Testing**: Unit tests for web components and integration tests
8. **Deployment**: Docker containerization and CI/CD pipeline
9. **Performance**: Lazy loading of widgets and optimization
10. **Internationalization**: Support for multiple languages

## Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## License

This project is for demonstration purposes as part of a technical interview.
