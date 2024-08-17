interface IProductResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    primaryImage: string;
    //images: string[];
    tags: string[];
    quantity?: number;
}
