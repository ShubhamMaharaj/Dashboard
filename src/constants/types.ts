export interface Post {
    id: number;
    title: string;
    content: string;
    category: string[];
    image: string;
    tags: string[];
    newsSourceLink: string;
    newsSourceName: string;
    isPrimary: boolean;
    isVisible: boolean;
}
