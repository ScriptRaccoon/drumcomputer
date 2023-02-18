<script lang="ts">
	import type { block } from "@/ts/types";
	import Fa from "svelte-fa";
	import {
		faPlus,
		faMinus,
	} from "@fortawesome/free-solid-svg-icons";

	import {
		blockAmount,
		currentBeat,
		currentBlockIndex,
		playState,
	} from "@/ts/stores";

	import { createEventDispatcher } from "svelte";

	import Button from "./Button.svelte";

	const dispatch = createEventDispatcher();

	function addBlock() {
		const emptyBlock = new Array($currentBeat.division).fill(
			[]
		) as block;
		$currentBeat.blocks = [...$currentBeat.blocks, emptyBlock];
		dispatch("blockAdded");
	}

	function removeBlock() {
		$currentBeat.blocks = $currentBeat.blocks.slice(
			0,
			$blockAmount - 1
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
		disabled={$blockAmount == 0 ||
			($playState == "playing" &&
				$currentBlockIndex == $blockAmount - 1)}
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
