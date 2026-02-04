# 🎼 TuneChart

[My Notes](notes.md)

In short what I plan to create is letterboxd but for music. I want a place where you can rank songs and it will have a leaderboard for the week based on peoples ranking.


## 💿 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Do you ever feel stuck when you are listening to music? Do you ever want to freshen up your music taste by exploring your friends reccommendations? Or do you feel the oppisite and find certain songs so amazing that you want to share them with your friends? Well I decided to create a website to rank and discover music. When you find a song new song, you can hop on my website and rate the song. Weekly charts will keep you up to date with a community of music listeners reccomendations.

### Design

![Design image](sketch.png)


### Key features

- Allow user to rank a song
- Compile and update weekly chart based on users rankings

> [!NOTE]
> I feel there are many more features I could add but this is what I want to start with seeing as I am not very familiar with html or css

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - I will use html to structure my startup. It will layout all of the information that I want to display with relevant headers, links, and/or tables.
- **CSS** - CSS will allow me to deliver this information in a pretty and readable way. This is where the style will come from.
- **React** - This is how the user will interact with my page, to rank and search for songs.
- **Service** - Service will be how I store all of the rankings and charts. 
- **DB/Login** - A database will store user accounts and rankings. Login lets users access their account and their rankings.
- **WebSocket** - Using WebSocket will bring the site to life. It will allow for realtime updates to the weekly chart and will send notifications when new rankings are posted.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).
It was difficult to figure out at first but I eventually figures it out. There is more information in my notes.md

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I completed this part of the deliverable.
      I created separate HTML pages for each major component of my application, including a home page, a song ranking page, a profile page, a weekly chart page, and an about page. Each page represents a different part of the user experience and navigation flow of the site.
- [x] **Proper HTML element usage** - I completed this part of the deliverable.
      I had to learn a couple of new tags to use. I included tags for links, images, input, tables, and more.
- [x] **Links** - I completed this part of the deliverable.
      I connected all of my pages using anchor (<a>) tags. The navigation menu links to each major page of the application, allowing users to move between the home page, ranking page, profile page, weekly chart, and about page.
- [x] **Text** - I completed this part of the deliverable.
      This is most evident in my about page. I included meaningful textual content, such as headings, labels, and table headers which helps explain the purpose of each page and provides context interaction.
- [x] **3rd party API placeholder** - I completed this part of the deliverable.
      I added placeholders in my HTML where third-party API data will eventually be displayed. This data is central to my startup because I will need to connect to an external music API to get all of my song data, such album cover, title, artist and maybe even a short clip.
- [x] **Images** - I completed this part of the deliverable.
      I added a place holder which will eventually change to display the album cover of specific songs
- [x] **Login placeholder** - I completed this part of the deliverable.
      On my home page there is a login placeholder.
- [x] **DB data placeholder** - I completed this part of the deliverable.
      On the charts page there is a placeholder for the weekly chart data.
- [x] **WebSocket placeholder** - I completed this part of the deliverable.
      I added a placeholder notification on the Weekly Chart Page which will notify when someone ranks a new song.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
      I used :root to store the variables for my color palatte. I padding and centering for the layout.
- [x] **Use of a CSS framework** - I did not complete this part of the deliverable.
      I used bootstrap for alot of styling.
- [x] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
      Everything everywhere on the site is styled using css, from header to footer.
- [x] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
      I used flex and grid elements to acheive this. I also put in a hamburger nav bar which took a long time.
- [x] **Use of a imported font** - I did not complete this part of the deliverable.
      I imported a google font and made sure it was used everywhere. I even played around with width.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.
      I mostly used class and pseudo selectors but I added on ID delector on my searh form in rank.css just so I knew how to do it.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
