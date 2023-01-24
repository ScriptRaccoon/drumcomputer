<script lang="ts">
	import { instruments } from "@/ts/instruments";
</script>

<div class="instruments">
	{#each instruments as instrument}
		<div class="instrument">{instrument.longName}</div>
	{/each}
</div>

<style lang="scss">
	.instruments {
		position: sticky;
		left: 0;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		color: var(--dark-font-color);
		background-image: linear-gradient(
			to right,
			var(--bg-color) 30%,
			transparent
		);
		.instrument {
			width: 6rem;
			height: var(--note-size);
			display: flex;
			align-items: center;
		}
	}
</style>
