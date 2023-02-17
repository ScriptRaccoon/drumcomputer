<script>
	import { instrumentsLoaded } from "@/ts/stores";
</script>

{#if !$instrumentsLoaded}
	<p>Instruments are being loaded ...</p>
{/if}

<style>
	p {
		margin-top: 1rem;
		color: var(--dark-font-color);
		text-align: center;
	}
</style>
