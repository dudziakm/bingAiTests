# Smoke Tests for Login functionality - Thought Process

## Page with Login functionality

1. Object of tests
   - demo of the Bank page
   - url: https://demo-bank.vercel.app/
1. Login functionality
   - login and password are accepted is both have 8 characters
   - login is incorrect if it has less than 8 chars
   - password is incorrect if it has less than 8 chars

## Type of tests

- login with proper login and password
- try to login with wrong login
- try to login with wrong password
- check Login button is disabled when there is no data in input elements

## Possible Improvements

- we can check special characters
- we can try to inject SQL/JS code
- we can confirm user cannot put more than 8 chars in each input element
- we can try to login as the same user from a few browsers in the same time
