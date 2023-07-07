<script lang="ts">
	import Articles from "./Articles.svelte";
</script>

<svelte:head>
	<title>Sandbox</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Articles apiKey="h54WGSclubJostDA9InXlExWRAqfEBMo" />
</section>

<style>
	.user {
		display: flex;
		align-items: center;
		margin: 20px;
	}
	.user img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-left: 10px;
	}
</style>
