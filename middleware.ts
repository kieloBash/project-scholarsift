import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/", "/api/webhook/clerk", "/api/auth/_log"],
  ignoredRoutes: ["/api/webhook/clerk", "/api/auth/_log"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
