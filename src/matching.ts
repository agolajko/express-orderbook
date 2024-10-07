import store, { Store, MatchedOrder, matchedStore } from './store';


export function matching(store: Store) {

    // get all buy orders
    const buyOrders = Object.values(store).filter(order => order.order_type === 'buy');

    // get all sell orders
    const sellOrders = Object.values(store).filter(order => order.order_type === 'sell');

    // sort buy orders by price in descending order
    buyOrders.sort((a, b) => b.price - a.price);
    console.log('buyOrders:', buyOrders);

    // sort sell orders by price in ascending order
    sellOrders.sort((a, b) => a.price - b.price);
    console.log('sellOrders:', sellOrders);

    // loop through buy orders and match with sell orders
    for (let buyOrder of buyOrders) {
        console.log('buyOrder:', buyOrder);
        for (let sellOrder of sellOrders) {
            console.log('sellOrder:', sellOrder);
            if (buyOrder.price >= sellOrder.price) {
                const no_shares = Math.min(buyOrder.no_shares, sellOrder.no_shares);

                if (no_shares > 0) {
                    console.log(`Matched order: buy ${no_shares} shares at $${sellOrder.price}`);
                    matchedStore.push({ buyer_id: buyOrder.id, seller_id: [sellOrder.id], no_shares: [no_shares] });
                    buyOrder.no_shares -= no_shares;
                    sellOrder.no_shares -= no_shares;
                }
                else if (no_shares === 0) {
                    console.log('Not enough shares to match');
                }
                else if (no_shares < 0) {
                    console.log('Something went wrong');
                }
            }
        }
        console.log('Matched orders:', matchedStore);
    }
}