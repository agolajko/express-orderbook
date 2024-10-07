import express, { Express, Request, Response } from 'express';
import store, { Store, Order, isValidOrder, matchedStore } from './store';
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

    // randomId for the order
    const id: number = Math.floor(Math.random() * 1000);

    // create instance of Order
    const order = { order_type, no_shares, price, id } as Order;

    // validate the order
    if (!isValidOrder(order)) {
        console.log('Invalid order format');
        res.status(400).send('Invalid order format!');
        return;
    }

    else {

        const itemCount = Object.keys(store).length;
        console.log('itemCount:', itemCount);

        const order_id = itemCount;
        store[order_id] = order;
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