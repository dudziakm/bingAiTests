# Smoke Tests for Bing AI

## Commands

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

## Codegen:

`npx playwright codegen https://www.bing.com/search?form=MY02CC&OCID=MY02CC&q=Bing+AI&showconv=1`

## Headed UI mode:

`npx playwright test --ui`

## GitHub

- project code: https://github.com/dudziakm/bingAiTests
- CI/CD (Actions): https://github.com/dudziakm/bingAiTests/actions
