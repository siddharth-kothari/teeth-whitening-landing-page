import type { NextAuthOptions, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { api } from "../../index";
import { User, Account } from "next-auth";
import { query } from "@/config/db";
import bcrypt from "bcryptjs";

type SignInCallbackParams = {
  user: User;
  account: Account;
  profile: Profile;
};

const signInCallback: (
  params: SignInCallbackParams
) => Promise<boolean | undefined> = async ({ user, account, profile }) => {
  if (account?.provider == "credentials") {
    return true;
  }

  if (account?.provider == "google") {
    try {
      const name = user.name?.split(" ") ?? "User";
      const results = await query({
        query: "SELECT * FROM users WHERE email = ? AND is_deleted != 1",
        data: [user.email],
      });

      if (results.length == 0) {
        const newUser = await query({
          query:
            "INSERT INTO users(first_name, last_name, email, provider) VALUES(?, ?, ?, ?)",
          data: [name[0], name[1], user.email, "google"],
        });

        return true;
      }

      return true;
    } catch (error) {
      console.log("Error saving user: ", error);
      return false;
    }
  }
};

const callbacks = {
  signIn: signInCallback,
  async session({ session }: any) {
    try {
      //console.log("session", session);
      const results = await query({
        query:
          "SELECT id, first_name FROM users WHERE email = ? AND is_deleted != 1",
        data: [session.user.email],
      });
      const data = results[0];

      session.user.name = data.first_name;
      session.user.id = data.id;
    } catch (error) {
      console.log(error);
    }
    // console.log(session);
    // const acessToken = jwt.sign(
    //   { id: data.id, email: data.email, name: data.name },
    //   process.env.NEXTAUTH_SECRET || "yourFallbackSecret",
    //   { expiresIn: "30d" }
    // );

    return session;
  },
  // Add other callbacks as needed
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        try {
          const existingUser = await query({
            query: "SELECT * FROM users WHERE email = ? AND is_deleted != 1",
            data: [credentials?.email],
          });

          const decodedString = Buffer.from(
            credentials?.password,
            "base64"
          ).toString("utf-8");

          var user = existingUser[0];
          if (existingUser.length > 0) {
            var user = existingUser[0];

            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: callbacks as Record<string, (params: any) => Promise<any>>,
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/login",
  // },

  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60,
  },
};
