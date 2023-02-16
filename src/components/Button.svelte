<script lang="ts">
	export let ariaLabel: string = "";
	export let disabled: boolean = false;
	export let action: () => void = () => {};
</script>

<button aria-label={ariaLabel} {disabled} on:click={action}>
	<slot />
</button>

<style lang="scss">
	@use "../scss/mixins" as *;

	button {
		@include input-reset;
		cursor: pointer;
		background-color: var(--button-color);
		padding: 0.3rem 0.8rem;
		border-radius: 0.25rem;

		&:hover {
			filter: brightness(1.2);
		}

		&:focus {
			outline: 0.1rem solid var(--font-color);
		}

		&:disabled {
			opacity: 0.4;
			pointer-events: none;
		}
	}
</style>
