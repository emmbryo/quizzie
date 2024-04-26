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


