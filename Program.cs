using Dashboard;
using DotNetEnv;

// Load environment variables from .env file
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddHttpClient();

// Load OpenWeatherMap API key from environment variables
var openWeatherApiKey = builder.Configuration["OPENWEATHER_API_KEY"] ?? "";

// Make API key available to views
builder.Services.AddSingleton<OpenWeatherConfig>(new OpenWeatherConfig(openWeatherApiKey));

var app = builder.Build();

app.MapGet("/api/weather/{cityId:int}", async (int cityId, OpenWeatherConfig config, IHttpClientFactory httpClientFactory) =>
{
    var apiKey = config.ApiKey;
    if (string.IsNullOrEmpty(apiKey))
    {
        return Results.StatusCode(500);
    }
    var client = httpClientFactory.CreateClient();
    var response = await client.GetAsync(
        $"https://api.openweathermap.org/data/2.5/weather?id={cityId}&appid={apiKey}&units=metric");

    if (!response.IsSuccessStatusCode)
        return Results.StatusCode((int)response.StatusCode);

    var json = await response.Content.ReadAsStringAsync();
    return Results.Content(json, "application/json");
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();
