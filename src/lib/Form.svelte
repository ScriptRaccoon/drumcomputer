<script>
	import {
		playState,
		currentBeat,
		durationError,
	} from "@/ts/stores";
	import ErrorMessage from "./ErrorMessage.svelte";
	$: $durationError =
		$currentBeat.noteDuration === null ||
		$currentBeat.noteDuration <= 0 ||
		$currentBeat.noteDuration !=
			Math.floor($currentBeat.noteDuration);
</script>

<form on:submit|preventDefault>
	<label>
		<span>note duration</span>
		<input
			class:error={$durationError}
			disabled={$playState == "playing"}
			type="number"
			min="1"
			max="1000"
			step="1"
			bind:value={$currentBeat.noteDuration}
		/>
	</label>
	<label>
		<span>beat name</span>
		<input type="text" bind:value={$currentBeat.name} />
	</label>
	<ErrorMessage
		message={"Error: note duration must be a positive integer"}
		show={$durationError}
	/>
</form>

<style lang="scss">
	@use "../scss/mixins" as *;

	form {
		@include flex-center();
		padding-bottom: 20px;
		gap: 20px;
	}

	input[type="text"],
	input[type="number"] {
		@include input-reset;
		outline: none;
		border-bottom: 1px solid var(--dark-font-color);
		padding: 2px;
		appearance: textfield;
		margin-left: 2px;
		&:focus-visible {
			border-color: var(--font-color);
			background-color: #fff1;
		}
		&:disabled {
			color: var(--dark-font-color);
			cursor: not-allowed;
			border-color: transparent;
		}
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type="number"] {
		width: 40px;
		&.error {
			background-color: var(--error-color);
		}
	}

	input[type="text"] {
		width: 120px;
	}

	label span {
		color: var(--dark-font-color);
	}
</style>
