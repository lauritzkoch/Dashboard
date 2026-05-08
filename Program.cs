using Dashboard;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// Load OpenWeatherMap API key from environment variables
var openWeatherApiKey = builder.Configuration["OPENWEATHER_API_KEY"] ?? "your_api_key_here";

// Make API key available to views
builder.Services.AddSingleton<OpenWeatherConfig>(new OpenWeatherConfig(openWeatherApiKey));

var app = builder.Build();

app.MapGet("/api/config/weather", (OpenWeatherConfig config) => Results.Ok(config));

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
