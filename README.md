# Smoke Tests for Bing AI

## Table of Contents

- [How to Run the Project](#how-to-run-the-project)
- [Useful URLs](#useful-urls)
  - [Codegen](#codegen)
  - [Headed UI Mode](#headed-ui-mode)
  - [GitHub](#github)
- [Test Plan](test-plan.md)
- [Test Report](test-report.md)
- [Possible Enhancements](possible-enhancements.md)

## How to run the project

- instal dependencies
  `npm i`
- instal playwright dependencies
  `npx playwright install`
- run tests without browser GUI:  
  `npx playwright test`
- run test with browser GUI:  
  `npx playwright test --headed`
- viewing report  
  `npx playwright show-report`

## useful urls

### Codegen:

`npx playwright codegen https://www.bing.com/search?form=MY02CC&OCID=MY02CC&q=Bing+AI&showconv=1`

### Headed UI mode:

`npx playwright test --ui`

### GitHub

- project code: https://github.com/dudziakm/bingAiTests
- CI/CD (Actions): https://github.com/dudziakm/bingAiTests/actions
