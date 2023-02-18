<script lang="ts">
	import {
		showSettings,
		timelineScrolls,
		currentBeat,
		dialogState,
	} from "@/ts/stores";
	import Button from "./Button.svelte";
	import { stringIsPositiveInteger } from "@/ts/utils";

	function hideSettings() {
		$showSettings = false;
	}

	const error = {
		speed: false,
		division: false,
	};

	function changeSpeed(e: any) {
		const inputElement = e?.target as HTMLInputElement;
		const value = inputElement.value;
		if (stringIsPositiveInteger(value)) {
			error.speed = false;
			$currentBeat.speed = parseInt(value);
		} else {
			error.speed = true;
			const content = "Speed must be a positive integer";
			$dialogState = {
				open: true,
				type: "alert",
				contents: [content],
			};
		}
	}

	function changeDivision(e: any) {
		const inputElement = e?.target as HTMLInputElement;
		const value = inputElement.value;
		if (stringIsPositiveInteger(value)) {
			error.division = false;
			const difference =
				parseInt(value) - $currentBeat.division;
			if (difference < 0) {
				confirmToDecreaseDivision(-difference);
			} else {
				increaseDivision(difference);
			}
		} else {
			error.division = true;
			const content = "Division must be a positive integer";
			$dialogState = {
				open: true,
				type: "alert",
				contents: [content],
			};
		}
	}

	function confirmToDecreaseDivision(amount: number) {
		const content =
			"Decreasing the division will delete all notes " +
			"which are in the removed columns. Are you sure?";
		$dialogState = {
			open: true,
			type: "confirm",
			contents: [content],
			action: () => decreaseDivision(amount),
		};
	}

	function decreaseDivision(amount: number) {
		$currentBeat.division -= amount;

		$currentBeat.blocks = $currentBeat.blocks.map((block) =>
			block.splice(0, $currentBeat.division)
		);
	}

	function increaseDivision(amount: number) {
		for (const block of $currentBeat.blocks) {
			for (let i = 0; i < amount; i++) {
				block[$currentBeat.division + i] = [];
			}
		}

		$currentBeat.division += amount;
	}
</script>

<h2>Settings</h2>

<form on:submit|preventDefault>
	<label for="scrollCheckbox"> Scroll timeline </label>
	<input
		id="scrollCheckbox"
		type="checkbox"
		bind:checked={$timelineScrolls}
	/>
	<label for="speedInput">Speed in bpm</label>

	<input
		id="speedInput"
		class:error={error.speed}
		type="number"
		min="1"
		max="1000"
		value={$currentBeat.speed}
		on:change={changeSpeed}
	/>
	<label for="divisionInput" aria-describedby="divisionDescription"
		>Division<span aria-hidden="true">*</span>
	</label>
	<input
		id="divisionInput"
		class:error={error.division}
		type="number"
		min="1"
		max="10"
		value={$currentBeat.division}
		on:change={changeDivision}
	/>
	<Button
		disabled={Object.values(error).includes(true)}
		action={hideSettings}
	>
		Ok
	</Button>
	<div id="divisionDescription" class="description">
		<span aria-hidden="true">*</span>number of hits per block
	</div>
</form>

<style lang="scss">
	@use "../scss/mixins" as *;

	h2 {
		font-weight: 500;
		font-size: 2rem;
		line-height: 1;
		text-align: center;
		margin-bottom: 2rem;
	}

	form {
		max-width: 16rem;
		margin-inline: auto;
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;
		justify-items: start;
		align-items: center;

		& :global(button) {
			grid-column: 1 / span 2;
			justify-self: center;
		}

		& .description {
			grid-column: 1 / span 2;
		}
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
		font-size: 1.25rem;
		color: var(--dark-font-color);
	}

	.description {
		color: var(--dark-font-color);
	}
</style>
