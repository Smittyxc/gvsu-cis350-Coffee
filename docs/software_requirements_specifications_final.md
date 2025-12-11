# Software Requirements Specification

# Overview
The purpose of our SRS is thoroughly delineate all necessary functions our software needs to perform __and__ how those functions should be implemented. The functions our software must perform are listed as functional requirements and are divided into their respective subsystems. Our nonfunctional requirements specify how the functional requirements shall be carried out. Any team member, whether working on frontend, backend, or testing, should be able to use this document as a blueprint for the entire app and should be able to deduce their tasks from it. If we had clients that we elicited user stories from, the user stories would be translated into the requirements here. The clients should also be able to read the requirements and be in agreement with them. 

# Software Requirements
The following section delineates both functional and nonfunctional software requirements. Both functional and nonfunctional sections are grouped into several clusters of related features that, together, constitute the app's primary features. 

## Functional Requirements
### __Coffee Bag Logging__:
| ID  | Requirement     | 
| :-------------: | :----------: | 
| FR1 | The system shall handle the addition of bags of coffee and their details to user profiles. | 
| FR2 | The system shall track remaining grams of coffee based on amount of brews performed with it. | 
| FR3 | The system shall allow users to edit previously created bags of coffee. | 
| FR4 | The system shall track the number of days past roast date for a bag of coffee. |
| FR5 | The system shall display key properties of each bag in an intuitive interface |

### __Brew Result Logging & Visualization__:
| ID  | Requirement     | 
| :-------------: | :----------: | 
| FR6 | The system shall allow users to enter brew results that are associated with a specific recipe and bag of coffee. | 
| FR7 | Brew results in the system shall consist of flavor notes, recipe used, brightness, bitterness, acidity, sweetness, and balance. |
| FR8 | The system shall display a list of brew results by date per bag of coffee. |
| FR9 | The dashboard shall create a radar graph composed of clarity, acidity, sweetness, body, and flavor for each recent bag of coffee. |
| FR10 | The dashboard shall calculate the remaining coffee left in a bag. |

### __Recipe Management System__:
| ID  | Requirement     | 
| :-------------: | :----------: | 
| FR11 | The recipe library shall handle the creation recipes consisting of a name, dripper, coffee dose, grinder, grind size, water temperature, and a sequence of timed steps. |
| FR12 | The recipe library shall handle the modification and deletion of recipes. |
| FR13 | The recipe library shall allow users to view and sort their recipes. |
| FR14 | The recipe creation form shall allow users to enter a description and timestamp for each step |
| FR15 | The recipe view page shall allow users to select a recipe to use in the Brew Guide and route them there.

### __Brew Timer__:
| ID | Requirement |
| :-------------: | :----------: | 
| FR16 | The system shall enter the brew guide feature on the click of a specific recipe. |
| FR17 | The brew guide shall handle pausing and starting of the brew timer. |
| FR18 | The brew guide shall provide a visual cue at the changing of a step |
| FR19 | The brew guide shall take users to a data entry form upon completion of a brew |
| FR20 | The brew guide shall allow users to abort a brew and restart |

## Non-Functional Requirements

### __Usability__:
| ID | Requirement |
| :-------------: | :----------: | 
| NF1 | The system shall be intuitive so that users can start and complete their first brew session without needing a tutorial. |
| NF2 | The navigation to the brew time shall take no more than three clicks. |
| NF3 | The system shall detect user error in forms and provide a specific prompt to fix. |
| NF4 | The system's UI shall retain a simplistic and minimal design |
| NF5 | The PWA service worker shall correctly detect updates in both Android and IOS environments. |

### __Security & Privacy__:
| ID | Requirement |
| :-------------: | :----------: | 
| NF6 | The system shall achieve secure register and sign in through Supabase's Auth system. |
| NF7 | The system shall use row level secure in its database. |
| NF8 | The system shall use JWTs for for user authentication with every API call.  |
| NF9 | Recipes shall remain private by default. |
| NF10 | Public recipes shall not be editable by users unless copied first. |
| NF11 | Unsuccessful logins shall be recorded in Supabase Auth logs. |
| NF12 | Users shall receive email notification of important setting changes to their profile. |

### __Organizational__:
| ID | Requirement |
| :-------------: | :----------: | 
| NF13 | The system's development shall be documented in Jira logs and repo documents. |
| NF14 | Source code shall be documented to provide a high level overview of each function, component, and API endpoint. |
| NF15 | Source code shall adhere to Typescript standards for improved readability and maintenance. |
| NF16 | Storage usage shall not exceed the free tier of Supabase. |
| NF17 | The PWA shall be primarily designed for mobile use over desktop use. |



### Requirements to Implement in the Future:
- FR21: The dashboard shall create a Tree graph of the total number of cups of coffee they've drank of a certain subspecies, country, or processing method.
- FR22: The dashboard shall notify users when the amount of coffee remaining falls below a specified threshold.
- FR23: The dashboard shall display average ranking of coffees based on country, processing method, recipe, or coffee type.
- NF18: The IndexedDB shall reliably store data in mobile Safari, Chrome, and Firebox.


# Test Specification 
The following sections describes in detail our application's testing modules and their implementation. Our tests target both the frontend and backend, aiming to ensure the key endpoints are robust in checking for proper authentication and authorization, in addition to checking the the frontend displays proper alerts if errors occur in the processing of user requests. We used a mock strategy to test the functionality of our frontend components. Mocking is a testing technique that creates an isolated environment and mock object that behaves the same as the real component, without using the real API to save on resources. Because our project was built with Vite, we are able to use Vitest to build mock environments and components to test with. Backend testing was performed through the creation of unit tests with SuperTest and Jest that test several endpoint and ensure that they return correct HTTP codes based on valid or invalid authorization and data. 

## Unit tests

| ID  | Description | Steps | Input Values | Expected Output | Actual Output | Pass/Fail | Requirement Link |
| :-------------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: |
| TC1 | Post request to '/api/coffee/' endpoint should create a new bag of coffee given valid data and authorization token  | First, sign into the application to obtain a JWT. Get the token's authorization key from the console and add it to the TEST_USER_TOKEN variable in the .env of the server (this token is valid for one hour so all testing must occur while it is valid or else false negatives will occur). Navigate to the server directory and run the backend with command 'npm start' in your console. In a new console instance, navigate to the server directory and execute test cases with 'npm run test'. Testing takes ~5 seconds | Valid authorization token and data const newCoffee = { name: "Test Coffee", roaster: "Test Roaster", process: "Washed", variety: "Maragogype", origin: 'Guatemala', weight: 320, roastDate: '2023-11-08T14:30:00Z'}; | 201 response and return of valid coffee object | Pass: 201 and return of valid data | Pass | FR 1, 5, NF 3 |
| TC2 | Post request to '/api/coffee/' will return 400 for missing data  | Same as above | Valid JWT and data: const invalidCoffee = { // name is missing, roaster: "Test Roaster", process: "Washed", variety: "Maragogype", origin: 'Guatemala', weight: 320, roastDate: '2023-11-08T14:30:00Z'}; | Return 400 error | Returned 400 error | Pass | FR 1, 5, NF 3, 8 | 
| TC3 | Post request to 'api/coffee/' with invalid auth token should return 401 error | Same as above | Same test data as TC1 but excluded authorization in header of request | 401 error | 401 Error | Pass | FR 1, 5, NF 3, 8 |
| TC4 | Post request to /api/recipe/ should succeed with valid data and auth  | Same as above | Valid JWT and data: const recipe = { created_at: '2023-11-08T14:30:00Z', user_id: '', recipe_name: 'James Hoffman V60', dose_grams: 20, grind_size: '2.8.0', steps: [{ time: 30, description: "Let coffee bloom" }], water_amount: 320 }  | 201 response with return of recipe | 201 and valid data received back | Pass | FR 11, 12 |



## Integration tests

| ID  | Description | Steps | Input Values | Expected Output | Actual Output | Pass/Fail | Requirement Link |
| :-------------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: | :----------: |
| TC5 | When in Edit mode, the Coffee Bag page should successfully submit a Put request and update bag attributes and also display correct Success message. | Navigate to client directory of repository. When within repository, run command 'npm run test' in console to execute all test files. Testing takes a few seconds. | Valid mock auth and valid data: const mockCoffeeBag = { id: 'test-bag123', name: 'test-bag', roaster: 'Roaster123' }; | Success message appears on UI | Correct message displays | Pass | FR 1, 3, NR 8 |
| TC6 | When in Create New Bag mode(not edit), the Coffee Bag page should successfully submit a Post request and have success message display on UI. | Same as above | Valid mock auth and valid data: const mockCoffeeBag = { id: 'test-bag123', name: 'test-bag', roaster: 'Roaster123' }; | Success message appears on UI | Correct message displays | Pass | FR 1, 3, NR 8 |
| TC7 | When in Create New Bag mode, the Coffee Bag page should correctly display a submission failed message when invalid data is submitted. | Same as above | Valid mock auth and invalid data: const mockCoffeeBag = { // missing necessary properties id: 'test-bag123', name: 'test-bag' }; | Failure message appears on UI | Correct error message displays | Pass | FR 1, 3, NR 8 |
| TC8 | Recipe list page displays all user-created recipes | Same as above | Valid auth | Successful data retrieval and recipes appear on UI | Expected message appears | Pass | FR 13, 14, NR 9 |
| TC9 | Recipe List UI displays correct error message if Get request fails | Same as above | Valid auth | Error message displayed to user | Expected message appears  | Pass | FR 13, 14, NR 9 |
| TC10 | Recipe List UI displays 'No recipes created yet' message if Get request succeeds and returns no data | Same as above | Valid auth | 'No recipes created yet' message appears in UI | Expected message appears | Pass | FR 13, 14, NR 9 |



# Software Artifacts

Our software artifacts for the project have been separated into 5 categories below, each documenting the progress made in different areas of the software development process. The UML diagrams, which we completed early on in the project gave us a strong base to build off of and informed the design of our database and frontend user workflow. The Extend Use Case section provided more detail on the UX design and its connection to our software requirements. Next, the UI Mockup section shows the progression of our app's UI and our iterations to improve it. The Progress Documentation section provide several artifacts that detail our consistent effort over the semester and a gradual completion of our tickets. Lastly, we have a Testing section that demonstrates proper functioning of several key features. 

* [Netlify Deployment](https://glowing-tiramisu-b1270b.netlify.app/login)

### UML Diagrams
* [User Flow Diagram](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/userFlowDiagram.png)
* [Use Case Diagram](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/useCaseDiagram.png)
* [Class Diagram](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/umlClassDiagram.png)
* [Sequence Diagram](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/umlClassDiagram.png)
* [Communication Diagram](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/communicationDiagram.png)

### Extended Use Cases
* [Add Brew Results](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/extended_use_cases/addBrewUseCase.md)
* [Add Coffee Bag](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/extended_use_cases/addCoffeeUseCase.md)
* [Create Recipe](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/extended_use_cases/createRecipeUseCase.md)
* [Log Results](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/extended_use_cases/logResults.md)
* [Use Brew Timer](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/extended_use_cases/useBrewTimer.md)


### UI Mockups
* [Figma Iteration 1.0](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/figma1.0.pdf)
* [Figma Iteration 2.0](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/figma2.0.pdf)
* [Midterm UI Demo Gif](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/react-demo.gif)

### Progress Documentation
* [Gantt Chart at 10/24](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/ganttChart_10-24-2025.pdf)
* [Gantt Chart at 11/26](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/ganttChart_11-26-2025.pdf)
* [Cumulative Flow Diagram (Jira Task Completion Chart)](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/cumulativeFlowDiagram.png)
* [Jira](https://cis350-coffee.atlassian.net/jira/software/projects/CPG/boards/1)
     * Verified both Dr. Raza and Alyshai have been added to Jira project

### Testing Artifacts
* [Test Planning Document](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/docs/test_plan.md)
* [Backend Unit Test Execution](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/backendTestLog.png)
* [Integration Test Execution](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/artifacts/frontendTestLog.png)
* [Backend Test Code](https://github.com/Smittyxc/gvsu-cis350-Coffee/blob/main/src/server/app.test.js)
* [Integration Test Code](https://github.com/Smittyxc/gvsu-cis350-Coffee/tree/main/tests)