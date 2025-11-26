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
| FR5 | The system shall display key properties of each bag in an intuituve interface |

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


# Software Artifacts

<Describe the purpose of this section>

* [Extended Use Case](addBrewUseCase.md)
