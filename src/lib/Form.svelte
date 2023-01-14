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
	<ErrorMessage
		message={"Error: note duration must be a positive integer"}
		show={$durationError}
	/>
</form>

<style lang="scss">
	@use "../scss/mixins" as *;

	form {
		padding-bottom: 20px;
		text-align: center;
	}

	input[type="number"] {
		@include input-reset;
		outline: none;
		border-bottom: 1px solid var(--dark-font-color);
		appearance: textfield;
		padding: 3px;
		margin-left: 2px;
		width: 40px;
		text-align: center;
		&:focus-visible {
			border-color: var(--font-color);
			background-color: #fff1;
		}
		&:disabled {
			color: var(--dark-font-color);
			cursor: not-allowed;
			border-color: transparent;
		}
		&.error {
			background-color: var(--error-color);
		}
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	label span {
		color: var(--dark-font-color);
	}
</style>
