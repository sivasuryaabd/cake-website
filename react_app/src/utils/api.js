export const BASE_URL="https://cake-website-backend.onrender.com"
export const API_URL="${BASE_URL}/api/v1"

export function mediaUrl(path){
    if(!path) return '';
    if(path.startsWith('https://')) return path;
    return `${BASE_URL}${path}`;
}