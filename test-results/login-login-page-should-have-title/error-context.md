# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> login page should have title
- Location: e2e\login.spec.ts:3:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('login page should have title', async ({ page }) => {
> 4 |     await page.goto('http://localhost:3000/login');
    |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
  5 |     await expect(page).toHaveTitle(/login/i);
  6 | });
  7 |
```
