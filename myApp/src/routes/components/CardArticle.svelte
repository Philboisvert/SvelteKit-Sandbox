<script lang="ts">
  import fallbackImg from "$lib/images/fallback.png";
  import "../../assets/styles.css";

  export let article: any;
  export let i: any;
  let svg: any;

  Object.keys(article).forEach((item) => {
    if (item === "multimedia") {
      article[item] = article.multimedia[i]?.url || fallbackImg;
    }

    if (item === "published_date") {
      article[item] = prettyDate(article[item]);
    }
  });

  function prettyDate(uglyDate: string) {
    return new Date(uglyDate).toLocaleDateString();
  }

  function toggleBookmark(articleClicked: {}) {
    svg.classList.contains("notBookmarked")
      ? addBookmark(articleClicked)
      : removeBookmark(articleClicked);
  }

  function removeBookmark(articleClicked: any) {
    let getBookmarks = localStorage.getItem("bookmarkedArticles");
    let bookmarks = getBookmarks !== null ? JSON.parse(getBookmarks) : null;
    //trims doubles if any
    let results = checkDuplicates(bookmarks);

    //Searching for the object we're trying to remove in our localStore, when it matches we're removing it
    for (var i = 0; i < results.length; i++) {
      var obj = results[i];
      if (obj.slug_name === articleClicked.slug_name) {
        results.splice(i, 1);
      }
    }

    localStorage.setItem("bookmarkedArticles", JSON.stringify(results));
    svg.classList.toggle("notBookmarked");
  }

  function addBookmark(articleClicked: any) {
    let arrayArticle = [];
    let currentArticles = localStorage.getItem("bookmarkedArticles");

    if (currentArticles == null) {
      arrayArticle.push(articleClicked);
      localStorage.setItem("bookmarkedArticles", JSON.stringify(arrayArticle));
    } else {
      let getBookmarks = localStorage.getItem("bookmarkedArticles");
      let bookmarks = getBookmarks !== null ? JSON.parse(getBookmarks) : null;
      let results = checkDuplicates(bookmarks);
      results.push(articleClicked);
      localStorage.setItem("bookmarkedArticles", JSON.stringify(results));
    }
    svg.classList.toggle("notBookmarked");
  }

  function checkDuplicates(bookmarks: Array<{}>): any {
    return bookmarks.filter(
      (v: any, i: any, a: any) =>
        a.findIndex((v2: any) =>
          ["slug_name", "byline"].every((k) => v2[k] === v[k])
        ) === i
    );
  }

  const queryParams = new URLSearchParams(article).toString();
</script>

<div class="article grow-1 p-4 flex flex-col justify-between">
  <span class="flex justify-center">
    <img src={article.multimedia} alt={article.title} />
  </span>
  <strong class="text-black">{article.title}</strong>
  <strong class="text-sm">Published date: {article.published_date}</strong>
  <p>{article.abstract}</p>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <svg
    bind:this={svg}
    on:click={() => toggleBookmark(article)}
    fill="#000000"
    class="svgStar notBookmarked"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="15px"
    height="15px"
    viewBox="0 0 46.354 46.354"
    xml:space="preserve"
  >
    <g>
      <path
        d="M21.57,2.049c0.303-0.612,0.927-1,1.609-1c0.682,0,1.307,0.388,1.609,1l5.771,11.695c0.261,0.529,0.767,0.896,1.352,0.981
		L44.817,16.6c0.677,0.098,1.237,0.572,1.448,1.221c0.211,0.649,0.035,1.363-0.454,1.839l-9.338,9.104
		c-0.423,0.412-0.616,1.006-0.517,1.588l2.204,12.855c0.114,0.674-0.161,1.354-0.715,1.756c-0.553,0.4-1.284,0.453-1.89,0.137
		l-11.544-6.07c-0.522-0.275-1.147-0.275-1.67,0l-11.544,6.069c-0.604,0.317-1.337,0.265-1.89-0.136
		c-0.553-0.401-0.829-1.082-0.714-1.756l2.204-12.855c0.1-0.582-0.094-1.176-0.517-1.588L0.542,19.66
		c-0.489-0.477-0.665-1.19-0.454-1.839c0.211-0.649,0.772-1.123,1.449-1.221l12.908-1.875c0.584-0.085,1.09-0.452,1.351-0.982
		L21.57,2.049z"
      />
    </g>
  </svg>
  <a href="/{queryParams}/" class="text-black text-center btn">Read more</a>
</div>

<style>
  .svgStar:hover {
    cursor: pointer;
  }
  .notBookmarked {
    fill: transparent;
    stroke: black;
    stroke-width: 4;
  }
</style>
