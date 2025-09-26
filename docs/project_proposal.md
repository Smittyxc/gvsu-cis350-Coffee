
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
Given the market gap in brewing guides with meaningful data logging and visualizations, our app aims to provide enthusiasts with simple tool they can use for their daily brewing. The following functional requirements section will delineate the scope, audience, and requirements of the app.
## 2.1 Requirements Document
### 2.1.1 Scope:
Best Brew is a progressive web app (PWA) designed to guide coffee enthusiasts optimize their coffee brewing. Users can create and follow recipe guides, log data on their coffee, and view statistics of their coffee intake.

### 2.1.2 Audience:
Intended users fall into two distinct groups:
- Coffee novices: Users who are new to specialty coffee and need clear, guided instructions
- Coffee ethusiasts: Users who want to create and use detailed recipes and seek to record detailed information on each cup

### 2.1.3 Functional Requirements
__Data Logging__:
- R1: The system shall handle the addition of bags of coffee and related information to their profile
- R2: The system shall allow users to enter brew metrics that are associated with a specific recipe and bag of coffee.
    
__Recipe Management__:
- R3: The recipe library shall handle the creation recipes consisting of a name, dripper, coffee dose, grinder, grind size, water temperature, and a sequence of timed steps.
- R4: The recipe library shall handle the modification and deletion of recipes.
- R5: The recipe library shall allow users to view, search, and filter their recipes.

__Brew Timer__:
- R6: The system shall enter the brew guide feature on the click of a specific recipe.
- R7: The brew guide shall handle pausing and starting of the brew timer.
- R8: The brew guide shall provide a visual and audio cue at the changing of a step
- R9. The brew guide shall take users to a data entry form upon completion of a brew.

__Data Visualization__:
- R10: The dashboard shall create a radar graph composed of clarity, acidity, sweetness, body, and flavor for each recent bag of coffee.
- R11: The dashboard shall create a Tree graph of the total number of cups of coffee they've drank of a certain subspecies, country, or processing method.
- R12: The dashboard shall calculate the remaining coffee left in a bag 
- R13: The dashboard shall notify users when the amount of coffee remaining falls below a specified threshold.
- R14: The dashboard shall display average ranking of coffees based on country, processing method, recipe, or coffee type.

__User Account__:
 There are several features our ideal app will support: the ability for users to add bags of coffee to their account; the ability for users to add, edit, and delete pour over recipes to be used in the brew guide; the ability for users to use their recipes in a timer-like guide that prompts certain brewing actions at certain time points; and the ability to log data on their coffee. The dashboard feature aims to incorporate visualizations on bags of coffee and lifetime coffee statistics, some being:

### 2.1.4 Non-Functional Requirements

- N1: The PWA shall function correctly in both Android and IOS environments.
- N2: The codebase shall be well-documented and adhere to best industry practices to ensure maintainability.
- N3. The system shall be intuitive so that users can start and complete their first brew session without needing a tutorial.
- N4. The system shall be designed primarily for mobile use.





# Anticipated Technologies

This application is best suited for mobile use, but due to the timeframe of the project, lack of mobile development experience of our team, and difficulty of getting apps published on mobile devices, we opted to create a Progressive Web App (PWA). PWA's offer a mobile-like user experience but are created from web technologies, a strength of our team. Furthermore, PWA's offer offline functionality, push notifications, and a home screen icon, making them a strong candidate for our team compared to a mobile-specific stack.

Our team has selected a conventional technology stack of Node, Express, React, and Postgres. This stack was chosen for is ease of use, prevalence, active communities, and robust documentation. Additional tool we intend to use are Tailwind for CSS, Vite as a front-end build tool, and Vite-PWA for managing the PWA service-worker. Time permitting, IndexedDB is a NoSQL database that is stored in mobile devices' browsers, permitting a great offline experience that could be implemented.   

# Method/Approach

Our approach to this project will be base on Agile/Scrum; we intend to have weekly meetings where we can create a backlog, assign tasks, build sprints, and give updates on the previous week's work. Although we will each have our own tasks, it is important to us to still learn about other's work and understand how it's being implemented. It will be a very incremental process where we portion out work into appropriate story-points and assess our burndown to gauge how quickly we can work. Hopefully, we can learn to rate tasks accurately and improve our metrics as we progress. 

# Estimated Timeline

- Sept. 8 - Sept. 26: Planning and prelimary diagrams/UI design
- Sept. 26 - Oct. 31: Build phase 
    - Build Supabase DB
    - React frontend
    - Node backend
- Nov. 1 - 31: Testing, revision, and completion of documentation


# Anticipated Problems

- Understand domain and user needs
- Learning new technologies (Node, Express, Postgres)
- Maintaining thorough documentation and logs



Remember this is a living document is expected to be changed as you make progress on your project.
