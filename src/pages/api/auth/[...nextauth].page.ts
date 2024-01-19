import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { credential } from '../utils/firebaseHelper';

export const authOptions: NextAuthOptions = {
  adapter: FirestoreAdapter({
    credential,
  }),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user = {
        id: user.id,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
