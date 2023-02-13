<script lang="ts">
	import {
		dialogState,
		dialogTexts,
		dialogAction,
	} from "@/ts/stores";
	import Button from "@/components/Button.svelte";

	let dialogElement: HTMLDialogElement;

	function closeDialog() {
		$dialogState = null;
		dialogElement?.close();
	}

	$: if ($dialogState) {
		dialogElement?.showModal();
	}
</script>

{#key $dialogState}
	<dialog bind:this={dialogElement}>
		{#each $dialogTexts as txt}
			<p>
				{@html txt}
			</p>
		{/each}
		<menu>
			{#if $dialogState == "alert"}
				<Button ariaLabel="Ok" action={closeDialog}>Ok</Button
				>
			{:else}
				<Button ariaLabel="Cancel" action={closeDialog}
					>Cancel</Button
				>
				<Button
					ariaLabel="Confirm"
					action={() => {
						$dialogAction();
						closeDialog();
					}}>Confirm</Button
				>
			{/if}
		</menu>
	</dialog>
{/key}

<style lang="scss">
	@use "../scss/mixins" as *;

	dialog {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #000;
		color: inherit;
		max-width: min(40rem, 95vw);
		padding: 1.5rem;
		border-radius: 0.8rem;
		box-shadow: 0 0 1rem #fff2;
		text-align: center;
	}

	p {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		:global(code) {
			font-size: 1rem;
			color: var(--dark-font-color);
		}
	}

	menu {
		@include flex-center();
		gap: 1rem;
	}

	dialog::backdrop {
		background: #000a;
		backdrop-filter: blur(0.2rem);
	}
</style>
