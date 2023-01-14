<script lang="ts">
	import { slide } from "svelte/transition";
	export let message: string = "";
	export let show: boolean = false;
</script>

{#if show}
	<p transition:slide={{ duration: 150 }}>
		{message}
	</p>
{/if}

<style>
	p {
		position: absolute;
		top: 0px;
		left: 0px;
		margin: 10px;
		padding: 10px;
		font-weight: bold;
		color: var(--error-color);
		background-color: var(--font-color);
		box-shadow: 0px 0px 20px #000a;
		border-radius: 3px;
	}
</style>
