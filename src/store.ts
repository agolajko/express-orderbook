interface Store {
    [key: number]: { no_shares: number, price: number };
}

const store: Store = {};

function initializeStore() {
    store[0] = { no_shares: 100, price: 98.5 };
    store[1] = { no_shares: 200, price: 101.75 };
    store[2] = { no_shares: 150, price: 99.2 };
    store[3] = { no_shares: 300, price: 102.0 };
    store[4] = { no_shares: 50, price: 100.5 };
}

initializeStore();

export default store;