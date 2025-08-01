export async function getCurrentWeather({ location }) {
    try {
        // Using OpenWeatherMap API through Scrimba's proxy
        const weatherUrl = new URL("https://apis.scrimba.com/openweathermap/data/2.5/weather")
        weatherUrl.searchParams.append("q", location)
        weatherUrl.searchParams.append("units", "metric") // Changed to metric for Celsius
        const res = await fetch(weatherUrl)
        const data = await res.json()
        
        if (data.cod === 200) {
            const weatherInfo = {
                location: data.name,
                country: data.sys.country,
                temperature: Math.round(data.main.temp),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed
            }
            return JSON.stringify(weatherInfo)
        } else {
            return JSON.stringify({ error: "Weather data not found for this location" })
        }
    } catch(err) {
        console.error("Weather API Error:", err.message)
        return JSON.stringify({ error: "Failed to fetch weather data" })
    }
}

export async function getLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        if (data.city && data.country) {
            const locationInfo = {
                city: data.city,
                country: data.country,
                region: data.region,
                timezone: data.timezone
            }
            return JSON.stringify(locationInfo)
        } else {
            return JSON.stringify({ error: "Could not determine location" })
        }
    } catch (err) {
        console.error("Location API Error:", err.message)
        return JSON.stringify({ error: "Failed to get location data" })
    }
}

export const functions = [
    {
        function: getCurrentWeather,
        description: "Get current weather information for a specific location",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The name of the city or location to get weather for"
                }
            },
            required: ["location"]
        }
    },
    {
        function: getLocation,
        description: "Get the user's current location based on their IP address",
        parameters: {
            type: "object",
            properties: {}
        }
    }
]
