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
		faForward,
		faBackward,
	} from "@fortawesome/free-solid-svg-icons";
	import {
		playState,
		currentBeat,
		currentTime,
		makeConfirm,
		makeAlert,
	} from "@/ts/stores";
	import Button from "@/components/ui/Button.svelte";
	import { convertBeatToString } from "@/ts/beatConverter";

	function addTime() {
		$currentBeat.notes = [...$currentBeat.notes, []];
	}

	function removeTime() {
		const l = $currentBeat.notes.length;
		$currentBeat.notes = $currentBeat.notes.slice(0, l - 1);
	}

	function deleteNotes() {
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
		if ($currentBeat.notes.every((time) => time.length == 0)) {
			makeAlert("You need to add some notes first.");
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

	function decreaseSpeed() {
		$currentBeat.noteDuration += 5;
	}

	function increaseSpeed() {
		$currentBeat.noteDuration = Math.max(
			0,
			$currentBeat.noteDuration - 5
		);
	}
</script>

<menu>
	<div>
		<Button
			name="play"
			disabled={$playState == "playing" ||
				$currentBeat.notes.length == 0}
			action={() => dispatch("play")}
		>
			<Fa icon={faPlay} />
		</Button>

		<Button
			name="pause"
			disabled={$playState !== "playing"}
			action={() => dispatch("pause")}
		>
			<Fa icon={faPause} />
		</Button>

		<Button
			name="stop"
			disabled={$playState == "stopped"}
			action={() => dispatch("stop")}
		>
			<Fa icon={faStop} />
		</Button>

		<Button name="slower" action={decreaseSpeed}>
			<Fa icon={faBackward} />
		</Button>

		<Button
			name="faster"
			action={increaseSpeed}
			disabled={$currentBeat.noteDuration <= 0}
		>
			<Fa icon={faForward} />
		</Button>
	</div>

	<div>
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
			name="delete notes"
			disabled={$playState == "playing"}
			action={deleteNotes}
		>
			<Fa icon={faTrashAlt} />
		</Button>

		<Button name="share" action={shareBeat}>
			<Fa icon={faShareNodes} /></Button
		>
	</div>
</menu>

<style lang="scss">
	@use "../scss/mixins" as *;

	menu {
		padding-block: 20px;
		@include flex-center();
		gap: 10px;
		> div {
			@include flex-center();
			gap: 10px;
		}
	}
</style>
