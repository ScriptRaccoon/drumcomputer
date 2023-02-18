<script lang="ts">
	import type { block } from "@/ts/types";
	import Fa from "svelte-fa";
	import {
		faPlus,
		faMinus,
	} from "@fortawesome/free-solid-svg-icons";

	import {
		currentBeat,
		currentBlockIndex,
		playState,
		blockLength,
	} from "@/ts/stores";

	import { createEventDispatcher } from "svelte";

	import Button from "./Button.svelte";

	const dispatch = createEventDispatcher();

	function addBlock() {
		const emptyBlock = new Array($blockLength).fill([]) as block;
		$currentBeat.blocks = [...$currentBeat.blocks, emptyBlock];
		dispatch("blockAdded");
	}

	function removeBlock() {
		const length = $currentBeat.blocks.length;
		$currentBeat.blocks = $currentBeat.blocks.slice(
			0,
			length - 1
		);
	}
</script>

<menu>
	<Button ariaLabel="add block" action={addBlock}>
		<Fa icon={faPlus} />
	</Button>

	<Button
		ariaLabel="remove block"
		action={removeBlock}
		disabled={$playState == "playing" &&
			$currentBlockIndex == $currentBeat.blocks.length - 1}
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
