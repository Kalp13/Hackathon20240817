import { ServerURls } from '../../routes/+server';
import { type Writable, writable } from 'svelte/store';

interface IProductService {
    productList:  Writable<IProductResponse[]>;
    productSingle: Writable<IProductResponse>;
    productListRandom: Writable<IProductResponse>;
    createdProduct: Writable<IProductResponse>;
    updatedProduct: Writable<IProductResponse>;
    deletedProduct: Writable<IProductResponse>;

    getProductList(request: IProductListRequest): Promise<void>;
    getProductSingle(id: number): Promise<void>;
    getProductListRandom(): Promise<void>;
    createProduct(request: IProductRequest): Promise<void>;
    updateProduct(request: IProductRequest): Promise<void>;
    deleteProduct(id: number): Promise<void>;
}

export class ProductService implements IProductService {
    productList = writable<IProductResponse[]>();
    productSingle = writable<IProductResponse>();
    productListRandom = writable<IProductResponse>();
    createdProduct = writable<IProductResponse>();
    updatedProduct = writable<IProductResponse>();
    deletedProduct = writable<IProductResponse>();

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
                
                console.log('An error occurred while fetching the product list.');
            }
            const data = await response.json() as IProductResponse[];
            console.log(data)

            this.productList.set(data);


            console.log(this.productList.subscribe);
            
        } catch (error) {
            this.productList.set([]);
            console.log("null error")
            console.error(error);
        }
    }

    async getProductSingle(id: number) {
        try {
            const response = await fetch(`${ServerURls.productsSingle}/?id=${id}`, {
                method: 'GET'});
            if (!response.ok) {
                throw new Error('An error occurred while fetching the product.');
            }
            const data = await response.json();
            this.productSingle.set(data);
        } catch (error) {
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
            console.error(error);
        }
    }
}

const productService = new ProductService();
export default productService;