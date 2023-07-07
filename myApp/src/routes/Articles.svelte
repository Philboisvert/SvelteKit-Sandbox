<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";

  export let apiKey: string;

  interface Multimedia {
    url: string;
  }

  interface Article {
    abstract: string;
    title: string;
    url: string;
    published_date: string;
    category: string;
    multimedia: Multimedia[];
  }

  let articles: Article[] = [];

  onMount(async () => {
    const url = `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${apiKey}`;

    try {
      const response = await axios.get(url);
      articles = response.data.results;
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  });
</script>

<h1>Latest News Articles</h1>

{#if articles.length > 0}
  <section>
    {#each articles as article, i}
      <div>
        <!-- Sadly, 90% of the articles don't have an image sadly -->
        <!-- <img src="{article.multimedia[i]?.url.replace(/thumbStandard.jpg/g, "superJumbo.jpg?quality=75&auto=webp")}" alt="{article.title}"> -->
        <strong>{article.title}</strong>
        <strong
          >Published date: {new Date(
            article.published_date
          ).toLocaleDateString()}</strong
        >
        <p>{article.abstract}</p>
        <button> <a href={article.url} target="_blank">Read more</a></button>
      </div>
    {/each}
  </section>
{:else}
  <p>Loading...</p>
{/if}
