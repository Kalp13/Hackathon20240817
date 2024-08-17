interface IProductService {

    getProductList(request: IProductListRequest): Promise<void>;
    getProductSingle(id: number): Promise<void>;
    getProductListRandom(): Promise<void>;
    createProduct(request: IProductRequest): Promise<void>;
    updateProduct(request: IProductRequest): Promise<void>;
    deleteProduct(id: number): Promise<void>;
}

const uri = '';

export class ProductService implements IProductService {
    async getProductList(request: IProductListRequest) {
        try {
            const response = await fetch(`${uri}/products/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error('An error occurred while fetching the product.');
            }
            const data: IProductListResponse = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async getProductSingle(id: number) {
        try {
            const response = await fetch(`${uri}/products/single${id}`);
            if (!response.ok) {
                throw new Error("An error has occurred while fetching the product");
            }
            const data: IProductResponse = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async createProduct(request: IProductRequest) {
        try {
            const response = await fetch(`${uri}/products/create`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error('An error occurred while fetching the product.');
            }
            const data: IProductResponse = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async updateProduct(request: IProductRequest) {
        try {
            const response = await fetch(`${uri}/products/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error('An error occurred while fetching the product.');
            }
            const data: IProductResponse = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProduct(id: number) {
        try {
            const response = await fetch(`${uri}/products/delete${id}`);
            if (!response.ok) {
                throw new Error("An error has occurred while fetching the product");
            }
            const data: IProductResponse = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async getProductListRandom() {
        try {
            const response = await fetch(`${uri}/products/random`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('An error occurred while fetching the product.');
            }
            const data: IProductListResponse = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

}

const productService = new ProductService();
export default productService;