<script lang="ts">
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
		currentTrack,
		currentTime,
		dialogState,
		currentBeatIndex,
		showSettings,
		beatAmount,
	} from "@/ts/stores";

	import Button from "@/components/Button.svelte";
	import { convertTrackToParams } from "@/ts/trackConverter";

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
		$currentTrack.beats = [];
		$currentTime = 0;
		$currentBeatIndex = 0;
		$playState = "stopped";
	}

	async function shareTrack() {
		const params = convertTrackToParams($currentTrack);
		const sharingURL = window.location.origin + "?" + params;
		await navigator.clipboard.writeText(sharingURL);
		$dialogState = {
			open: true,
			type: "alert",
			contents: [
				"Copied sharing URL to clipboard!",
				`<code>${sharingURL.replace(/&/g, "&amp;")}</code>`,
			],
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
		disabled={$playState == "playing" || $beatAmount == 0}
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
		disabled={$playState == "playing" || $beatAmount == 0}
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

	<Button
		ariaLabel="share"
		action={shareTrack}
		disabled={$beatAmount == 0}
	>
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
