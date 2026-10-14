<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Set FRONTEND_URL in your backend .env / Railway environment variables
    // to your deployed frontend URL (Vercel or Railway).
    // e.g. https://walangbrownout.vercel.app  or  https://frontend.up.railway.app
    'allowed_origins' => array_filter([
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        env('FRONTEND_URL'),
    ]),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // Must be true if you switch to Sanctum's cookie-based SPA auth later.
    // Token-based auth (what this backend uses) doesn't need it, but it's
    // harmless to leave on.
    'supports_credentials' => true,
];
