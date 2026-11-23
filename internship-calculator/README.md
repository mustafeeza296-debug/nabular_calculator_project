# Nova Calculator — Internship Project

A responsive calculator built using **HTML5, CSS3 (Flexbox + CSS Grid), Bootstrap 5 and vanilla JavaScript**. No calculation library or external JavaScript library is used.

## Features

- Addition, subtraction, multiplication and division
- Modulo / remainder (`%`)
- Square root (`√`)
- AC (clear all), CE (clear current entry) and backspace
- Whole-number and decimal calculations
- Keyboard support: digits, `+ - * / %`, `.`, Enter, Escape and Backspace
- Dark/light theme toggle
- Responsive layout for desktop, tablet and mobile
- Friendly handling of division by zero, modulo by zero and negative square roots
- Accessible button labels and live result announcements

## Project structure

```text
internship-calculator/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## Run locally

1. Extract the ZIP file.
2. Open the `internship-calculator` folder.
3. Double-click `index.html` to open it in a modern browser.

No installation, backend, database, build step or API key is required. An internet connection is needed to load the Bootstrap stylesheet and optional Google Fonts; the calculator logic itself is local.

For a local development server, open a terminal in this folder and run:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Test checklist

| Test | Input / action | Expected result |
|---|---|---|
| Addition | `12 + 8 =` | `20` |
| Subtraction | `12 - 8 =` | `4` |
| Multiplication | `12 × 8 =` | `96` |
| Division | `12 ÷ 4 =` | `3` |
| Modulo | `17 % 5 =` | `2` |
| Decimal | `2.5 + 1.25 =` | `3.75` |
| Whole number | `7 × 6 =` | `42` |
| Square root | `√(81)` | `9` |
| Divide by zero | `8 ÷ 0 =` | Friendly error message |
| Negative square root | `√(-9)` | Friendly error message |
| AC | Press `AC` | Display resets to `0` |
| CE | Enter `456`, press `CE` | Current entry resets to `0` |
| Backspace | Enter `456`, press `⌫` | Display becomes `45` |
| Keyboard | Type `9 + 3`, press Enter | `12` |
| Theme | Press sun/moon button | Theme changes |

## Requirement mapping

| Internship brief requirement | Where it is implemented |
|---|---|
| HTML | `index.html` |
| CSS using Flexbox or Grid | `style.css` (both are used) |
| Bootstrap | Bootstrap 5 stylesheet in `index.html` |
| JavaScript event listeners | `script.js` click and keyboard listeners |
| Multiple functions | `script.js` contains focused functions for each action |
| Loops | `for` loop adds keyboard focus support to calculator keys |
| if / else | operation selection and event handling in `script.js` |
| innerText / innerHTML | `innerText` updates display and status; no unsafe HTML injection is needed |
| Comments | Explanatory comments are included in `script.js` |
| Required operations | `calculateValues()` and `squareRoot()` |
| AC and Equal | AC and `=` controls |
| Decimals and whole numbers | decimal input and JavaScript number arithmetic |
| No external calculation library | only native JavaScript is used for calculator logic |
| GitHub + Netlify | deployment steps below |

## Deploy using GitHub and Netlify

### 1. Push the project to GitHub

1. Create or sign in to your GitHub account.
2. Create a new public repository named `nova-calculator` (or another name you prefer).
3. Extract this project ZIP.
4. Open a terminal inside the extracted project folder and run:

```bash
git init
git add .
git commit -m "Build Nova Calculator internship project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nova-calculator.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If Git asks you to authenticate, complete GitHub's sign-in flow.

### 2. Publish with Netlify

1. Sign in at https://www.netlify.com/.
2. Choose **Add new site** → **Import an existing project**.
3. Select **GitHub** and authorize Netlify if asked.
4. Choose your `nova-calculator` repository.
5. Build command: leave blank.
6. Publish directory: `.` (the repository root).
7. Select **Deploy site**.
8. Wait for the deployment to finish, then open the generated `https://....netlify.app` URL.
9. Test the live site on desktop and mobile.
10. Copy the live Netlify URL into your internship submission Google Form.

Whenever you push a new commit to the connected GitHub repository, Netlify automatically redeploys the site.

## Before submitting

- [ ] Run every item in the test checklist.
- [ ] Confirm the repository contains `index.html`, `style.css`, `script.js` and `README.md`.
- [ ] Confirm the Netlify URL opens without errors.
- [ ] Test the live URL in a private/incognito browser window.
- [ ] Submit the Netlify live URL in the Google Form specified by your internship instructions.
