# Requirement Quiz App

A quiz app to be used in English education at the high school level. The idea is to create customized sections with questions regarding English vocabulary as well as fixed phrases and grammar.

# Application 

## 1: The Quiz
  * 1.1 A quiz with a selectable number of questions (from a limited question pool)
  * 1.2 A quiz with selectable categories, including a mixed one
    * 1.2.1 fixed categories: Vocabulary, idioms and verb phrases
    * 1.2.2 mixed: all question types can occur
  * 1.3 Feedback after each answered question
    * 1.3.1: correct/wrong
    * 1.3.2: The correct answer is displayed
  * 1.4 Different types of questions:
    * 1.4.1: Vocabulary, question answered via free text input
    * 1.4.2: Idiom, question answered via radio buttons (depending on how many available alternatives)
    * 1.4.3: verb phrase, question answered via free text input
    * 1.4.4: Mixed, questions answered as above for each type
  * 1.5 Finished quiz
    * 1.5.1
  * 1.6 Interface
    * 1.6.0: Customer no strict opinions on interface, 
    * 1.6.1 Color scheme: "sophisticated" (freedom for developer)
    * 1.6.2 Font: sophisticated (freedom for developer)
    * 1.6.3 
    * 1.6.4 
    * 1.6.5 

## 2: Uploading Questions
  * 2.1 Authorized users should be able to create questions
    * 2.1.1 Via a form in UI - logged-in user
    * 2.1.2 Via API calls to the quiz API - with an API key
  * 2.2 Model for questions upon uploading
    * 2.2.1 Verb phrases
    * 2.2.2 Idiomatic expressions
    * 2.2.3 Vocabulary, one word with translation
    * 2.2.4 Gap texts

## 3: Edit questions
  * 3.1 Delete
    * 3.1.1: It should be possible for admin-user (user with expandes persmissions) to delete questions via an admin panel in the interface
  * 3.2 Edit
    * 3.2.1: no priority: It should be possible to edit questions via an admin panel in the interface

## 4: Users
  * 4.1 One should be able to play as a guest or as a logged-in user
  * 4.2 As a logged-in user, one's results should be saved and statistics kept
  * 4.3 An account requires only a username and password (due to students and GDPR)
  * 4.4 As an user with extended permissions, one can add questions

# From developer

## 5: Techniques
  * 5.1 Language: JavaScript
  * 5.2 Backend Framework: Express.js
  * 5.3 Frontend: ejs, vanilla js components
  * 5.4 Database: MongoDB
  * 5.5 Deploy: Docker compose, cscloud

## 6: Testing
  * 6.1 Unit tests
    * 6.1.1
    * 6.1.1
  * 6.2 Manual tests
    * 6.2.1
    * 6.2.1
  * 6.3 POSTMAN tests

<br>

# Workflow & Communication

## Base structure
Work with base structure in main, when the frame is set migrate to branching stratagy when adding new functionality.

## 1: Branching strategy
* 1.1: Make a new branch for every new functionality
  * 1.1.1: Test the new branch
  * 1.1.2: Commit to the branch
  * 1.1.3: Repeat until functionality in place
* 1.2: Test the branch when functionality fully added
* 1.3: Merge branch to main

## 2: Communication strategy
* 2.1: Weekly updates of project status (Wednesday)
* 2.2: Weekly opportunities for feedback (Thursday)
* 2.3: Delivery number one during third week of project, then weekly
* 2.4: Update requirements after customer feedback

## 3: Testing strategy
* 3.1: Test continuously as the project progresses
  * 3.1.1: Manual: mainly front functionality via UI in browser, but also manually in POSTMAN for pure API testing 
  * 3.1.2: POSTMAN: test collection for API and API:auth
  * 3.1.3: Unit tests: mainly for API and API:auth
* 3.1: Go through test specification weekly, adidgn test for new functionality
* 3.2: Offical testing weekly 
* 3.3: Fill in report on each official testing event.

## 4: Testing by customer
* 4.1: Explorative testing of the deployed application
  * 4.1.1: Used in the early stages when the application is only partly functioning 
* 4.2: Later on: provide tst specification for the customer to go through
  * 4.2.1: When the base of all intended functionality is in place
