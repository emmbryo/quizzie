# Testing Quizzie: Frontend 
## Test cases
Description of test cases front: [test cases](./manual%20test%20cases/quizzie-front.md)

## Manual tests front
### Week 3: 2024.04.15

|Test|Sub test|Result|Comment|
|------|------|------|-----|
|1.1: Start view|1.1.1: title|✔️||
||1.1.2: link menu|✔️||
|1.2: Menu links|1.2.1: create quiz|✔️||
||1.2.2: home|✔️||
||1.2.3: login|-|not implemented|
||1.2.4: logout|-|not implemented|
|2.1: Quiz types|2.1.1: vocab|-|not implemented|
||2.1.2: idiom|-|80% implemented|
||2.1.3: verb phrase|-|not implemented|
||2.1.4: mixed|-|not implemented|


### Week 4: 2024.04.19
|Test|Sub test|Result|Comment|
|------|------|------|-----|
|1.1: Start view|1.1.1: title|✔️||
||1.1.2: link menu|✔️||
|1.2: Menu links|1.2.1: create quiz|✔️||
||1.2.2: home|✔️||
||1.2.3: login|-|not implemented|
||1.2.4: logout|-|not implemented|
|2.1: Quiz types|2.1.1: vocab|✔️||
||2.1.2: idiom|✔️||
||2.1.3: verb phrase|✔️||
||2.1.4: mixed|-|not implemented|
|2.2: Quiz game|2.2.1: one qst|✔️||
||2.2.2: answ btn|✔️||
||2.2.3: next btn|✔️||
||2.2.4: next qst|✔️||
||2.2.5: repeat|✔️||
||2.2.6: result|✔️||

## Week 5: 2024.04.26
|Test|Sub test|Result|Comment|
|------|------|------|-----|
|1.1: Start view|1.1.1: title|✔️||
||1.1.2: link menu|✔️||
|1.2: Menu links|1.2.1: create quiz|✔️||
||1.2.2: home|✔️||
||1.2.3: login|✔️|all links in place|
||1.2.4: logout|✔️|all links in place|
|2.1: Quiz types|2.1.1: vocab|✔️||
||2.1.2: idiom|✔️||
||2.1.3: verb phrase|✔️||
||2.1.4: mixed|-|not implemented, removed from UI for now|
|2.2: Quiz game|2.2.1: one qst|✔️||
||2.2.2: answ btn|✔️||
||2.2.3: next btn|✔️||
||2.2.4: next qst|✔️||
||2.2.5: repeat|✔️||
||2.2.6: result|✔️||
|2.3: Answering quiz questions|2.3.1: Idiom answered via click radio button|✔️||
||2.3.2: Vocabulary answered via text input|-|BUG: No capital letters allowed, empty answer allowed|
||2.3.3: Verb phrase answered via text input|-|BUG: No capital letters allowed, empty answer allowed|
|3.1: Add questions one by one via form|3.1.1: Choose type|✔️||
||3.1.2: Idiom specific form|✔️||
||3.1.3: Verb phrase form|✔️||
||3.1.4: Vocab form|✔️||
||3.1.5: No input field can be left blank|✔️||
||3.1.6: Success message|✔️||
||3.1.7: Redirect to upload menu|✔️||
|3.2: Add questions via file upload||-|not implemented!|
|4.1: Register user|4.1.1: Username and password required|✔️|??? possible BUG: å,ä and ö not allowed in username.|
||4.1.2: Password must be 10 characters|✔️||
||4.1.3: Success message|✔️||
||4.1.4: Error message if duplicated username|✔️||
||4.1.5: On success: redirect to login|✔️||
|4.2: Login user|4.2.1: Username and password required|✔️||
||4.2.2: Error message on wrong credentials|✔️||
||4.2.3: On success. redirected to create quiz meny|✔️||
||4.2.4: The username should be visible under quizzie title|✔️||
||4.2.5: A logout button should appear in menu, to the right|✔️||
|4.3: Logout user|4.3.1: Username under the title disappears|✔️||
||4.3.2: logout button --> login button|✔️||
|5.1: Admin user|5.1.1: Admin username and password required|✔️||
||5.1.2: Error message on wrong credentials|✔️||
||5.1.3: On success. redirected to create quiz meny|✔️||
||5.1.4: The username should be visible under quizzie title|✔️||
||5.1.5: A logout button should appear in menu, to the right|✔️||
||5.1.6: An upload questions button should appear in menu, in the middle|✔️||

## Week 6: 2024.05.03
|Test|Sub test(s)|Result|Comment|
|------|------|------|-----|
|1.1: Start view|1.1.1 - 1.1.2|✔️|whole set OK|
|1.2: Menu links|1.2.1 - 1.2.4|✔️|whole set OK|
|2.1: Quiz types|2.1.1 - 2.1.3|✔️||
||2.1.4: mixed|✔️|back in UI --> and implemented|
|2.2: Quiz game|2.2.1 - 2.2.6|✔️|whole set OK|
|2.3: Answering quiz questions|2.3.1: Idiom answered via click radio button|✔️||
||2.3.2: Vocabulary answered via text input|✔️|BUG: fixed|
||2.3.3: Verb phrase answered via text input|✔️|BUG: fixed|
|3.1: Add questions one by one via form|3.1.1 - 3.1.7|✔️|whole set OK|
|3.2: Add questions via file upload|3.2.1: link to open file handler on user machine|✔️||
||3.2.2: Examples of input|✔️||
||3.2.3: On success: success message|✔️||
||3.2.4: On failure: failure message|-|BUG: app crashes|
||3.2.5: Redirected back to upload question menu|✔️||
|4.1: Register user|4.1.1 - 4.1.5|✔️|whole set OK|
|4.2: Login user|4.2.1 - 4.2.5|✔️|whole set OK|
|4.3: Logout user|4.3.1 - 4.3.2|✔️|whole set OK|
|5.1: Admin user|5.1.1 - 5.1.6|✔️|whole previous set OK|
||5.1.7: An edit button should appear in the menu|✔️||
|6.1: Edit questions|6.1.1: Edit button leads to page with all questions|✔️||
|6.2: Delete question|6.2.1: Each qustion has a delete button |✔️||
||6.2.2: A press on the delete btn deletes question|✔️||
||6.2.3: Success: success message|✔️||
||6.2.4: Failure: failure message|-|TODO: simulate failure|
||6.2.5: Redirect back to edit questions menu|✔️||
|6.3: Edit question|6.3.1: Each question has an edit button|-|Not implemented|
||6.3.2: Press edit --> form with question params pre-filled|-|Not implemented|
||6.3.3: Submit btn, edit sent to server|-|Not implemented|
||6.3.4: On success: success message|-|Not implemented|
||6.3.5: On failure: failure message|-|Not implemented|
||6.3.6: Redirected to edit menu|-|Not implemented|


