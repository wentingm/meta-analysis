export interface SearchResult {
    url: string;
    title: string;
    year: number;
    abstract: string;
    available_in_database?: number;
    pdf_link: string | null;
}