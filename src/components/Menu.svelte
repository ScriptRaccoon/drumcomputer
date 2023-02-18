<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	import Fa from "svelte-fa";
	import {
		faPlay,
		faStop,
		faPause,
		faTrashAlt,
		faShareNodes,
		faGear,
	} from "@fortawesome/free-solid-svg-icons";
	import {
		playState,
		currentBeat,
		currentTime,
		dialogState,
		currentBlockIndex,
		showSettings,
	} from "@/ts/stores";

	import Button from "@/components/Button.svelte";
	import { convertBeatToParams } from "@/ts/beatConverter";

	export let startMusic: () => void;
	export let stopMusic: () => void;
	export let pauseMusic: () => void;

	function confirmToDeleteNotes() {
		$dialogState = {
			open: true,
			type: "confirm",
			contents: ["This will delete all notes. Are you sure?"],
			action: deleteNotes,
		};
	}

	function deleteNotes() {
		$currentBeat.blocks = [];
		$currentTime = 0;
		$currentBlockIndex = 0;
		$playState = "stopped";
	}

	async function shareBeat() {
		// const isEmpty = $currentBeat.notes.every(
		// 	(time) => time.length == 0
		// );
		// if (isEmpty) {
		// 	showEmptyError();
		// 	return;
		// }
		// const sharingURL =
		// 	window.location.origin +
		// 	convertBeatToParams($currentBeat);
		// await navigator.clipboard.writeText(sharingURL);
		// $dialogState = {
		// 	open: true,
		// 	type: "alert",
		// 	contents: [
		// 		"Copied sharing URL to clipboard!",
		// 		`<code>${sharingURL.replace(/&/g, "&amp;")}</code>`,
		// 	],
		// };
	}

	function showEmptyError() {
		$dialogState = {
			open: true,
			type: "alert",
			contents: ["You need to add some notes first."],
		};
	}

	function switchToSettings() {
		stopMusic();
		$showSettings = true;
	}
</script>

<menu>
	<Button
		ariaLabel="play"
		disabled={$playState == "playing" ||
			$currentBeat.blocks.length == 0}
		action={startMusic}
	>
		<Fa icon={faPlay} />
	</Button>

	<Button
		ariaLabel="pause"
		disabled={$playState !== "playing"}
		action={pauseMusic}
	>
		<Fa icon={faPause} />
	</Button>

	<Button
		ariaLabel="stop"
		disabled={$playState == "stopped"}
		action={stopMusic}
	>
		<Fa icon={faStop} />
	</Button>

	<Button
		ariaLabel="delete notes"
		disabled={$playState == "playing"}
		action={confirmToDeleteNotes}
	>
		<Fa icon={faTrashAlt} />
	</Button>

	<Button
		ariaLabel="open settings"
		action={switchToSettings}
		disabled={$playState == "playing"}
	>
		<Fa icon={faGear} />
	</Button>

	<Button ariaLabel="share" action={shareBeat}>
		<Fa icon={faShareNodes} /></Button
	>
</menu>

<style lang="scss">
	@use "../scss/mixins" as *;

	menu {
		padding-block: 0.5rem;
		@include flex-center();
		gap: 0.5rem;
	}
</style>
