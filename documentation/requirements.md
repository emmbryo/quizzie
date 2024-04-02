# Krav quizzie app

En quiz app att användas i undervisningen av engelska på gymnasiet. Tanken är att skapa skräddarsydda avsnitt med frågor gällande engelsk vokabulär samt fasta förbindningar och grammatik.

## 1: Quizzen
  * 1.1 Ett quiz med valbart antal frågor (ur en begränsad fråge-pool)
  * 1.2 Ett quiz med valbara kategorier, inklusive en mixad
  * 1.3 Feedback efter varje besvarad fråga
  * 1.4 Frågan besvaras med fritext, ej genom alternativ
  * 1.5 
  * 1.x Gränssnitt
    * 1.x.1 Färgskala: finessigt
    * 1.x.2 Typsnitt: finessigt
    * 1.x.3 
    * 1.x.4 
    * 1.x.5 

## 2: Ladda upp frågor
  * 2.1 Auktoriserad användare ska kunna skapa frågor
    * 2.1.1 Via ett formulär i UI - inloggad användare
    * 2.1.2 Via API anrop till quizzie API:et - med API nyckel
  * 2.2 Modell för frågor vid uppladdning
    * 2.2.1 Verbfraser
    * 2.2.2 Idiomatiska uttryck
    * 2.2.3 Vokabulär, ett ord med översättning
    * 2.2.4 Luck-texter

## 3: Användare
  * 3.1 man ska kunna spela som gäst eller som inloggad användare
  * 3.2 som inloggad ska ens resultat sparas och statistik föras
  * 3.3 Ett konto kräver enbart användarnamn och lösen
  * 3.4 Som användare med utökad behörighet kan man lägga till frågor

## 4: Tekiniker, krav från utvecklaren
  * 4.1 Språk: JavaScript
  * 4.2 Ramverk backend: Express.js
  * 4.3 Frontend: vanilla? Alt react
  * 4.4 Databas: MongoDB
