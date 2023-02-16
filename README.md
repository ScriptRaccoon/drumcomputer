# Drum computer

Try it out here: https://drumcomputer.netlify.app/

This is a drum computer in the browser. It is supposed to be accessible to anyone, even without any knowledge about music.

![Screenshot](screenshot-drumcomputer.jpg)

Each row in the timeline represents an instrument (like bass drum, snare, etc.) within a drumset. You can simply add or remove notes by clicking on the respective buttons in the timeline. The playback function gives you immediate feedback how the beat sound like.

For simplicity, the timeline is not separated into bars. It is just a sequence of times. Incidentally, this also makes it easier to play around with odd time signatures. There is no _bpm_ unit, but rather a _note duration_ indicator which is more easy to understand (for non-musicians).

In the menu there is also a share function which lets you share your composed beat with others via a link. When this link is opened, it loads the beat saved in the URL parameters. Thus, the sharing function does not require any database (and saves resources and code).

When you start the website, you will always see an example beat (which can then be edited). But you can just save your favorite beats as bookmarks in your browser, using the sharing function described above.

For reasons of a11y keyboard navigation is fully supported.As for the code, this is a single page application made with Svelte and TypeScript. I tried to follow the rules of clean code. In particular, the list of instruments can easily by adjusted.

Of course, the website can also be opened and used on mobile. However, some mobile browsers do not play the sounds in a regular way. Maybe I can fix this issue in the future.

The sound effects come from https://www.fesliyanstudios.com/ and were only slightly edited.
