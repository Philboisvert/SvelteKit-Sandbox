import axios from "axios";

 async function _fetchNYT(offset:number) {
    const url = `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=20&offset=${offset}&api-key=h54WGSclubJostDA9InXlExWRAqfEBMo`;
		try {
			const response = await axios.get(url);
			return response.data.results;
		} catch (error) {
			console.error("Error fetching articles:", error);
		}
} 

export { _fetchNYT } 