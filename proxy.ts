


import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
    if (
        request.nextUrl.pathname === "/api/user" ||
        request.nextUrl.pathname.startsWith("/api/user/")
    ) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.delete("origin");
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

    const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://160.187.87.138:9859/api/";
    const wsUrl = apiUrl.replace(/^http/, "ws");

    const cspHeader = `
    base-uri 'self';
    block-all-mixed-content;
    connect-src 'self' blob: data: ${apiUrl} ${wsUrl} ws: wss: http: https:;
    default-src 'self' blob: data:;
    font-src 'self' https://fonts.gstatic.com;
    form-action 'self';
    frame-ancestors 'self';
    frame-src 'self';
    img-src 'self' blob: data: https: http:;
    object-src 'none';
    script-src-elem 'self' ${process.env.NODE_ENV === "development"
            ? "'unsafe-inline' 'unsafe-eval'"
            : `'nonce-${nonce}' 'strict-dynamic'`
        };
    script-src 'self' ${process.env.NODE_ENV === "development"
            ? "'unsafe-inline' 'unsafe-eval'"
            : `'nonce-${nonce}' 'strict-dynamic'`
        };
    style-src 'self' 'unsafe-inline';
`;

    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, " ")
        .trim();

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-nonce", nonce);

    requestHeaders.set(
        "Content-Security-Policy",
        contentSecurityPolicyHeaderValue,
    );

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set(
        "Content-Security-Policy",
        contentSecurityPolicyHeaderValue,
    );

    return response;
};

export const config = {
    matcher: [
        "/api/user/:path*",
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
