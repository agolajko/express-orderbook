import store, { Store, MatchedOrder, matchedStore } from './store';


export function matching(store: Store) {

    // get all buy orders
    const buyOrders = Object.values(store).filter(order => order.order_type === 'buy');
    console.log('buyOrders:', buyOrders);

    // get all sell orders
    const sellOrders = Object.values(store).filter(order => order.order_type === 'sell');
    console.log('sellOrders:', sellOrders);

    // sort buy orders by price in descending order
    buyOrders.sort((a, b) => b.price - a.price);

    // sort sell orders by price in ascending order
    sellOrders.sort((a, b) => a.price - b.price);

    // loop through buy orders and match with sell orders
    for (let buyOrder of buyOrders) {
        for (let sellOrder of sellOrders) {
            if (buyOrder.price >= sellOrder.price) {
                const no_shares = Math.min(buyOrder.no_shares, sellOrder.no_shares);
                console.log(`Matched order: buy ${no_shares} shares at $${sellOrder.price}`);
                matchedStore.push({ buyer_id: buyOrder.id, seller_id: sellOrder.id, no_shares: [no_shares] });
                buyOrder.no_shares -= no_shares;
                sellOrder.no_shares -= no_shares;
                if (buyOrder.no_shares === 0) {
                    break;
                }
            }
        }
    }
    console.log('Matched orders:', matchedStore);
}