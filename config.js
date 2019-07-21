export const MOCK_API_URL = "http://localhost:3001"
export const LOCAL_API_URL = "http://localhost:3000"
export const REMOTE_API_URL = "http://192.168.178.132:3000"
export const API_URL = process.env.NODE_ENV === 'development' ? LOCAL_API_URL : REMOTE_API_URL