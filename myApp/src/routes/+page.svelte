<script lang="ts">
  import CardArticle from "./components/CardArticle.svelte";
  import { Search, Button } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { inview } from "svelte-inview/dist/index";
  import { _fetchNYT } from "./+page";
  import type { Article } from "../types";
  import "default-passive-events";

  let newArticlesBatch: Article[] = [];
  let allArticles: Article[] = [];
  let offset: number = 20;
  let value: String;
  let inSearch: boolean = false;

  onMount(async () => {
    newArticlesBatch = await _fetchNYT(offset);
  });

  const handleFullScroll = async (e: any) => {
    offset = offset + 20;
    if (e.detail.inView) {
      newArticlesBatch = await _fetchNYT(offset);
    }
  };

  const searchValue = () => {
    let trimmedArticles: any = [];
    if (value !== undefined) {
      for (var i = 0; i < allArticles.length; i++) {
        var obj = allArticles[i];
        if (obj.section === value) {
          trimmedArticles.push(obj);
        }
      }
      inSearch = true;
      allArticles = [...trimmedArticles];
      //TODO eventually, keep the state and articles
      const searchBtn = document.getElementById("btnSearch");
      const searchInput = document.getElementById("searchInp");
      const resetInput = document.getElementById("resetInput");

      if (searchBtn !== null && searchInput !== null && resetInput !== null) {
        (searchBtn as HTMLButtonElement).disabled = true;
        (searchInput as HTMLInputElement).disabled = true;
        resetInput.style.display = "block";
      }
    }
  };

  const resetValue = () => {
    window.location.replace("/");
  };

  $: {
    if (!inSearch) {
      allArticles = [...allArticles, ...newArticlesBatch];
    }
  }
</script>

<svelte:head>
  <title>Sandbox</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<h1 class="mx-0">Latest News Articles</h1>
<form
  class="flex gap-2 w-4/5 mx-auto py-2 items-center"
  on:submit={searchValue}
>
  <Search
    placeholder="Search by section word (e.g., U.S., Food, World, Arts..)"
    bind:value
    size="md"
    id="searchInp"
  />
  <Button id="btnSearch" class="!p-2.5 sub-btn" type="submit">
    <svg
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      /></svg
    >
  </Button>
</form>
<Button
  id="resetInput"
  class="w-1/5 mx-auto mb-2 hidden"
  type="button"
  on:click={resetValue}
>
  Make another search
</Button>

<section class="wrapper mx-0 flex flex-wrap flex-row justify-center">
  {#if allArticles.length > 0}
    {#each allArticles as article, i}
      <CardArticle {article} {i} />
    {/each}
  {/if}
  <div use:inview={{}} on:inview_change={handleFullScroll} />
</section>

<style>
  .wrapper {
    gap: 20px;
  }
</style>
