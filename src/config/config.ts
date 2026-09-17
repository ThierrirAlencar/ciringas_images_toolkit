import { API_PUBLIC_URL, HOST, PORT } from "../core/env";



export const API_URL = `http://${HOST}:${PORT}`
export const PUBLIC_API_URL = API_PUBLIC_URL || API_URL;