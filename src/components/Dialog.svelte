<script lang="ts">
	import { dialogState } from "@/ts/stores";
	import Button from "@/components/Button.svelte";
	import { tick } from "svelte";

	let dialogElement: HTMLDialogElement;

	function closeDialog() {
		$dialogState.open = false;
		setTimeout(() => {
			dialogElement?.close();
		}, 150);
	}

	async function openDialog() {
		dialogElement?.showModal();
		await tick();
		dialogElement.querySelector("button")?.focus();
	}

	function confirmDialog() {
		if ($dialogState.action) $dialogState.action();
		closeDialog();
	}

	$: if ($dialogState.open) {
		openDialog();
	}
</script>

<dialog
	class:open={$dialogState.open}
	bind:this={dialogElement}
	aria-label={$dialogState.type}
	aria-describedby="dialogContent"
>
	{#each $dialogState.contents as content}
		<p id="dialogContent">
			{@html content}
		</p>
	{/each}

	<menu>
		{#if $dialogState.type === "alert"}
			<Button ariaLabel="Ok" action={closeDialog}>Ok</Button>
		{:else if $dialogState.type === "confirm"}
			<Button ariaLabel="Cancel" action={closeDialog}>
				Cancel
			</Button>
			<Button ariaLabel="Confirm" action={confirmDialog}>
				Confirm
			</Button>
		{/if}
	</menu>
</dialog>

<style lang="scss">
	@use "../scss/mixins" as *;

	dialog {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #000;
		color: inherit;
		width: min(30rem, 95vw);
		padding: 1.5rem;
		border-radius: 0.8rem;
		text-align: center;
		border: 0.1rem solid var(--font-color);
		opacity: 0;
		transition: opacity 150ms linear;

		&.open {
			opacity: 1;
		}

		&::backdrop {
			background-color: #0005;
		}
	}

	p {
		font-size: var(--larger-font);
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
</style>
