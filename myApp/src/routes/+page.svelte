<script lang="ts">
  import CardArticle from "./components/CardArticle.svelte";
  import fallbackImg from "$lib/images/fallback.png";
  import { Search, Button } from "flowbite-svelte";
  import { inview } from "svelte-inview/dist/index";
  import type { Article } from "../types";
  import axios from "axios";
  import "default-passive-events";

  export let data;
  let newArticlesBatch: Article[] = [];
  let serverLoadedArticles: Article[] = [];
  let untrimmedBatch: Article[] = [];
  let offset: number = 20;
  let inSearch: boolean = false;
  let value: String;

  serverLoadedArticles = data.articles;

  const handleFullScroll = async (e: any) => {
    offset = offset + 20;
    if (e.detail.inView) {
      untrimmedBatch = await _fetchNYT(offset);
      untrimmedBatch.forEach((element: any) => {
        Object.keys(element).forEach((item) => {
          if (item == "multimedia") {
            element[item] =
              element[item][0]?.url !== undefined
                ? element[item][0].url
                : (element[item] = fallbackImg);
          }
          if (item === "published_date") {
            element[item] = new Date(element[item]).toLocaleDateString();
          }
        });
      });

      newArticlesBatch = untrimmedBatch;
    }
  };

  const searchValue = () => {
    let trimmedArticles: any = [];
    if (value !== undefined) {
      for (var i = 0; i < serverLoadedArticles.length; i++) {
        var obj = serverLoadedArticles[i];
        if (obj.section === value) {
          trimmedArticles.push(obj);
        }
      }
      inSearch = true;
      serverLoadedArticles = [...trimmedArticles];
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

  async function _fetchNYT(offset: number) {
    const url = `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=20&offset=${offset}&api-key=h54WGSclubJostDA9InXlExWRAqfEBMo`;
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  const resetValue = () => {
    window.location.replace("/");
  };

  $: {
    if (!inSearch) {
      serverLoadedArticles = [...serverLoadedArticles, ...newArticlesBatch];
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

<!-- <section class="wrapper mx-0 flex flex-wrap flex-row justify-center">
  {#if allArticles.length > 0}
    {#each allArticles as article, i}
      <CardArticle {article} {i} />
    {/each}
  {/if}
  <div use:inview={{}} on:inview_change={handleFullScroll} />
</section> -->

<section class="wrapper mx-0 flex flex-wrap flex-row justify-center">
  {#if serverLoadedArticles.length > 0}
    {#each serverLoadedArticles as article}
      <CardArticle {article} />
    {/each}
  {/if}
  <div use:inview={{}} on:inview_change={handleFullScroll} />
</section>

<style>
  .wrapper {
    gap: 20px;
  }
</style>
