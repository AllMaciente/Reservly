export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/settings",
    "/admin/:path*", // Protege todas as rotas que começam com /admin
  ],
};
