

const express = require('express');
const { MongoClient } = require('mongodb');  
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

const uri = 'mongodb+srv://<my_username>:<my_password>@cluster0.ngxrpuo.mongodb.net/roxiler?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
    try {
        // mongo connection
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        // db access
        const database = client.db('roxiler');
        const transactionsCollection = database.collection('oa');

        
        return transactionsCollection;  
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}


app.get('/api/transactions', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10; // Default to 10 items per page

    try {
        const transactionsCollection = await connectDB();
        const transactions = await transactionsCollection
            .find({})
            .skip((page - 1) * itemsPerPage) 
            .limit(itemsPerPage) 
            .toArray();

        const totalItems = await transactionsCollection.countDocuments(); // Get total item count for pagination
        res.json({
            transactions,
            totalPages: Math.ceil(totalItems / itemsPerPage), // Calculate total pages
            currentPage: page,
            totalItems: totalItems
        });
    } catch (error) {
        res.status(500).send('Error fetching transactions');
    }
});

// basic 
app.get('/',(req,res)=>{
    res.send("Hello there!!!")
})

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
