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
### 2.3 Answering quiz questions
* 2.3.1 Idiom answered via click radio button
* 2.3.2 Vocabulary answered via text input
* 2.3.3 Verb phrase answered via text input

## 3. Add questions
### 3.1: Add questions one by one via UI
* 3.1.1 Choose question type
* 3.1.2 idiom specific form
* 3.1.3 verb phrase specific form
* 3.1.4 vocab specific form
* 3.1.5 No input field can be left blank 
* 3.1.6 Success message chown on submit
* 3.1.7 Redirected back to upload question menu
### 3.2: Upload question file via UI

## 4. User
### 4.1: Register
* 4.1.1 Username and password required
* 4.1.2 Password must be 10 characters
* 4.1.3 Success message
* 4.1.4 Error message if duplicated username
* 4.1.5 On success: redirect to login
### 4.2: Login
* 4.2.1 Username and password required
* 4.2.2 Error message on wrong credentials
* 4.2.3 On success. redirected to create quiz meny
* 4.2.4 The username should be visible under quizzie title
* 4.2.5 A logout button should appear in menu, to the right
### 4.3: Logout
* 4.3.1 Username under the title disappears
* 4.4.2 logout button --> login button

## 5. Admin user
### 5.1: Login ad admin
* 5.1.1 Admin username and password required
* 5.1.2 Error message on wrong credentials
* 5.1.3 On success. redirected to create quiz meny
* 5.1.4 The username should be visible under quizzie title
* 5.1.5 A logout button should appear in menu, to the right
* 5.1.6 An upload questions button should appear in menu, in the middle