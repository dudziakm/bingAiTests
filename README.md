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

## GitHub

- project code: https://github.com/dudziakm/testPw
- CI/CD (Actions): https://github.com/dudziakm/testPw/actions

## codegen:

npx playwright codegen https://www.bing.com/search?form=MY02CC&OCID=MY02CC&q=Bing+AI&showconv=1

## headed UI mode:

npx playwright test --ui
