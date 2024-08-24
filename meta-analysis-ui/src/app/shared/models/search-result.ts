interface author {
    authorId: string;
    name: string;
}

interface journal {
    name?: string;
    pages?: string;
    volume?: string;
}

export interface SearchResult {
    url: string;
    title: string;
    year: number;
    authors: author[];
    abstract: string;
    journal: journal | null;
}