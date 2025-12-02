import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as participantRepo from '../repositories/participants.js';

const router = express.Router();

// 所有路由都需要登入
router.use(authMiddleware);

// GET：查詢報名資料（學生只能看自己的，admin 可看全部）
router.get('/', async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const data = isAdmin 
      ? await participantRepo.findAll()
      : await participantRepo.findByOwner(req.user.id);

    res.json({
      total: data.length,
      data: data.map(p => p.toJSON())
    });

  } catch (error) {
    console.error('查詢失敗:', error);
    res.status(500).json({ error: '查詢失敗' });
  }
});

// POST：建立報名（記錄 ownerId）
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ 
        error: '缺少必填欄位',
        message: '姓名、Email 和電話為必填' 
      });
    }

    const participant = await participantRepo.create({
      name,
      email,
      phone,
      status: status || 'pending',
      ownerId: req.user.id  // 紀錄建立者
    });

    res.status(201).json({
      message: '報名成功',
      data: participant.toJSON()
    });

  } catch (error) {
    console.error('建立失敗:', error);
    res.status(500).json({ error: '建立失敗' });
  }
});

// PATCH：更新報名資料（只能更新自己的或 admin 可更新全部）
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await participantRepo.findById(id);

    if (!participant) {
      return res.status(404).json({ error: '找不到此報名資料' });
    }

    // 權限檢查：只有資料擁有者或 admin 可以更新
    const isOwner = participant.ownerId?.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ 
        error: '權限不足',
        message: '您只能更新自己的報名資料' 
      });
    }

    const { phone, status } = req.body;
    const updates = {};
    if (phone) updates.phone = phone;
    if (status) updates.status = status;

    const updated = await participantRepo.updateById(id, updates);

    res.json({
      message: '更新成功',
      data: updated.toJSON()
    });

  } catch (error) {
    console.error('更新失敗:', error);
    res.status(500).json({ error: '更新失敗' });
  }
});

// DELETE：刪除報名（只能刪除自己的或 admin 可刪除全部）
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await participantRepo.findById(id);

    if (!participant) {
      return res.status(404).json({ error: '找不到此報名資料' });
    }

    // 權限檢查
    const isOwner = participant.ownerId?.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ 
        error: '權限不足',
        message: '您只能刪除自己的報名資料' 
      });
    }

    await participantRepo.deleteById(id);

    res.json({ message: '刪除成功' });

  } catch (error) {
    console.error('刪除失敗:', error);
    res.status(500).json({ error: '刪除失敗' });
  }
});

export default router;
