# startup - mypeoplenotes.com

## Elevator Pitch
You remember someone, but you can't quite get their name? Or they told you something big last time you saw, but you can't quite remember what it was? Or you just want to know something more basic like who they know that you know? Back in the day, we used to use Rolodexes to sort all of our info. Now we use the Contacts app. But it is not quite the same. **mypeoplenotes.com** is a modern Rolodex allowing for easy keeping of notes and info of people that you know, but don't see all that often.

## Design

### Login Page
![login page](/Login%20Page.png)

### Main Page
![main and only page](/Basic%20Website%20Outline.png)

## Key Features
* Secure login through HTTPS
* Ability to search for people
* List of all people on the left side of the page
* Center page allowing for notes about people
* A total count of all of the people using the website
* Ability to add and subtract notes
* People are permanently stored
* You can add or delete people

## Technologies
* **HTML** - Uses correct HTML structure for application. Two HTML pages. One for login and one for viewing notes on people. Hyperlinks to choice artifact.

* **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.

* **JavaScript** - Provides login, choice display, applying votes, display other users votes, backend endpoint calls.

* **Service** - Backend service with endpoints for:
    - login
    - retrieving notes
    - adding notes

* **DB/Login** - Store users and their notes on people in the database. Register and login users. Credentials securely stored in database.

* **Websocket** - While logged in, users can see the total amount of people using the website.

* **React** - Application ported to use the React web framework.

## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML Pages** - Two HTML pages. One has the login and the other one has all of the people notes.
- **Links** - The login page automatically links to the people notes page (with login). The notes page has no links.
- **Text** - There is text indicating the person's name, notes and the list of people on the lhs of the page.
- **Images** - I put in a picture for each person that I add to the notes.
- **DB/Login** - Username and password to login. The people notes will be stored in a database.
- **WebSocket** - The total number of users on the site at one point in time.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body**
- **Navigation elements** - Pretty simple navigation. It is just a two page site and the login links to the notes page.
- **Responsive to window resizing** - My app looks good in all window sizes. I used @media to get rid of the list of people and the footer if it is on a smartphone.
- **Application elements** - I tried to use good coloring and whitespace so it looks nice and clean.
- **Application text content** - I put in the bootstrap CSS, so there are consistent fonts throughout it.
- **Application images** - Just style my image as a circle like I would find it in a contacts app.