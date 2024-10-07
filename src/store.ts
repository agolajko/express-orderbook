export interface Order {
    order_type: "buy" | "sell";
    no_shares: number;
    price: number;
    id: number;
}


export interface Store {
    // [key: number]: { no_shares: number, price: number };
    [key: number]: Order;
}

export interface MatchedOrder {
    buyer_id: number;
    seller_id: [number];
    no_shares: [number];
}

export const matchedStore: MatchedOrder[] = [];

const store: Store = {};

function initializeStore() {
    store[0] = { order_type: 'buy', no_shares: 300, price: 102.5, id: 253 };
    store[1] = { order_type: 'sell', no_shares: 200, price: 101.75, id: 254 };
    store[2] = { order_type: 'buy', no_shares: 150, price: 101.8, id: 255 };
    store[3] = { order_type: 'sell', no_shares: 300, price: 102.0, id: 256 };
    store[4] = { order_type: 'buy', no_shares: 50, price: 102.3, id: 257 };
}

initializeStore();

export default store;