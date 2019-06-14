export const MOCK_API_URL = "http://localhost:3001"
export const LOCAL_API_URL = "http://localhost:3000"
export const REMOTE_API_URL = "https://api.goalify.de"
export const API_URL = process.env.NODE_ENV === 'development'? LOCAL_API_URL : REMOTE_API_URL