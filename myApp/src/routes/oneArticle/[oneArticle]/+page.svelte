<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
  </script>
  
  <svelte:head>
    <title>Sandbox</title>
    <meta name="description" content="Svelte demo app" />
  </svelte:head>
  
  <section>
    <h1 class="flex text-black">{data.post.title}</h1>
    <div class="flex gap-1">
      <span>The New York Times </span><strong>|</strong><span class="font-bold"
        >{data.post.published_date}</span
      >
    </div>
    <img src={data.post.multimedia} alt={data.post.title} />
    <div class="text-sm">{data.post.abstract}</div>
    <div class="spacer h-7" />
    <a class="text-black text-center btn" href={data.post.url}
      >Read the full article on The New York Times</a
    >
  </section>
  
  <style>
    /*Image's going to be pixelated, but were working with 75x75*/
    img {
      width: 100%;
      height: auto;
      max-height: 500px;
    }
  </style>
  