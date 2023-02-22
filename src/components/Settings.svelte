<script lang="ts">
	import {
		showSettings,
		timelineScrolls,
		currentTrack,
		dialogState,
	} from "@/ts/stores";
	import Button from "./Button.svelte";
	import { stringIsPositiveInteger } from "@/ts/utils";
	import { fade } from "svelte/transition";

	function hideSettings() {
		$showSettings = false;
	}

	const error = {
		speed: false,
		subdivisions: false,
	};

	function changeSpeed(e: any) {
		const inputElement = e?.target as HTMLInputElement;
		const value = inputElement.value;
		if (stringIsPositiveInteger(value)) {
			error.speed = false;
			$currentTrack.speed = parseInt(value);
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

	function changeSubdivisions(e: any) {
		const inputElement = e?.target as HTMLInputElement;
		const value = inputElement.value;
		if (stringIsPositiveInteger(value)) {
			error.subdivisions = false;
			const difference =
				parseInt(value) - $currentTrack.subdivisions;
			if (difference < 0) {
				confirmToDecreaseSubdivisions(-difference);
			} else {
				increaseSubdivisions(difference);
			}
		} else {
			error.subdivisions = true;
			const content = "Subdivisions must be a positive integer";
			$dialogState = {
				open: true,
				type: "alert",
				contents: [content],
			};
		}
	}

	function confirmToDecreaseSubdivisions(amount: number) {
		const content =
			"Decreasing the division will delete all notes " +
			"which are in the removed columns. Are you sure?";
		$dialogState = {
			open: true,
			type: "confirm",
			contents: [content],
			action: () => decreaseSubdivisions(amount),
		};
	}

	function decreaseSubdivisions(amount: number) {
		$currentTrack.subdivisions -= amount;

		$currentTrack.beats = $currentTrack.beats.map((beat) =>
			beat.splice(0, $currentTrack.subdivisions)
		);
	}

	function increaseSubdivisions(amount: number) {
		for (const beat of $currentTrack.beats) {
			for (let i = 0; i < amount; i++) {
				beat[$currentTrack.subdivisions + i] = [];
			}
		}

		$currentTrack.subdivisions += amount;
	}
</script>

<section
	in:fade={{ delay: 150, duration: 120 }}
	out:fade={{ duration: 120 }}
>
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
			value={$currentTrack.speed}
			on:change={changeSpeed}
		/>
		<label for="divisionInput">Subdivisions per beat </label>
		<input
			id="divisionInput"
			class:error={error.subdivisions}
			type="number"
			min="1"
			value={$currentTrack.subdivisions}
			on:change={changeSubdivisions}
		/>
		<Button
			disabled={Object.values(error).includes(true)}
			action={hideSettings}
		>
			Ok
		</Button>
	</form>
</section>

<style lang="scss">
	@use "../scss/mixins" as *;

	h2 {
		font-weight: 400;
		font-size: 1.8rem;
		text-align: center;
		padding-block: 1rem;
		border-top: 0.1rem solid var(--thin-color);
	}

	form {
		margin-top: 1rem;
		max-width: 18rem;
		margin-inline: auto;
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;
		justify-items: start;
		align-items: center;

		& :global(button) {
			margin-top: 0.5rem;
			grid-column: 1 / span 2;
			justify-self: center;
		}
	}

	input[type="checkbox"] {
		accent-color: var(--button-color);
		&:focus {
			outline: 0.1rem solid var(--font-color);
		}
		transform-origin: left;
		scale: 1.4;
	}

	input[type="number"] {
		@include input-reset;
		-moz-appearance: textfield;
		appearance: textfield;
		padding: 0.25rem 0.5rem;
		border: 0.1rem solid var(--dark-font-color);
		outline: none;
		border-radius: 0.2rem;
		width: 4rem;
		transition: border-color 150ms linear;

		&:focus {
			border-color: var(--font-color);
		}

		&.error {
			border-color: red;
		}
	}

	label {
		font-size: var(--larger-font);
		color: var(--dark-font-color);
		white-space: nowrap;
	}
</style>
