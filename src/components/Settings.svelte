<script lang="ts">
	import type { block } from "@/ts/types";
	import {
		showSettings,
		timelineScrolls,
		currentBeat,
		blockLength,
		dialogState,
	} from "@/ts/stores";
	import Button from "./Button.svelte";
	import { stringIsPositiveInteger } from "@/ts/utils";

	function hideSettings() {
		$showSettings = false;
	}

	const error = {
		noteDuration: false,
		blockLength: false,
	};

	function changeNoteDuration(e: any) {
		const inputElement = e?.target as HTMLInputElement;
		const value = inputElement.value;
		if (stringIsPositiveInteger(value)) {
			error.noteDuration = false;
			$currentBeat.noteDuration = parseInt(value);
		} else {
			error.noteDuration = true;
			const content =
				"Note duration must be a positive integer";
			$dialogState = {
				open: true,
				type: "alert",
				contents: [content],
			};
		}
	}

	function changeBlockLength(e: any) {
		const inputElement = e?.target as HTMLInputElement;
		const value = inputElement.value;
		if (stringIsPositiveInteger(value)) {
			error.blockLength = false;
			const difference = parseInt(value) - $blockLength;
			if (difference < 0) {
				confirmToDecreaseBlockLength(-difference);
			} else {
				increaseBlockLength(difference);
			}
		} else {
			error.blockLength = true;
			const content = "Block length must be a positive integer";
			$dialogState = {
				open: true,
				type: "alert",
				contents: [content],
			};
		}
	}

	function confirmToDecreaseBlockLength(amount: number) {
		const content =
			"Decreasing the block length will delete all notes " +
			"which are in the removed columns. Are you sure?";
		$dialogState = {
			open: true,
			type: "confirm",
			contents: [content],
			action: () => decreaseBlockLength(amount),
		};
	}

	function decreaseBlockLength(amount: number) {
		$blockLength -= amount;

		$currentBeat.blocks = $currentBeat.blocks.map((block) =>
			block.splice(0, $blockLength)
		);
	}

	function increaseBlockLength(amount: number) {
		for (const block of $currentBeat.blocks) {
			for (let i = 0; i < amount; i++) {
				block[$blockLength + i] = [];
			}
		}

		$blockLength += amount;
	}
</script>

<h2>Settings</h2>

<form on:submit|preventDefault>
	<label>
		<span>Scroll timeline</span>
		<input type="checkbox" bind:checked={$timelineScrolls} />
	</label>
	<label>
		<span>Note duration</span>
		<input
			class:error={error.noteDuration}
			type="number"
			min="1"
			max="1000"
			value={$currentBeat.noteDuration}
			on:change={changeNoteDuration}
		/>
	</label>
	<label>
		<span>Block length</span>
		<input
			class:error={error.blockLength}
			type="number"
			min="1"
			max="10"
			value={$blockLength}
			on:change={changeBlockLength}
		/>
	</label>
	<Button
		disabled={Object.values(error).includes(true)}
		action={hideSettings}
	>
		Ok
	</Button>
</form>

<style lang="scss">
	@use "../scss/mixins" as *;

	h2 {
		font-weight: 500;
		font-size: 2rem;
		line-height: 1;
		text-align: center;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		margin-top: 2rem;
		max-width: 20rem;
		margin-inline: auto;
	}

	input[type="checkbox"] {
		accent-color: var(--button-color);
		&:focus {
			outline: 0.1rem solid var(--font-color);
		}
	}

	input[type="number"] {
		@include input-reset;
		-moz-appearance: textfield;
		appearance: textfield;
		padding: 0.25rem 0.5rem;
		border: 0.1rem solid var(--dark-font-color);
		outline: none;
		border-radius: 0.2rem;
		width: 5rem;

		&:focus {
			border-color: var(--font-color);
		}

		&.error {
			border-color: red;
		}
	}

	label {
		span {
			color: var(--dark-font-color);
			display: inline-block;
			width: 6.5rem;
		}
	}
</style>
