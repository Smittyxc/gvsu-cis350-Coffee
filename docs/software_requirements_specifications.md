# Software Requirements Specification

## Overview
The purpose of our SRS is thoroughly delineate all necessary functions our software needs to perform __and__ how those functions should be implemented. The functions our software must perform are listed as functional requirements and are divided into their respective subsystems. Our nonfunctional requirements specify how the functional requirements shall be carried out. Any team member, whether working on frontend, backend, or testing, should be able to use this document as a blueprint for the entire app and should be able to deduce their tasks from it. If we had clients that we elicited user stories from, the user stories would be translated into the requirements here. The clients should also be able to read the requirements and be in agreement with them. 

## 1. Functional Requirements
__Coffee Bag Logging__:
- FR1: The system shall handle the addition of bags of coffee and their details to user profiles.
- FR2: The system shall track remaining grams of coffee based on amount of brews performed with it.
- FR3: The system shall allow users to copy previous bags of coffee as a template.
- FR4: The system shall track the number of days past roast date for a bag of coffee.

__Brew Result Login__:
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
- (_The following dashboard features will be implemented if sufficient time exist._)
- FR15: The dashboard shall create a Tree graph of the total number of cups of coffee they've drank of a certain subspecies, country, or processing method.
- FR16: The dashboard shall calculate the remaining coffee left in a bag 
- FR17: The dashboard shall notify users when the amount of coffee remaining falls below a specified threshold.
- FR18: The dashboard shall display average ranking of coffees based on country, processing method, recipe, or coffee type.


## 2. Non-Functional Requirements
__Usability__:
- NF1: The system shall be intuitive so that users can start and complete their first brew session without needing a tutorial.
- NF2: The navigation to the brew time shall take no more than three clicks.
- NF3: The system shall detect user error in forms and provide a specific prompt to fix.
- NF4: The system's UI shall retain a simplistic and minimal design

__Security & Privacy__:
- NF5: The system shall achieve secure register and sign-in through Supabase's Auth system
- NF6: The system shall use row level secure in its database.
- NF7: The system shall use JWTs for for user authentication with every API call. 
- NF8: Recipes shall remain private by default.
- NF9: Public recipes shall not be editable by users unless copied first.
- NF10: Unsuccessful logins shall be recorded in Supabase Auth logs.
- NF11: Users shall receive email notification of important setting changes to their profile.

__Organizational__:
- NF12: The system's development shall be documented in Jira logs and repo documents.
- NF13: Source code shall be documented to provide a high level overview of each function, component, and API endpoint.
- NF14: Source code shall adhere to Typescript standards for improved readability and maintenance.

__Scalability__:
- NF15: Storage usage shall not exceed the free tier of Supabase.

__Interoperability__:
- NF16: The PWA service worker shall correctly detect updates in both Android and IOS environments.
- NF17: The IndexedDB shall reliably store data in mobile Safari, Chrome, and Firebox.
- NF18: The PWA shall be primarily designed for mobile use over desktop use.