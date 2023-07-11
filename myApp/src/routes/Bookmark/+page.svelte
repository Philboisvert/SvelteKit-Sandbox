<script lang="ts">
    import { onMount } from "svelte";
    import CardBookmark from "../components/CardBookmark.svelte";

    let myData:[] = [];

    onMount(() => {
        if(localStorage.getItem("bookmarkedArticles") !== undefined){
            let data = localStorage.getItem("bookmarkedArticles") as string;
            myData = JSON.parse(data);
        }
    });
</script>

<section class="wrapper mx-0 flex flex-wrap flex-row justify-center">
    {#if myData.length > 0}
        {#each myData as article}
        <CardBookmark {article}/>
        {/each}
    {:else}
        <h1>You currently have no articles bookmarked</h1>
    {/if}
</section>

<style>
  .wrapper {
    gap: 20px;
  }
</style>