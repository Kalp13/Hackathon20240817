import { ServerURls } from '../../routes/+server';
import { type Writable, writable } from 'svelte/store';

interface IProductService {
    productList:  Writable<IProductListResponse | null>;
    productSingle: Writable<IProductResponse | null>;
    productListRandom: Writable<IProductListResponse | null>;
    createdProduct: Writable<IProductResponse | null>;
    updatedProduct: Writable<IProductResponse | null>;
    deletedProduct: Writable<IProductResponse | null>;

    getProductList(request: IProductListRequest): Promise<void>;
    getProductSingle(id: number): Promise<void>;
    getProductListRandom(): Promise<void>;
    createProduct(request: IProductRequest): Promise<void>;
    updateProduct(request: IProductRequest): Promise<void>;
    deleteProduct(id: number): Promise<void>;
}

export class ProductService implements IProductService {
    productList = writable<IProductListResponse | null>(null);
    productSingle = writable<IProductResponse | null>(null);
    productListRandom = writable<IProductListResponse | null>(null);
    createdProduct = writable<IProductResponse | null>(null);
    updatedProduct = writable<IProductResponse | null>(null);
    deletedProduct = writable<IProductResponse | null>(null);

    async getProductList(request: IProductListRequest) {
        try {
            const response = await fetch(`${ServerURls.productsList}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error('An error occurred while fetching the product list.');
            }
            const data = await response.json();
            this.productList.set(data);
        } catch (error) {
            this.productList.set(null);
            console.error(error);
        }
    }

    async getProductSingle(id: number) {
        try {
            const response = await fetch(`${ServerURls.productsSingle}`);
            if (!response.ok) {
                throw new Error('An error occurred while fetching the product.');
            }
            const data = await response.json();
            this.productSingle.set(data);
        } catch (error) {
            this.productSingle.set(null);
            console.error(error);
        }
    }

    async getProductListRandom() {
        try {
            const response = await fetch(`${ServerURls.productsRandom}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('An error occurred while fetching the random product list.');
            }
            const data = await response.json();
            this.productListRandom.set(data);
        } catch (error) {
            this.productListRandom.set(null);
            console.error(error);
        }
    }

    async createProduct(request: IProductRequest) {
        try {
            const response = await fetch(`${ServerURls.productsCreate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error('An error occurred while creating the product.');
            }
            const data = await response.json();
            this.createdProduct.set(data);
        } catch (error) {
            this.createdProduct.set(null);
            console.error(error);
        }
    }

    async updateProduct(request: IProductRequest) {
        try {
            const response = await fetch(`${ServerURls.productsUpdate}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error('An error occurred while updating the product.');
            }
            const data = await response.json();
            this.updatedProduct.set(data);
        } catch (error) {
            this.updatedProduct.set(null);
            console.error(error);
        }
    }

    async deleteProduct(id: number) {
        try {
            const response = await fetch(`${ServerURls.productsDelete}`);
            if (!response.ok) {
                throw new Error('An error occurred while deleting the product.');
            }
            const data = await response.json();
            this.deletedProduct.set(data);
        } catch (error) {
            this.deletedProduct.set(null);
            console.error(error);
        }
    }
}

const productService = new ProductService();
export default productService;