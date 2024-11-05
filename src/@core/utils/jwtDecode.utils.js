function decodeJWT(token) {
    const payload = token.split('.')[1] // Get the payload part of the JWT
    return JSON.parse(atob(payload)) // Decode the payload from base64
}

export function isTokenExpired(token) {
    const decoded = decodeJWT(token)
    const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
    return decoded.exp < currentTime // If `exp` is less than the current time, it's expired
}
