<script lang="ts">
	import Fa from "svelte-fa";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
</script>

<header>
	<a
		href="https://github.com/ScriptRaccoon/drumcomputer"
		target="_blank"
		rel="noreferrer"
		aria-label="GitHub repository"
	>
		<Fa aria-hidden icon={faGithub} />
	</a>
	<h1>Drum Computer</h1>
</header>

<style lang="scss">
	header {
		text-align: center;
		padding: 1.5rem;
		position: relative;
	}

	h1 {
		font-weight: 500;
		font-size: 2.2rem;
		line-height: 1;

		@media (min-width: 420px) {
			font-size: 2.5rem;
		}
	}

	a {
		position: absolute;
		top: 0.5rem;
		right: 0;
		color: var(--dark-font-color);

		&:focus {
			outline: 0.1rem solid var(--font-color);
			color: var(--font-color);
		}
	}
</style>
