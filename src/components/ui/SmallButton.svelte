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
			color: var(--button-color);
		}
		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
		font-size: 14px;
		padding: 4px;
	}
</style>
