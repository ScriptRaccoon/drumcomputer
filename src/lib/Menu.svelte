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
	} from "@fortawesome/free-solid-svg-icons";
	import {
		playState,
		currentBeat,
		currentTime,
		makeConfirm,
	} from "@/ts/stores";
	import Button from "./Button.svelte";

	function addTime() {
		$currentBeat.notes = [...$currentBeat.notes, []];
	}

	function removeTime() {
		const l = $currentBeat.notes.length;
		$currentBeat.notes = $currentBeat.notes.slice(0, l - 1);
	}

	function deleteBeat() {
		makeConfirm(
			"This will delete the current beat. Are you sure?",
			() => {
				const previousNoteDuration =
					$currentBeat.noteDuration;
				$currentBeat = {
					noteDuration: previousNoteDuration,
					notes: [],
				};
				$currentTime = 0;
				$playState = "stopped";
			}
		);
	}
</script>

<menu>
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

	<Button
		name="add time"
		action={addTime}
		disabled={$playState == "playing"}
	>
		<Fa icon={faPlus} />
	</Button>

	<Button
		name="remove time"
		action={removeTime}
		disabled={$playState == "playing"}
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
</menu>

<style lang="scss">
	@use "../scss/mixins" as *;

	menu {
		@include flex-center();
		padding-block: 20px;
		gap: 10px;
	}
</style>
