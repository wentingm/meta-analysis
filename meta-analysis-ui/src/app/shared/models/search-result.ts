export interface SearchResult {
    url: string;
    title: string;
    year: number | null;
    abstract: string | null;
    available_in_database?: number;
    pdf_link: string | null;
}