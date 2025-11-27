# Test Plan Outline

## Project Overview
Best Brew aims to provide both novice and experienced coffee enthusiasts with a brewing guide and tracking tool to advance their brewing progress. Through customizing personalized recipes and scoring brewing outcomes, users will receive metrics and insights on their best recipes and coffees, helping them develop their skills and learn about their preferences. 

## Test Plan Details
* Project Name: Best Brew
* Test Manager: Matt Smith

## In-Scope Features
* User Login and Sign-up: ensure that Supbase registration correctly registers users and provides appropriate messages for errors.
* Coffee Bag Creation and Updates: ensure user-added coffees bag are correctly saved in Supbase DB and updates are applied to the correct bag.
* Recipe Creation: ensure that user-created recipes are correctly added to Supabase DB.
* Brew Timer: ensure brew timer displays selected recipe and correctly displays each step in their specified time.
* Brew Result Logging: ensure that brew results are associated with a bag of coffee and and recipe, and are correctly stored to Supabase DB.

## Testing Timeline
* Test Planning: 11/2/25 - 11/9/25
* Test Case Design: 11/10/25 - 11/19/25 
* Test Execution: 11/10/25 - 11/19/25
* Defect Resolution: 11/20/25 - 11/27/25

## Test Objectives
* Functional Testing: Verify that core app functionality identified in _In-Scope Features_ perform as expected for users.
* Usability Testing: Ensure that users can navigate app intuitively and engage with core features without a tutorial.
* Security Testing: Discover and eliminate any vulnerabilities, prevent unauthorized users from accessing restricted data.
* Interoperability Testing: Verify that the app remains fully function across all major browsers.


## Test Strategy
### Frontend Testing: 
* We intend to use a mock strategy to test the functionality of our frontend components. Mocking is a testing technique that creates an isolated environment and mock object that behaves the same as the real component, without using the real API to save on resources. Because our project was built with Vite, we are able to use Vitest to build mock environments and components to test with. 

### Backend Testing
Backend testing was performed through the creation of unit tests with SuperTest and Jest that test several endpoint and ensure that they return correct HTTP codes based on valid or invalid authorization and data. 

## Test Criteria
* Coffee Bag Adding and Editing
    * In create mode, CoffeeBagEntry component should populate a form, and submit a Post request
    * In edit mode, CoffeeBagEntry component should fetch data, populate the form with received data, and submit a Put request
    * CoffeeBagEntry should display an error message if a submission fails

## Test Deliverables
* Test Logs

## Dependencies
* Vitest
* React Testing Library
* Supertest
* Jest
