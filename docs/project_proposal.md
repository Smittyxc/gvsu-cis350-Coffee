
# CIS 350 Course Project

### Perfect Pour: an intuitive coffee brewing guide

Team name: __Coffee__

Team members:
- Matt Smith
- Jaden Henderson
- Joshua Burgenmeyer

# 1. Abstract
In the world of specialty coffee, coffee is much more than a quick source of caffeine in the morning. Enthusiasts tend to have a methodical approach to their coffee preparation that involves the control of many variables with the goal of producing a bright and flavorful cup of coffee. Some of these variables include coffee bean variety, grind size, water mineral content, water temperature, pour technique, timing of pours, and agitation of the coffee ground bed. During the brewing process, managing these factors can become a headache, especially because of its time sensitivity. Although apps exist for different brew styles (Aeropress, espresso), there is a market gap for a brew guide aimed at pour over coffee. Existing apps lack nuances specific to pour overs and additionally do not faciliate meaningful data tracking, hindering users' ability to dial in coffee to perfection.

# 2. Introduction
Given the market gap in brewing guides with meaningful data logging and visualizations, our app aims to provide enthusiasts with simple tool they can use for their daily brewing. Our app is unique in it targeting meaningful metrics, as coffee enthusiasts could benefit from a repository of their results that can be reviewed and compared, in addition to serving as a log of their pregress and noteworthy beans. With the goal of producing a mobile functional app and the difficulties of getting an app published, our team opted for a progressive web app (PWA) to best provide a mobile-like experience while using technologies we have experience in. The following functional requirements section will delineate the scope, audience, and requirements of the app.

## 2.1 Requirements Document
### 2.1.1 Scope:
Best Brew is a PWA designed to guide coffee enthusiasts optimize their coffee brewing. Users can create and follow recipe guides, log data on their coffee, and view statistics of their coffee intake, along with common app functionality like account creation, management, and various settings. With sufficient time, additional peripherals could be incorporated into the project, such as an arduino scale to calculate flow rate, providing users with more data on their pouring techniques. 

### 2.1.2 Audience:
Intended users fall into two distinct groups:
- Coffee novices: Users who are new to specialty coffee and need clear, guided instructions
- Coffee ethusiasts: Users who want to create and use detailed recipes and seek to record detailed information on each cup

### 2.1.3 Functional Requirements
__Coffee Bag Logging__:
- FR1: The system shall handle the addition of bags of coffee and their details to user profiles.
- FR2: The system shall track remaining grams of coffee based on amount of brews performed with it.
- FR3: The system shall allow users to copy previous bags of coffee as a template.
- FR4: The system shall track the number of days past roast date for a bag of coffee.

__Brew Result Loggin__:
- FR5: The system shall allow users to enter brew results that are associated with a specific recipe and bag of coffee.
- FR6: Brew results in the system shall consist of flavor notes, recipe used, brightness, bitterness, acidity, sweetness, and balance. 
- FR6: The system shall display a list of brew results by date per bag of coffee.

    
__Recipe Management__:
- FR7: The recipe library shall handle the creation recipes consisting of a name, dripper, coffee dose, grinder, grind size, water temperature, and a sequence of timed steps.
- FR8: The recipe library shall handle the modification and deletion of recipes.
- FR9: The recipe library shall allow users to view and filter their recipes.

__Brew Timer__:
- FR10: The system shall enter the brew guide feature on the click of a specific recipe.
- FR11: The brew guide shall handle pausing and starting of the brew timer.
- FR12: The brew guide shall provide a visual and audio cue at the changing of a step
- FR13: The brew guide shall take users to a data entry form upon completion of a brew.

__Data Visualization__:
- FR14: The dashboard shall create a radar graph composed of clarity, acidity, sweetness, body, and flavor for each recent bag of coffee.
- FR15: The dashboard shall create a Tree graph of the total number of cups of coffee they've drank of a certain subspecies, country, or processing method.
- FR16: The dashboard shall calculate the remaining coffee left in a bag 
- FR17: The dashboard shall notify users when the amount of coffee remaining falls below a specified threshold.
- FR18: The dashboard shall display average ranking of coffees based on country, processing method, recipe, or coffee type.


### 2.1.4 Non-Functional Requirements
__Usability__:
- NF1: The system shall be intuitive so that users can start and complete their first brew session without needing a tutorial.
- NF2: The navigation to the brew time shall take no more than three clicks.
- NF3: The system shall detect user error in forms and provide a specific prompt to fix.
- NF4: The system's UI shall retain a simplistic and minimal design

__Security & Privacy__:
- NF5: The system shall acheive secure register and sign-in through Supabase's Auth system
- NF6: The system shall use row level secure in its database.
- NF7: The system shall use JWTs for for user authentication with every API call. 
- NF8: Recipes shall remain private by default.
- NF9: Public recipes shall not be editable by users unless copied first.
- NF10: Unsuccessful logins shall be recorded in Supabase Auth logs.
- NF11: Users shal receive email notification of important setting changes to their profile.

__Organizational__:
- NF12: The system's development shall be documented in Jira logs and repo documents.
- NF13: Source code shall be documented to provide a high level overview of each function, component, and API endpoint.
- NF14: Source code shall adhere to Typescript standards for improved readability and maintainence.

__Scalability__:
- NF15: Storage usage shall not exceed the free tier of Supabase.

__Interoperability__:
- NF16: The PWA service worker shall correctly detect updates in both Android and IOS environments.
- NF17: The IndexedDB shall reliably store data in mobile Safari, Chrome, and Firebox.
- NF18: The PWA shall be primarily designed for mobile use over desktop use.


# Anticipated Technologies

This application is best suited for mobile use, but due to the timeframe of the project, lack of mobile development experience of our team, and difficulty of getting apps published on mobile devices, we opted to create a Progressive Web App (PWA). PWA's offer a mobile-like user experience but are created from web technologies, a strength of our team. Furthermore, PWA's offer offline functionality, push notifications, and a home screen icon, making them a strong candidate for our team compared to a mobile-specific stack.

Our team has selected a conventional technology stack of Node, Express, React, and Postgres. This stack was chosen for is ease of use, prevalence, active communities, and robust documentation. Additional tool we intend to use are Tailwind for CSS, Vite as a front-end build tool, and Vite-PWA for managing the PWA service-worker. Time permitting, IndexedDB is a NoSQL database that is stored in mobile devices' browsers, permitting a great offline experience that could be implemented.   

# Method/Approach

Our approach to this project will be base on Agile/Scrum; we intend to have weekly meetings where we can create a backlog, assign tasks, build sprints, and give updates on the previous week's work. Although we will each have our own tasks, it is important to us to still learn about other's work and understand how it's being implemented. It will be a very incremental process where we portion out work into appropriate story-points and assess our burndown to gauge how quickly we can work. We strive to rate story points accurately and improve our metrics as we progress. 

# Estimated Timeline

- Sept. 8 - Sept. 27: 
    - Planning
    - Prelimary diagrams/UI design
- Sept. 28 - Oct. 4: 
    - More planning
    - Role clarification
- Oct. 5 - Oct. 11:
    - User Auth w/ Supbase
    - Login and Signup Forms
    - Coffee bag entry UI form
    - Express JWT Middleware 
- Oct. 11 - Oct. 18:
    - Recipe entry forms
    - Connent frontend components to backend
    - API Endpoints
    - Refine Supabase DB tables
- Oct. 19 - Oct. 25:
    - Timer component
    - Dashboard component with graphs
    - API Endpoint
- Oct. 26 - Nov. 1:
    - Dashboard components
    - API Endpoint
    - Beginning creating tests
    - Refine documentation
- Nov. 2 - Nov. 8:
    - Continue testing
    - Bug fixing
    - Review rubric requirements
- Nov. 9 - Nov. 15:
    - Return to UI, stylistic improvements
    - Consider additional features
- Nov. 16 - Nov: 22:
- Nov. 23 - Nov. 29:
- Nov. 30 - Dec. 6:


# Anticipated Problems

- Understand domain and user needs
- Learning new technologies (Node, Express, Postgres)
- Maintaining thorough documentation and logs



Remember this is a living document is expected to be changed as you make progress on your project.
