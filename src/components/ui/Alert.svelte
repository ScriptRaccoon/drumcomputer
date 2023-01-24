<script lang="ts">
	import { fade, scale } from "svelte/transition";
	import { showAlert, alertTexts } from "@/ts/stores";
	import Button from "@/components/ui/Button.svelte";
	const speed = 200;
	function hideMe() {
		$showAlert = false;
	}
</script>

{#if $showAlert}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="backdrop"
		transition:fade={{ duration: speed }}
		on:click|self={hideMe}
	>
		<div class="content" transition:scale={{ duration: speed }}>
			{#each $alertTexts as txt}
				<p>
					{@html txt}
				</p>
			{/each}
			<menu>
				<Button
					name="Ok"
					action={() => {
						hideMe();
					}}>Ok</Button
				>
			</menu>
		</div>
	</div>
{/if}

<style lang="scss">
	@use "../../scss/mixins" as *;
	.backdrop {
		@include flex-center();
		position: fixed;
		inset: 0;
		z-index: 100;
		background-color: #0006;
	}
	.content {
		max-width: min(40rem, 95vw);
		background-color: #000;
		padding: 1.5rem;
		border-radius: 0.8rem;
		box-shadow: 0 0 1rem #fff2;
		text-align: center;
		p {
			font-size: 1.2rem;
			margin-bottom: 1rem;
			:global(code) {
				font-size: 1rem;
				color: var(--dark-font-color);
			}
		}
	}
</style>
