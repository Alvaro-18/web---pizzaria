import { NextRequest, NextResponse } from "next/server";
import { getCookiesServer } from "./lib/cookieServer";
import { api } from "./services/api";
async function validateToken(token: string) {
  if (!token) return false;

  try {
    await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}


export async function middleware(request: NextRequest) {
  const token = getCookiesServer();

  if (!token || !await validateToken(token)) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  } 
}

export const config = {
  matcher: ["/dashboard/:path*"] //todas as subrotas de dashboard vão passar por verificação
};

