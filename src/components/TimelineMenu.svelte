<script lang="ts">
	import type { beat } from "@/ts/types";
	import Fa from "svelte-fa";
	import {
		faPlus,
		faMinus,
	} from "@fortawesome/free-solid-svg-icons";

	import {
		beatAmount,
		currentTrack,
		currentBeatIndex,
		playState,
	} from "@/ts/stores";

	import { createEventDispatcher } from "svelte";

	import Button from "./Button.svelte";

	const dispatch = createEventDispatcher();

	function addBeat() {
		const emptyBeat: beat = new Array(
			$currentTrack.subdivisions
		).fill([]);
		$currentTrack.beats = [...$currentTrack.beats, emptyBeat];
		dispatch("beatAdded");
	}

	function removeBeat() {
		$currentTrack.beats = $currentTrack.beats.slice(
			0,
			$beatAmount - 1
		);
	}
</script>

<menu>
	<Button ariaLabel="add beat" action={addBeat}>
		<Fa icon={faPlus} />
	</Button>

	<Button
		ariaLabel="remove beat"
		action={removeBeat}
		disabled={$beatAmount == 0 ||
			($playState == "playing" &&
				$currentBeatIndex == $beatAmount - 1)}
	>
		<Fa icon={faMinus} />
	</Button>
</menu>

<style lang="scss">
	@use "../scss/mixins.scss" as *;
	menu {
		padding: 1rem;
		gap: 1rem;
		@include flex-center(column);
	}
</style>
