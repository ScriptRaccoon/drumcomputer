<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	import Fa from "svelte-fa";
	import {
		faPlay,
		faStop,
		faPlus,
		faPause,
		faTrashAlt,
		faMinus,
		faShareNodes,
		faGaugeSimpleHigh,
	} from "@fortawesome/free-solid-svg-icons";
	import {
		playState,
		currentBeat,
		currentTime,
		dialogState,
		instrumentsLoaded,
	} from "@/ts/stores";

	import Button from "@/components/Button.svelte";
	import { convertBeatToParams } from "@/ts/beatConverter";

	function addTime() {
		$currentBeat.notes = [...$currentBeat.notes, []];
	}

	function removeTime() {
		const length = $currentBeat.notes.length;
		$currentBeat.notes = $currentBeat.notes.slice(0, length - 1);
	}

	function confirmToDeleteNotes() {
		$dialogState = {
			open: true,
			type: "confirm",
			contents: ["This will delete all notes. Are you sure?"],
			action: deleteNotes,
		};
	}

	function deleteNotes() {
		$currentBeat.notes = [];
		$currentTime = 0;
		$playState = "stopped";
	}

	async function shareBeat() {
		const isEmpty = $currentBeat.notes.every(
			(time) => time.length == 0
		);
		if (isEmpty) {
			showEmptyError();
			return;
		}

		const sharingURL =
			window.location.origin +
			convertBeatToParams($currentBeat);

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

	function showEmptyError() {
		$dialogState = {
			open: true,
			type: "alert",
			contents: ["You need to add some notes first."],
		};
	}

	function decreaseSpeed() {
		$currentBeat.noteDuration += 1;
	}

	function increaseSpeed() {
		$currentBeat.noteDuration = Math.max(
			0,
			$currentBeat.noteDuration - 1
		);
	}
</script>

<menu>
	<div>
		<Button
			ariaLabel="play"
			disabled={$playState == "playing" ||
				$currentBeat.notes.length == 0 ||
				!$instrumentsLoaded}
			action={() => dispatch("play")}
		>
			<Fa icon={faPlay} />
		</Button>

		<Button
			ariaLabel="pause"
			disabled={$playState !== "playing"}
			action={() => dispatch("pause")}
		>
			<Fa icon={faPause} />
		</Button>

		<Button
			ariaLabel="stop"
			disabled={$playState == "stopped"}
			action={() => dispatch("stop")}
		>
			<Fa icon={faStop} />
		</Button>

		<Button ariaLabel="slower" action={decreaseSpeed}>
			<Fa icon={faGaugeSimpleHigh} flip="horizontal" />
		</Button>

		<Button
			ariaLabel="faster"
			action={increaseSpeed}
			disabled={$currentBeat.noteDuration <= 0}
		>
			<Fa icon={faGaugeSimpleHigh} />
		</Button>
	</div>

	<div>
		<Button ariaLabel="add time" action={addTime}>
			<Fa icon={faPlus} />
		</Button>

		<Button
			ariaLabel="remove time"
			action={removeTime}
			disabled={$playState == "playing" &&
				$currentTime == $currentBeat.notes.length - 1}
		>
			<Fa icon={faMinus} />
		</Button>

		<Button
			ariaLabel="delete notes"
			disabled={$playState == "playing"}
			action={confirmToDeleteNotes}
		>
			<Fa icon={faTrashAlt} />
		</Button>

		<Button ariaLabel="share" action={shareBeat}>
			<Fa icon={faShareNodes} /></Button
		>
	</div>
</menu>

<style lang="scss">
	@use "../scss/mixins" as *;

	menu {
		padding-block: 1rem;
		@include flex-center();
		gap: 0.6rem;
		> div {
			@include flex-center();
			gap: 0.6rem;
		}
	}
</style>
