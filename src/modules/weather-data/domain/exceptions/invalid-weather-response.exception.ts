export class InvalidWeatherResponseException extends Error {
  constructor(message = 'Invalid weather data response.') {
    super(message);
  }
}
