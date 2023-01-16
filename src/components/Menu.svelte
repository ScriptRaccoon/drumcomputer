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
	} from "@fortawesome/free-solid-svg-icons";
	import {
		playState,
		currentBeat,
		currentTime,
		makeConfirm,
		durationError,
		makeAlert,
	} from "@/ts/stores";
	import Button from "./Button.svelte";
	import { convertBeatToString } from "@/ts/beatConverter";

	function addTime() {
		$currentBeat.notes = [...$currentBeat.notes, []];
	}

	function removeTime() {
		const l = $currentBeat.notes.length;
		$currentBeat.notes = $currentBeat.notes.slice(0, l - 1);
	}

	function deleteBeat() {
		makeConfirm(
			"This will delete all notes. Are you sure?",
			() => {
				$currentBeat.notes = [];
				$currentTime = 0;
				$playState = "stopped";
			}
		);
	}

	function validateBeat() {
		if ($currentBeat.name.length == 0) {
			makeAlert("You need to specifiy a name first.");
			return false;
		}
		if ($currentBeat.notes.every((time) => time.length == 0)) {
			makeAlert("You need to add some notes first.");
			return false;
		}
		if ($durationError) {
			makeAlert(
				"The note duration must be a positive integer."
			);
			return false;
		}
		return true;
	}

	async function shareBeat() {
		if (validateBeat()) {
			const sharingURL =
				window.location.origin +
				convertBeatToString($currentBeat);
			console.log(sharingURL);
			await navigator.clipboard.writeText(sharingURL);
			makeAlert("Copied sharing URL to clipboard!", sharingURL);
		}
	}
</script>

<menu>
	<Button
		name="play"
		disabled={$playState == "playing" ||
			$currentBeat.notes.length == 0 ||
			$durationError}
		action={() => dispatch("play")}
	>
		<Fa icon={faPlay} />
	</Button>

	<Button
		name="pause"
		disabled={$playState !== "playing" || $durationError}
		action={() => dispatch("pause")}
	>
		<Fa icon={faPause} />
	</Button>

	<Button
		name="stop"
		disabled={$playState == "stopped" || $durationError}
		action={() => dispatch("stop")}
	>
		<Fa icon={faStop} />
	</Button>

	<Button name="add time" action={addTime}>
		<Fa icon={faPlus} />
	</Button>

	<Button
		name="remove time"
		action={removeTime}
		disabled={$playState == "playing" &&
			$currentTime == $currentBeat.notes.length - 1}
	>
		<Fa icon={faMinus} />
	</Button>

	<Button
		name="delete beat"
		disabled={$playState == "playing"}
		action={deleteBeat}
	>
		<Fa icon={faTrashAlt} />
	</Button>

	<Button name="share" action={shareBeat}>
		<Fa icon={faShareNodes} /></Button
	>
</menu>

<style lang="scss">
	@use "../scss/mixins" as *;

	menu {
		@include flex-center();
		padding-block: 20px;
		gap: 10px;
	}
</style>
