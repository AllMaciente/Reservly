import { PrismaClient } from "@prisma/client";
import NextAuth, { User as NextAuthUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}

interface UserWithRole extends NextAuthUser {
  role: string;
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        if (!user.password) {
          throw new Error("User password is null");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          provider: user.provider,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      async profile(profile) {
        const user = await prisma.user.upsert({
          where: { email: profile.email },
          update: {
            name: profile.name,
            image: profile.avatar_url,
            provider: "GITHUB",
            providerId: profile.id.toString(),
          },
          create: {
            email: profile.email,
            name: profile.name,
            image: profile.avatar_url,
            provider: "GITHUB",
            providerId: profile.id.toString(),
            role: "USER",
          },
        });

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          provider: user.provider,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as UserWithRole).role;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.role = token.role as string | undefined;
        session.user.email = token.email as string | undefined;
        session.user.name = token.name as string | undefined;
        session.user.image = token.image as string | undefined;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST, handler as authOptions };
