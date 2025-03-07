import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

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
});

export { handler as GET, handler as POST };
