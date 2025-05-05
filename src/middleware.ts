import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Allow public access to email verification
      if (req.nextUrl.pathname === "/api/verify-email") {
        return true
      }

      if (req.nextUrl.pathname.startsWith("/api")) {
        return !!token
      }
      return true
    },
  },
})

export const config = {
  matcher: ["/api/:path*"]
}