import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'


export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    database: process.env.DB_URL,
    session: {
        jwt: true
    },
    jwt: {
        secret: 'thisismysecret'
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session(session, token) {
            if (session) {
                session.user.id = token.id
            }
            return session
        },
    }
})