<script lang="ts">
	import { fade, scale } from "svelte/transition";
	import {
		showConfirm,
		confirmText,
		confirmAction,
	} from "@/ts/stores";
	import Button from "./Button.svelte";
	const speed = 200;
	function hideMe() {
		$showConfirm = false;
	}
</script>

{#if $showConfirm}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="backdrop"
		transition:fade={{ duration: speed }}
		on:click|self={hideMe}
	>
		<div class="content" transition:scale={{ duration: speed }}>
			<p>
				{$confirmText}
			</p>
			<menu>
				<Button
					name="Yes"
					action={() => {
						$confirmAction();
						hideMe();
					}}>Yes</Button
				>
				<Button name="No" action={hideMe}>No</Button>
			</menu>
		</div>
	</div>
{/if}

<style lang="scss">
	@use "../scss/mixins" as *;
	.backdrop {
		@include flex-center();
		position: fixed;
		inset: 0;
		z-index: 100;
		background-color: #0006;
	}
	.content {
		max-width: min(460px, 95vw);
		background-color: black;
		color: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0px 0px 10px #fff2;
		p {
			font-size: 20px;
			text-align: center;
		}
	}
	menu {
		padding-top: 20px;
		display: flex;
		justify-content: center;
		gap: 10px;
	}
</style>
