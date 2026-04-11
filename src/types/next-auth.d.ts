import type { DefaultSession } from "next-auth";

// Augments the built-in Session type to expose id and role set in auth.ts callbacks.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}