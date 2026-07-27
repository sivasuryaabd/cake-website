export const BASE_URL="http://127.0.0.1:8000"
export const API_URL="${BASE_URL}/api/v1"

export function mediaUrl(path){
    if(!path) return '';
    if(path.startsWith('http')) return path;
    return '${BASE_URL}${path}';
}