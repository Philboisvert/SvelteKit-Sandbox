export interface Multimedia {
    url: string;
}

export interface Article {
    abstract: string;
    title: string;
    url: string;
    published_date: string;
    category: string;
    multimedia: Multimedia[];
    section: String;
}