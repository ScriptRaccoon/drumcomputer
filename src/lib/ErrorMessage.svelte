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
		padding-top: 10px;
		font-weight: bold;
		color: var(--error-color);
	}
</style>
