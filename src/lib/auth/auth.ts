import type { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

import { PrismaAdapter } from './prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.picture,
          image: profile.picture,
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      profile(profile: GithubProfile) {
        return {
          id: profile.id,
          name: profile.name!,
          email: profile.email!,
          image: profile.avatar_url,
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
    },
  },
}
