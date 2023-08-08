<script lang="ts">
  export let article: any;
  import "../../assets/styles.css";

  function removeBookmark(article: { slug_name: string }) {
    let getBookmarks = localStorage.getItem("bookmarkedArticles");
    let bookmarks = getBookmarks !== null ? JSON.parse(getBookmarks) : null;

    //TODO | code repeating here
    //trims doubles if any
    let results = bookmarks.filter(
      (v: any, i: any, a: any) =>
        a.findIndex((v2: any) =>
          ["slug_name", "byline"].every((k) => v2[k] === v[k])
        ) === i
    ); 
//test
    //Searching for the object we're trying to remove in our localStore, when it matches we're removing it
    for (var i = 0; i < results.length; i++) {
      var obj = results[i];
      if (obj.slug_name === article.slug_name) {
        results.splice(i, 1);
      }
    }

    localStorage.setItem("bookmarkedArticles", JSON.stringify(results));
    //Bad || TODO | store value and subscribe to it
    window.location.replace("/Bookmark");
  }
</script>

<div class="article grow-1 p-4 flex flex-col justify-between">
  <div class="flex justify-end">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <svg
      on:click={() => removeBookmark(article)}
      class="x-icon"
      fill="#000000"
      height="10px"
      width="10px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 460.775 460.775"
      xml:space="preserve"
    >
      <path
        d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
        c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
        c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
        c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
        l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
        c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
      />
    </svg>
  </div>
  <span class="flex justify-center">
    <img src={article.multimedia} alt={article.title} />
  </span>
  <strong class="text-black">{article.title}</strong>
  <strong class="text-sm">Published date: {article.published_date}</strong>
  <p>{article.abstract}</p>
  <a class="text-black text-center btn" href={article.url}
    >Read the full article on The New York Times</a
  >
</div>

<style>
  .x-icon {
    cursor: pointer;
  }
</style>
