<script lang="ts">
	export let name: string = "";
	export let disabled: boolean = false;
	export let action: () => void = () => {};
</script>

<button title={name} aria-label={name} {disabled} on:click={action}>
	<slot />
</button>

<style lang="scss">
	@use "../scss/mixins" as *;

	button {
		@include input-reset;
		cursor: pointer;
		&:hover,
		&:focus-visible {
			filter: brightness(1.2);
		}
		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
		background-color: var(--button-color);
		padding: 0.3rem 0.8rem;
		border-radius: 0.25rem;
	}
</style>
