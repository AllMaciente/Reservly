import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/creadentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      creadentials: { email: {}, password: {} },
      async authorize(creadentials, req) {
        const user = {
          id: 1,
          name: "allan",
          email: "allan@.com",
          image:
            "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
