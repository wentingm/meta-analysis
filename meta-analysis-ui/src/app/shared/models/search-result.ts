export interface SearchResult {
    paperID: string;
    externalIds: {
        MAG: string;
        CorpusID: number;
    };
    title: string;
    abstract: string;
    year: number;
}