import sql from "@/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },


            async authorize(credentials) {
                // Find the user by email
                const users = await sql`
    SELECT * FROM users
    WHERE email = ${credentials.email}
  `;

                // User doesn't exist
                if (users.length === 0) {
                    return null;
                }

                const user = users[0];

                // Compare passwords
                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                // Wrong password
                if (!passwordMatch) {
                    return null;
                }

                // Login successful
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {

            if (account.provider === "google") {
                const existingUser = await sql`
        SELECT * FROM users
        WHERE email = ${user.email}
      `;

                if (existingUser.length === 0) {
                    await sql`
  INSERT INTO users (name, email)
  VALUES (${user.name}, ${user.email})
`;

                }
            }

            return true;
        },
    },
});

export { handler as GET, handler as POST };