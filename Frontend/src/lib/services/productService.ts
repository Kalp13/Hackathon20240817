import { ServerURls } from '../../routes/+server';
import { writable } from 'svelte/store';

interface IProductService {
    productList: typeof writable;
    productSingle: typeof writable;
    productListRandom: typeof writable;
    createdProduct: typeof writable;
    updatedProduct: typeof writable;
    deletedProduct: typeof writable;

    getProductList(request: IProductListRequest): Promise<void>;
    getProductSingle(id: number): Promise<void>;
    getProductListRandom(): Promise<void>;
    createProduct(request: IProductRequest): Promise<void>;
    updateProduct(request: IProductRequest): Promise<void>;
    deleteProduct(id: number): Promise<void>;
}

export class ProductService implements IProductService {
    productList = writable([]);
    productSingle = writable({});
    productListRandom = writable([]);
    createdProduct = writable({});
    updatedProduct = writable({});
    deletedProduct = writable({});

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
            this.productList.set([]);
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
            this.productSingle.set({});
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
            this.productListRandom.set([]);
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
            this.createdProduct.set({});
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
            this.updatedProduct.set({});
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
            this.deletedProduct.set({});
            console.error(error);
        }
    }
}

const productService = new ProductService();
export default productService;