# Internal Dashboard

A dashboard built with ASP.NET Core Razor Pages and Custom Web Components. 

## Technology Stack

- **Backend**: ASP.NET Core 10.0 (Razor Pages)
- **Frontend**: Vanilla JavaScript with Custom Web Components (Shadow DOM)
- **Styling**: CSS3 with CSS Variables, Grid, Flexbox
## Setup and Run Instructions

### Prerequisites

- .NET 10.0 SDK or later

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/lauritzkoch/dashboard.git
   cd dashboard
   ```

2. Copy the environment file and add your API key:
   ```bash
   cp .env.example .env
   ```

3. Run the application:
   ```bash
   dotnet run
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5265
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

### Endpoint directly in Program.cs
- **Chosen for**: Ease of use, no need for controller maintenance
- **Benefits**: Single file API definition, easy to maintain
- **Trade-off**: Scales badly with more endpoints

## API Integration

### Weather Widget
The weather widget uses live data from OpenWeatherMap API. The API key is loaded from `.env` and proxied through a server-side endpoint (`/api/weather/{cityId}`) to avoid exposing the key to the client.

### Quote Widget
Currently uses a curated collection of LOTR quotes. Can be extended to use external quote APIs.

## Environment Variables

See `.env.example` for required environment variables:

```
OPENWEATHER_API_KEY=your_api_key_here
```

## Time Spent

**Total development time with AI assistant: 4-5h**

## Potential Improvements

With more time, I would implement:

1. **Quote API Integration**: Connect to actual quote APIs for dynamic content
2. **User Persistence**: Save user preferences (favorite links, widget positions)
3. **Drag & Drop**: Allow reordering of widgets and links
4. **Dark Mode**: Theme switcher for different viewing preferences
5. **Testing**: Unit tests for web components and integration tests
6. **Deployment**: Docker containerization and CI/CD pipeline
7. **Internationalization**: Support for multiple languages
