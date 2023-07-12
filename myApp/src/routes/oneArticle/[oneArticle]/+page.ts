import type { PageLoad } from './$types';

let objectData:any;

export const load = (({ params }) => {
    objectData = Object.fromEntries(  
        new URLSearchParams("?"+params.oneArticle)
    )
    return {
        post: {
            title: `${objectData.title}`,
            published_date: `${objectData.published_date}`,
            abstract: `${objectData.abstract}`,
            multimedia: `${objectData.multimedia}`,
            url: `${objectData.url}`,
        }
    };
}) satisfies PageLoad;