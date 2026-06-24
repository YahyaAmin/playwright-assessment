# Jupiter Toys — Playwright Test Automation

Automated UI tests for the [Jupiter Toys](https://jupiter.cloud.planittesting.com) demo site, built with Playwright and TypeScript using a Page Object Model (POM).

The repository contains **two layers** that both drive the same page objects:

1. **Plain Playwright tests** (`tests/*.spec.ts`) — the primary solution, written in idiomatic Playwright Test.
2. **A BDD layer** (`features/`) — the same three scenarios expressed in Gherkin via [`playwright-bdd`](https://github.com/vitalets/playwright-bdd), provided as an additional demonstration.

Both layers reuse the page objects in `src/pages/`, so the underlying automation logic is shared.

## Tech Stack

- **Playwright** — chosen for its built-in auto-waiting (web-first assertions), cross-browser support, and tracing tools
- **TypeScript** — type-safe page objects and tests
- **playwright-bdd** — generates Playwright tests from Gherkin feature files (BDD layer)
- **Node.js / npm**

## Prerequisites

- **Node.js** (v18 or higher recommended) — check with `node -v`
- **npm** (bundled with Node.js)

## Installation

```bash
# Clone the repository
git clone https://github.com/YahyaAmin/<your-repo-name>.git
cd <your-repo-name>

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install
```

## Running the Tests

### Plain Playwright suite (primary solution)

```bash
# Run all tests (all browsers)
npx playwright test

# Run a single test file
npx playwright test cart_totals

# Run on a single browser
npx playwright test --project=chromium

# Run in interactive UI mode (watch steps execute)
npx playwright test --ui

# Run the submission test 5 times to demonstrate stability (TC2)
npx playwright test contact_page_submission --repeat-each=5
```

### BDD suite (additional layer)

The BDD layer uses a separate config (`playwright.config.bdd.ts`). Tests are generated
from the `.feature` files first, then run:

```bash
# Generate tests from feature files, then run the full BDD suite
npx bddgen --config=playwright.config.bdd.ts && npx playwright test --config=playwright.config.bdd.ts

# Run a single scenario by tag (e.g. @tc1, @tc2, @tc3, or @contact / @cart)
npx bddgen --config=playwright.config.bdd.ts && npx playwright test --config=playwright.config.bdd.ts --grep @tc3
```

## Viewing Reports

```bash
# Plain Playwright report
npx playwright show-report

# BDD report (written to a separate folder to avoid clashing)
npx playwright show-report playwright-report-bdd
```

Each report shows per-test steps, timings, and traces. In CI, the plain report is uploaded as a downloadable artifact.

## Recommended VS Code Extension (BDD authoring only)

For editing the `.feature` files with step navigation (Ctrl+click to step definition),
autocomplete, and highlighting of undefined steps, install:

- **Cucumber (Gherkin) Full Support** (publisher: Alexander Krechik)

The workspace `.vscode/settings.json` is pre-configured to link feature steps to their
definitions. This is an editor convenience only and is **not required** to run the tests.

## Project Structure

```
.
├── src/
│   └── pages/
│       ├── BasePage.ts        # Base class — shared page instance + goto helper
│       ├── ContactPage.ts     # Contact form locators and actions
│       ├── ShopPage.ts        # Shop — add products to cart by name
│       └── CartPage.ts        # Cart — read prices, quantities, subtotals, total
├── tests/                     # Plain Playwright tests
│   ├── contact_page_validation.spec.ts    # TC1
│   ├── contact_page_submission.spec.ts    # TC2
│   └── cart_totals.spec.ts                # TC3
├── features/                  # BDD layer
│   ├── contact.feature        # TC1 + TC2 scenarios
│   ├── cart.feature           # TC3 scenario (with data table)
│   ├── fixtures.ts            # Page objects exposed as BDD fixtures
│   └── steps/
│       ├── contact.steps.ts
│       └── cart.steps.ts
├── .github/workflows/playwright.yml        # CI pipeline
├── playwright.config.ts                    # Plain Playwright config
└── playwright.config.bdd.ts                # BDD config
```

The design follows the Page Object Model: page objects own locators and actions, while
tests (or BDD step definitions) own assertions. All page objects extend `BasePage`, which
holds the shared Playwright `page` instance and a common navigation helper. In the BDD
layer, page objects are provided to step definitions via fixtures (`features/fixtures.ts`),
so each scenario gets its own instances.

## Test Cases

**TC1 — Contact form validation**
Navigates to the Contact page, submits the empty form, and asserts validation errors appear
for the mandatory fields (Forename, Email, Message) along with the error banner. Then fills
valid data and asserts the errors and banner clear (the site clears them reactively as valid
input is entered).

**TC2 — Contact form submission**
Fills the mandatory fields with valid data, submits, and asserts the success message. The
site shows a variable "Sending Feedback" delay before the confirmation appears; the test
waits for that intermediate state to clear before asserting, so it remains stable. Run 5×
via `--repeat-each=5` with a 100% pass rate.

**TC3 — Cart totals**
Adds 2 Stuffed Frog, 5 Fluffy Bunny, and 3 Valentine Bear to the cart. On the Cart page it
verifies, for each product, that subtotal = unit price × quantity, and that the cart Total
equals the sum of all subtotals. Unit prices are read from the displayed values rather than
hard-coded. In the plain suite, per-product checks are wrapped in `test.step()` so the report
shows the computed values; in the BDD layer, the products and quantities are supplied via a
Gherkin data table.

## CI / Pipeline

A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on every push and pull
request to `main`/`master`. It:

1. Checks out the code and sets up Node.js
2. Installs dependencies (`npm ci`)
3. Installs Playwright browsers with system dependencies
4. Runs the plain Playwright test suite
5. Uploads the HTML report as a build artifact (retained 30 days)

The BDD suite is run locally (commands above) and is not currently wired into CI.

## Assumptions, Trade-offs & Known Issues

- **Protocol:** the brief lists the app URL as `http`, but the site also serves over `https`. The suite standardises on `https`.
- **TC3 products:** all three required products (Stuffed Frog, Fluffy Bunny, Valentine Bear) were available, so no substitution was needed.
- **Email validation defect (application bug):** the Email field displays a "Please enter a valid email" message for invalid formats, but submission is **not** actually blocked — an invalid email still submits. Noted as an application defect; tests use valid data for the happy-path scenarios.
- **Application console errors:** the site logs a 403 on a Bootstrap glyphicon asset and an AngularJS `$apply already in progress` warning. These are application-side and do not affect test outcomes.
- **Variable "Sending Feedback" delay (TC2):** the confirmation screen appears after a non-deterministic delay (observed up to ~13s). This is handled by waiting for the "Sending Feedback" heading to disappear (with an extended timeout) before asserting the success message — no hard-coded waits are used, keeping the test stable.
- **Locator strategy:** role-based locators (`getByRole`) are preferred for interactive elements; stable `id`/`class` selectors are used for elements without a meaningful ARIA role (e.g. validation error spans, the error banner). Product rows in the cart are located by product name.
- **BDD shared state:** the cart step definitions store the scenario's product list in a module-scoped variable shared between the "Given" and "Then" steps. This is sufficient for the single cart scenario here; in a larger suite it would be moved to a fixture or scenario-scoped world object to avoid any cross-scenario interference.

## AI Usage Disclosure

In line with the assessment instructions, AI was used in the following ways:

- **Debugging assistance** — help diagnosing the TC2 timing issue from the failure trace

- **Drafting and proofreading this README**, and adding explanatory comments to the cart step definitions.

All test code and page objects were written by me. No AI-generated code was used for the test logic itself.
