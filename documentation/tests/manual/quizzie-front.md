# Manual testing frontend

## 1. Start page

### 1.1 Start view
Navigate to start page, it should display:
* 1.1.1 QUIZZIE name
* 1.1.2 Menu with: Home, create quiz, login, logut

### 1.2 Menu links
* 1.2.1 Create quiz leads to a new page with a form to create a quiz
* 1.2.2 Home leads back to the start page
* 1.2.3 Login leads to a login page
* 1.2.4 Logout logs the user out and navigates the user to the start page

## 2. Quiz page
For each of the types, create a quiz with 1-50 questions: A quiz of right type and number should be displayed.
### 2.1 Types
* 2.1.1 Create Vocabulary quiz: One word, one input field
* 2.1.2 Create Idioms quiz: One expression, three alternatives
* 2.1.3 Create verb phrases quiz: Question with preopsition missing, answer input field
* 2.1.4 Create mixed quiz: A mix of different question types. Displayed as above.
### 2.2 The quiz game
* 2.2.1 Only one question visible at a time
* 2.2.2 Answer button: gives correct/incorrect
* 2.2.3 Next button for next question
* 2.2.4 Next question visible
* 2.2.5 Repeat 2.2.2 - 2.2.4 until no more questions in current game
* 2.2.6 result is displayed