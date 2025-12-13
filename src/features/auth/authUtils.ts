
export const createMockToken = (role: 'admin' | 'user') => {
    const payload = {
        role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const base64Payload = btoa(JSON.stringify(payload));
    return `mockHeader.${base64Payload}.mockSignature`;
};

export const parseToken = (token: string) => {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
};
