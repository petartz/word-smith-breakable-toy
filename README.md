# Wordsmith
Wordmsith is a website for creating dictionaries and organizing words. Create public dictionaries, add words to them, and create tags for your words
for others to see and use.
Create personal dictionaries for easy access to your favorite words.
This is the place to learn new words, share them, and craft them!
Create a memory palace for all the words you know, so you never forget them again.

## About
To access the service visit [WordSmith](https://word-smith-breakabletoy.herokuapp.com/).
</br>
WordSmith was created by Petar Tzonevski as a way for individuals to maintain a firm grasp over their vocabulary, and easily access words which we
might forget in the course of our daily lives. Traditional dictionaries only allow us to search by virtue of word names, synonyms, or definitions.
Wordsmith aims to change that by allowing us to create systems of tags to help us navigate even the most obscure words we know. Special shoutout to
John Koening and the Dictionary of Obscure Sorrows which was the initial inspiration for creating this app. We can all be a WordSmith if we simply begin
to take ownership of our words.

## Technologies 

* Node.js
* Express
* React
* React-select
* Passport
* Generator-Engage
* Dictionary of Obscure Sorrows API
* Quickchart.io

## Set-up
### Requirements for Setup
* Node.js
* Yarn
* Postgres relational database

Setting up this repository is quick and easy if you have yarn and npm installed on your machine.
</br>
1. Input the following command to retrieve the repository from github in your desired folder
```
git clone https://github.com/petartz/word-smith-breakable-toy.git
```
2. Run ```yarn install``` to download all dependencies utilized in the app
3. Run ``` yarn createdb wordSmithApp_development``` to generate a database for the project
4. Change to the server folder with ```cd server``` to operate on the database 
5. Run ``` yarn migrate:latest ``` to set-up the local database on your machine
6. Run ``` yarn db:seed ``` to seed/pre-load the dictionary of Obscure Sorrows and the pre-designated tags for it which come built into the App

Full list of commands.
```
$ git clone https://github.com/petartz/word-smith-breakable-toy.git
$ touch wordsmithApp
$ cd wordsmithApp
$ yarn install
$ createdb wordsmithApp_development
$ cd server
$ yarn migrate:latest
$ yarn db:seed
$ yarn dev
```
## Upcoming Features and Development Process
Currently the application only accomplishes a few of the desired features. It allows users to create new words, to tag them with the pre-seeded tags,
and to create personal dictionaries on their profile. It also alows users to create WordClouds based on words in their personal dictionaries.
However, a big missing piece of the puzzle is that the only publicly available dictionary is the Dictionary Of Obscure Sorrows. Similarly, the only avialable
tags are the ones preseeded by the Admin (Petar Tzonevski).
The upcoming features include
1. Allow users to create new publicly avaialable dictionaries
2. Allow users to generate publicly available tags
3. Allow users to generate personal tags
4. Allow quick-search of dictionaries
5. Hook-up to the Merriam Webster or Oxford Dictionary API to allow users to quickly add existing words
