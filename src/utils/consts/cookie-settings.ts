const cookieSettings = {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging',
    sameSite: "lax",
    domain: '.auctionhouse.shop'
}

export default cookieSettings;