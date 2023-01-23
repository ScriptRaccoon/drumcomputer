<script>
	import Fa from "svelte-fa";
	import {
		faMinus,
		faPlus,
	} from "@fortawesome/free-solid-svg-icons";
	import {
		playState,
		currentBeat,
		durationError,
	} from "@/ts/stores";
	import SmallButton from "@/components/ui/SmallButton.svelte";
	import ErrorMessage from "@/components/ui/ErrorMessage.svelte";
	$: $durationError =
		$currentBeat.noteDuration === null ||
		$currentBeat.noteDuration <= 0 ||
		$currentBeat.noteDuration !=
			Math.floor($currentBeat.noteDuration);

	function increaseNoteDuration() {
		$currentBeat.noteDuration += 5;
	}

	function decreaseNoteDuration() {
		$currentBeat.noteDuration = Math.max(
			0,
			$currentBeat.noteDuration - 5
		);
	}
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

	<div class="duration-buttons">
		<SmallButton
			name="increase note duration"
			action={increaseNoteDuration}
		>
			<Fa icon={faPlus} />
		</SmallButton><SmallButton
			name="decrease note duration"
			action={decreaseNoteDuration}
		>
			<Fa icon={faMinus} />
		</SmallButton>
	</div>

	<label>
		<span>beat name</span>
		<input type="text" bind:value={$currentBeat.name} />
	</label>
</form>
<ErrorMessage
	message={"Error: note duration must be a positive integer"}
	show={$durationError}
/>

<style lang="scss">
	@use "../scss/mixins" as *;

	form {
		@include flex-center();
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
		width: 35px;
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

	.duration-buttons {
		margin-right: 20px;
	}
</style>
