import axios from "axios";
import fallbackImg from "$lib/images/fallback.png";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const url = `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=20&offset=10&api-key=h54WGSclubJostDA9InXlExWRAqfEBMo`;
  const response = await axios.get(url);
  const results = response.data.results;
  results.forEach((element: any) => {
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
  return {
    articles: results,
  };
}) satisfies PageServerLoad;
