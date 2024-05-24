# Manual testing frontend - requirements

## 1. Start page

### 1.1 Start view
Navigate to start page, it should display:
* 1.1.1: QUIZZIE name
* 1.1.2: Adapted meny should be visible in all viewa
* 1.1.3: Menu with: Home
* 1.1.4: Menu with: create quiz
* 1.1.5: menu with: login
* 1.1.6: Menu with logut, for logged in users only
* 1.1.7: Menu with: edit, for admin users only
* 1.1.8: Menu with: upload, for admin users only


### 1.2 Menu links
* 1.2.1 Create quiz leads to a new page with a form to create a quiz
* 1.2.2 Home leads back to the start page
* 1.2.3 Login leads to a login page


## 2. Quiz page
### 2.0: Create a quiz
* 2.0.1: A create quiz form should be visible
* 2.0.2: The types idiom, vocabulary, verbphrase and mixed should be options
* 2.0.3: A number of 1-50 questions can be chosen
### 2.1 Types
* 2.1.1 Create Vocabulary quiz: One word, one input field
* 2.1.2 Create Idioms quiz: One expression, three alternatives
* 2.1.3 Create verb phrases quiz: Question with preopsition missing, answer input field
* 2.1.4 Create mixed quiz: A mix of different question types. Displayed as above.
* 2.1.5 The mixed option is pre-filled
### 2.2 The quiz game
* 2.2.1 Only one question visible at a time
* 2.2.2 Answer button: gives correct/incorrect
* 2.2.3 Next button for next question
* 2.2.4 Next question visible
* 2.2.5 Repeat 2.2.2 - 2.2.4 until no more questions in current game
* 2.2.6 result is displayed
* 2.2.7 Every question is numbered according to 1/10, 5/10
* 2.2.8 All questions and answers presented to user after finished quiz
### 2.3 Answering quiz questions
* 2.3.1 Idiom answered via click radio button
* 2.3.2 Vocabulary answered via text input
* 2.3.3 Verb phrase answered via text input
* 2.3.4: No blank answers allowed

## 3. Add questions
### 3.1: Add questions one by one via UI
* 3.1.1 Choose question type
* 3.1.2 idiom specific form
* 3.1.3 verb phrase specific form
* 3.1.4 vocab specific form
* 3.1.5 No input field can be left blank 
* 3.1.6 Success message shown on submit
* 3.1.7 Redirected back to upload question menu
### 3.2: Upload question file via UI
* 3.2.1 Link to open file handler on user machine
* 3.2.2 Examples of required input should be availabe
* 3.2.3 Success message shown on submit
* 3.2.4 Failure message shown on failure
* 3.2.5 Redirected back to upload question menu 
### 3.3: UI during upload
* 3.3.1: When changing from upload via file to upload via form or vise versa; the UI should adapt and remove traces from the other

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
### 5.1: Login as admin
* 5.1.0 Admin users can only be registered via API call with API key
* 5.1.1 Admin username and password required
* 5.1.2 Error message on wrong credentials
* 5.1.3 On success. redirected to create quiz meny
* 5.1.4 The username should be visible under quizzie title
* 5.1.5 A logout button should appear in menu, to the right
* 5.1.6 An upload questions button should appear in menu, in the middle
* 5.1.7 An edit button should appear in the menu

## 6. Edit questions - only for admin user
### 6.1: Menu link: Edit questions
* 6.1.1 Edit button leads to page with all questions displayed
* 6.1.2 Search funnctionality for finding questions
### 6.2: Delete question
* 6.2.1: Each question should have a delete button
* 6.2.2: When pressed, the question is deleted
* 6.2.3: Success message on delete
* 6.2.4: Failure message on delte failure
* 6.2.5: Redirected back to edit questions menu
### 6.3: Edit question
* 6.3.1 Each question should have an edit button
* 6.3.2 Each question should have a pre-filled form that the user can edit.
* 6.3.3 On submit, the edit is sent to server
* 6.3.4: Success message
* 6.3.5: Failure message
* 6.3.6: Redirected to edit menu

## 7. Quiz management
### 7.1 Create quiz
* 7.1.1:
* 7.1.2:
* 7.1.3:
### 7.2 Save quiz
* 7.2.1:
* 7.2.2:
* 7.2.3:
### 7.3 Save quiz results
* 7.3.1:
* 7.3.2:
* 7.3.3: