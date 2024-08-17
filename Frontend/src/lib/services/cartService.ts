import { type Writable, writable } from 'svelte/store';

interface ICartService {
    cart: Writable<IProductResponse[]>;

    addToCart(product: IProductResponse): Promise<void>;
    removeFromCart(product: IProductResponse): Promise<void>;
    clearCart(): Promise<void>;
}

export class CartService implements ICartService {
    cart= writable<IProductResponse[]>();

    async addToCart(product: IProductResponse) {
        this.cart.update(value => [...value, product]);
    }
    async removeFromCart(product: IProductResponse) {
        this.cart.update(value => value.filter(p => p.id !== product.id));
    }
    async clearCart() {
        this.cart.set([]);
    }
}

const cartService = new CartService();
export default cartService;