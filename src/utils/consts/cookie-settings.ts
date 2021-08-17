const cookieSettings = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging',
    sameSite: "lax",
    domain: process.env.CLIENT_URL
}

export default cookieSettings;