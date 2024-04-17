# Workflow

## Base structure
Work with base structure in main, when the frame is set migrate to branching stratagy when adding new functionality.

## Branching strategy
* Make a new branch for every new functionality
  * Test the new branch
  * Commit to the branch
  * Repeat until functionality in place
* Test the branch when functionality fully added
* Merge branch to main

## Communication strategy
* Weekly updates of project status
* Weekly opportunities for feedback
* Delivery number one during third week of project, then weekly
* Update requirements after customer feedback

## Testing strategy
* Test continuously as the project progresses
  * Manual: mainly front functionality via UI in browser, but also manually in POSTMAN for pure API testing 
  * POSTMAN: test collection for API and API:auth
  * Unit tests: mainly for API and API:auth
* Go through test specification weekly, adidgn test for new functionality
* Offical testing weekly 
* Fill in report on each official testing event.

## Testing by customer
* Explorative testing of the deployed application
  * Used in the early stages when the application is only partly functioning 
* Later on: provide tst specification for the customer to go through
  * When the base of all intended functionality is in place
