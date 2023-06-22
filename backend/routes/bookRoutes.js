import express from 'express';



const router = express.Router();

router.post('/books', booklist);
router.post('/auth', isbn);
router.post('/logout', author);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;