import express, { Express, Request, Response } from 'express';
import store, { Store, Order, matchedStore } from './store';
import { matching } from './matching';


const app: Express = express();
const port = 3000;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.post('/order', (req: Request, res: Response) => {

    console.log('Received a POST request');
    console.log(req.body);

    //get the body of the request
    const { order_type, no_shares, price } = req.body;

    if (!no_shares || !price || typeof no_shares !== 'number' || typeof price !== 'number') {
        console.log('typeof order.no_shares:', typeof no_shares);
        console.log('Invalid order format');
        res.status(400).send('Invalid order format');
        return;
    }

    else {

        const itemCount = Object.keys(store).length;
        console.log('itemCount:', itemCount);

        const order_id = itemCount;
        const randomId = Math.floor(Math.random() * 1000);
        // store[order_id] = { no_shares: no_shares as number, price: price as number };
        store[order_id] = { order_type: order_type as "buy" | "sell", no_shares: no_shares as number, price: price as number, id: randomId };

        res.json({ message: 'Order created', order_id });
    }

});

app.get('/book', (req: Request, res: Response) => {
    res.json(store);
});

app.post('/match', (req: Request, res: Response) => {
    console.log('Received a POST request to match orders');

    matching(store);
    console.log('Matched orders:', matchedStore);
    res.json(matchedStore);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});