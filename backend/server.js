import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import { books } from './books.js';
import asyncHandler from 'express-async-handler';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

// ---------booksapi----------//
app.get('/api/books', (async(req,res)=>{
res.send(books)
}));
// ---------getbook based on isbn----------//
app.get('/api/books/isbn/:isbn', asyncHandler (async(req,res)=>{
  const {isbn} = req.params
const basededOnIsbn = await books.find((item)=>item.isbn ==isbn)
res.json(basededOnIsbn)
}));

// ---------getbook based on author----------//
app.get('/api/books/author/:author', (req,res)=>{
  const {author} = req.params
const basededOnAuthor = books.find((item)=>item.author ==author)
res.json(basededOnAuthor)
});
// ---------getbook based on id----------//
app.get('/api/books/id/:id', (req,res)=>{
  
  const {id} = req.params
const basededOnId = books.find((item)=>item.id ==id)
res.json(basededOnId)
});
// ---------getbook based on title----------//
app.get('/api/books/title/:title', (req,res)=>{
  const {title} = req.params
const basededOnTitle = books.find((item)=>item.title ==title)
res.json(basededOnTitle)
});
// ---------getbook based on review----------//
app.get('/api/books/review/:review', (req,res)=>{
  const {review} = req.params
const basededOnReview = books.find((item)=>item.review ==review)
res.json(basededOnReview)
});
// ---------changereview----------//
app.put('/api/books/id/:id',asyncHandler (async(req,res)=>{
  const {id} = req.params
const updateReview = books.find((item)=>item.id ==id)

  if (updateReview) {
    updateReview.review = req.body.review || updateReview.review;
    console.log(updateReview.review)

    res.json("Review updated successfully");
  } else {
    res.status(404);
    throw new Error('book not found');
  }
}));
// ---------deletereview----------//
app.delete('/api/books/id/:id',asyncHandler (async(req,res)=>{
  const {id} = req.params
const deleteReview = books.find((item)=>item.id ==id)

  if (deleteReview) {
    deleteReview.review = req.body.review || deleteReview.review;
    console.log(deleteReview.review)

    res.json("Review deleted successfully");
  } else {
    res.status(404);
    throw new Error('book not found');
  }
}));


if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
