
# CIS 350 Course Project

### Perfect Pour: an intuitive coffee brewing guide

Team name: __Coffee__

Team members:
- Matt Smith
- Jaden Henderson
- Third Dude

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
1. Users will be able to adds bags of coffee and related information to their profile
2. Users will be able to enter the following brew metrics that are associated with a specific recipe and bag of coffee.
    - Clarity, acidity, sweetness, body, and flavor on a  1 - 5 scale
    - Overall score from 1 - 10

__Recipe Management__:
1. Users will be able to create, modify, and delete recipes consisting of a name, dripper, coffee dose, grinder, grind size, water temperature, and a sequenital of timed steps
2. Each step will include a description and end time. 
3. Users will be able to view, search, and filter their recipe library.

__Brew Timer__:
1. Users will be able to select a recipe and be taken to the brew guide feature
2. Users will be able to start and pause the guide
3. The system will provide a visual and audio cue at the changing of a step
4. Users wil be able to, upon completion of a brew, log results on their coffee.

__Data Visualization__:
1. Users can view a radar graph composed of clarity, acidity, sweetness, body, and flavor for each recent bag of coffee.
2. Users can view a Tree graph of the total number of cups of coffee they've drank of a certain subspecies, country, or processing method.
3. Users can view the remaining coffee left in a bag and receive a notifcation when it falls beneath a set weight.
4. Users can view their average ranking of coffees based on country, processing method, recipe, or coffee type.

__User Account__:
 There are several features our ideal app will support: the ability for users to add bags of coffee to their account; the ability for users to add, edit, and delete pour over recipes to be used in the brew guide; the ability for users to use their recipes in a timer-like guide that prompts certain brewing actions at certain time points; and the ability to log data on their coffee. The dashboard feature aims to incorporate visualizations on bags of coffee and lifetime coffee statistics, some being:

### 2.1.4 Non-Functional Requirements
- The PWA will function correctly in both Android and IOS environments
- The codebase will be well-documented and adhere to best industry practices to ensure maintainability




# Anticipated Technologies

This application is best suited for mobile use, but due to the timeframe of the project, lack of mobile development experience of our team, and difficulty of getting apps published on mobile devices, we opted to create a Progressive Web App (PWA). PWA's offer a mobile-like user experience but are created from web technologies, a strength of our team. Furthermore, PWA's offer offline functionality, push notifications, and a home screen icon, making them a strong candidate for our team compared to a mobile-specific stack.

Our team has selected a conventional technology stack of Node, Express, React, and Postgres. This stack was chosen for is ease of use, prevalence, active communities, and robust documentation. Additional tool we intend to use are Tailwind for CSS, Vite as a front-end build tool, and Vite-PWA for managing the PWA service-worker. Time permitting, IndexedDB is a NoSQL database that is stored in mobile devices' browsers, permitting a great offline experience that could be implemented.   

# Method/Approach

(What is your estimated "plan of attack" for developing this project)

# Estimated Timeline

(Figure out what your major milestones for this project will be, including how long you anticipate it *may* take to reach that point)

# Anticipated Problems

(Describe any problems you foresee that you will need to overcome)

Remember this is a living document is expected to be changed as you make progress on your project.
