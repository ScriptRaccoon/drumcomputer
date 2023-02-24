# Drum Computer

> https://drumcomputer.netlify.app/

This is a drum computer in the browser. It is supposed to be accessible to anyone, even without any knowledge about music.

![Screenshot of the timeline](screenshot-drumcomputer.jpg)

## Features

Each row in the timeline represents an instrument (like bass drum, snare, etc.) within a drumset. You can simply add or remove notes by clicking on the respective buttons in the timeline. The playback function in the menu gives you immediate feedback how the track sounds like. Keyboard navigation is fully supported.

The timeline is divided into beats. Their number can be adjusted via the buttons to the right of the timeline. By default, the number of subdivisions per beat is 4. This number can be adjusted in the settings page. There you can also toggle timeline scrolling and adjust the speed in bpm (beats per minute).

![Screenshot of the settings](screenshot-settings.jpg)

On startup, the app always loads an example track, which can then be edited.

You can also share your track with others via a link. When this link is opened, it loads the track saved in the URL parameters. Thus, the sharing function does not require any database. You can find some examples here: [tracks.md](./tracks.md). You can save your favorite tracks as bookmarks in the browser.

## Limitations

The app can also be opened and used on mobile devices. However, some mobile browsers do not play the notes in a regular way. Maybe I can fix this issue in the future. You will also face some issues when the speed is set very high, but this can be remedied by using a higher default channel number in the `AudioPlayer` class.

## Stack

This is a single page application made with [Svelte](https://svelte.dev) and [TypeScript](https://www.typescriptlang.org).

## Credits

The sound effects come from https://www.fesliyanstudios.com/ and were only slightly edited.
