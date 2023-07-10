<script lang="ts">
	import fallbackImg from "$lib/images/fallback.png";
	import "../../assets/styles.css";

	export let article: any;
	export let i: any;

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

	const queryParams = new URLSearchParams(article).toString();
</script>

<div class="article grow-1 p-4 flex flex-col justify-between">
	<span class="flex justify-center">
		<img src={article.multimedia} alt={article.title} />
	</span>
	<strong class="text-black">{article.title}</strong>
	<strong class="text-sm">Published date: {article.published_date}</strong>
	<p>{article.abstract}</p>
	<a href="/{queryParams}/" class="text-black text-center btn">Read more</a>
</div>

<style>
	 .article{	
		box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
		border-radius: 5px;
		width: 30%;
		gap: 10px;
	}
	.article img {
		height: 200px;
		width: 300px;
	}
	@media ( min-width: 320px ) and ( max-width: 656px ) {  
		.article{
			width: 90%;
		}
	}
	@media ( min-width: 657px ) and ( max-width: 805px ) {  
		.article{
			width: 45%;
		}
	}
</style>
