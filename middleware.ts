import { NextRequest, NextResponse } from "@/node_modules/next/server";

export function middleware(request:NextRequest) {
    console.log("middleware executed: " + request.nextUrl.pathname);
    let isPublicRoute = true;
    if (request.nextUrl.pathname.startsWith("/account"))
        {
            isPublicRoute = false;
        }
    // if the token is not present and the route is not public, redirect to login
    const token = request.cookies.get("token")?.value || "";
    const loggedIn = (request.cookies.get("isLoggedIn")?.value == "true") ? true : false;

    if (!loggedIn && !isPublicRoute){
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    //if the token is present and the route is public, redirect to home
    if (loggedIn && isPublicRoute){
        return NextResponse.redirect(new URL("/", request.url));
    }

    //redirect this to information in case
    if(request.nextUrl.pathname === "/account") {
        return NextResponse.redirect(new URL("/account/information", request.url));
    }
    
}

//public pages
export const config = {
    matcher: ["/auth/:path*", "/account/:path*"],
};