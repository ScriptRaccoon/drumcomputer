# Drum Computer

> https://drumcomputer.netlify.app/

This is a drum computer in the browser. It is supposed to be accessible to anyone, even without any knowledge about music.

![Screenshot of the app](screenshot-drumcomputer.jpg)

Each row in the timeline represents an instrument (like bass drum, snare, etc.) within a drumset. You can simply add or remove notes by clicking on the respective buttons in the timeline. The playback function gives you immediate feedback how the beat sound like. For reasons of a11y, keyboard navigation is fully supported.

For simplicity, the timeline is not separated into bars. It is just a sequence of times. Incidentally, this also makes it easier to play around with odd time signatures. You can add or remove times as you like. There is no _bpm_ unit, but rather a _note duration_ indicator which is more easy to understand (for non-musicians). The number of times and the note duration can be adjusted in the menu.

In the menu there is also a share function which lets you share your composed beat with others via a link. When this link is opened, it loads the beat saved in the URL parameters. Thus, the sharing function does not require any database (and saves resources and code).

Here is a simple example: https://drumcomputer.netlify.app?noteDuration=108&notes=B-H-OB-H-S-H-HD-

You can find more beats here: [BEATS.md](./BEATS.md)

On startup, you will always see an example beat (which can then be edited). But you can just save your favorite beats as bookmarks in your browser, using the sharing function described above.

As for the code, this is a single page application made with Svelte and TypeScript. The list of instruments can easily by adjusted.

Of course, the app can also be opened and used on mobile. However, some mobile browsers do not play the sounds in a regular way. Maybe I can fix this issue in the future. You will also face some issues when the beat is very fast.

The sound effects come from https://www.fesliyanstudios.com/ and were only slightly edited.
