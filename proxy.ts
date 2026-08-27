


import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const cspHeader = `
    base-uri 'self';
    block-all-mixed-content;
    connect-src 'self' blob: data: ${apiUrl || ""};
    default-src 'self' blob: data:;
    font-src 'self' https://fonts.gstatic.com;
    form-action 'self';
    frame-ancestors 'self';
    frame-src 'self';
    img-src 'self' blob: data:;
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
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
