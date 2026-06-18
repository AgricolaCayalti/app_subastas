const SKEW_SEC = 30; // Margen de reloj

export function decodePlainToken($codedToken){
    return atob($codedToken);
}

export function encodePlainToken($token){
    return btoa($token);
}
export function isExpired(token = null){
    if (!token) return true;
    if (typeof token === 'string') { return true;} // Por si aca tokens viejos.
    if (!token?.expiresAt) return false;
    const now = Math.floor(Date.now() / 1000);
    return token.expiresAt <= now + SKEW_SEC;
}