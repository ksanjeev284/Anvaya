import express from 'express';
import { D1Database } from '@cloudflare/d1';

const router = express.Router();

// Initialize your D1 database connection
const db = new D1Database('anvaya-db');

const testKeywordInDatabase = async (keyword) => {
  // Query the database to check if the keyword exists
  const result = await db.query('SELECT * FROM keywords WHERE keyword = ?', [keyword]);
  
  if (result.length > 0) {
    return { success: true, message: `Keyword "${keyword}" found in database.` };
  } else {
    return { success: false, message: `Keyword "${keyword}" not found in database.` };
  }
};

router.get('/test-keyword', async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ success: false, message: 'Keyword is required.' });
  }

  try {
    const result = await testKeywordInDatabase(keyword);
    res.json(result);
  } catch (error) {
    console.error('Error testing keyword:', error);
    res.status(500).json({ success: false, message: 'Error testing keyword.' });
  }
});

export default router; 