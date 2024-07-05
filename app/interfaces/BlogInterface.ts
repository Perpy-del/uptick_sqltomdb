export interface BlogInterface {
    id?: string;
    title: string;
    slug: string;
    body: string;
    category: string;
    author: string;
    thumbnail: string;
    is_featured: boolean;
    created_at: string
}