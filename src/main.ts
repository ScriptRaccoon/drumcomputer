import "@/scss/index.scss";
import App from "./App.svelte";
import { defineInstruments } from "./ts/instruments";

defineInstruments();

const app = new App({
	target: document.getElementById("app") as HTMLElement,
});

export default app;
