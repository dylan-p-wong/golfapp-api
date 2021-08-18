const cookieSettings = {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging',
    sameSite: "lax",
    domain: process.env.COOKIE_DOMAIN
}

export default cookieSettings;