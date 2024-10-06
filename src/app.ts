import express, { Express, Request, Response } from 'express';
import store from './store';


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
    const { no_shares, price } = req.body;

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
        store[order_id] = { no_shares: no_shares as number, price: price as number };

        res.json({ message: 'Order created', order_id });
    }

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});