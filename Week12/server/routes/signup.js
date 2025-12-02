const express = require('express');
const Participant = require('../models/Participant');
const { protect } = require('../middleware/auth');
const { authorize, checkOwnerOrAdmin } = require('../middleware/roleCheck');
const { logAction } = require('../utils/logger');  // 加分項目
const router = express.Router();

// GET /api/signup - 查詢報名清單（需登入）
router.get('/', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    
    // 學生只能看自己的資料，admin 可看全部
    if (req.user.role === 'student') {
      query.ownerId = req.user._id;
    }

    const participants = await Participant.find(query)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    const total = await Participant.countDocuments(query);

    // 記錄操作（加分項目）
    await logAction(req.user._id, 'VIEW_PARTICIPANTS', { total });

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: participants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/signup - 建立報名（需登入）
router.post('/', protect, async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    // 檢查 Email 是否已報名
    const existing = await Participant.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: '此 Email 已報名過'
      });
    }

    // 建立報名資料，記錄 ownerId
    const participant = await Participant.create({
      name,
      email,
      phone,
      status: status || 'pending',
      ownerId: req.user._id  // 記錄建立者
    });

    // 記錄操作（加分項目）
    await logAction(req.user._id, 'CREATE_PARTICIPANT', {
      participantId: participant._id,
      email: participant.email
    });

    res.status(201).json({
      success: true,
      message: '報名成功',
      data: participant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PATCH /api/signup/:id - 更新報名（擁有者或 admin）
router.patch('/:id', protect, checkOwnerOrAdmin(Participant), async (req, res) => {
  try {
    const { phone, status } = req.body;
    
    const updates = {};
    if (phone) updates.phone = phone;
    if (status) updates.status = status;

    const participant = await Participant.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    // 記錄操作（加分項目）
    await logAction(req.user._id, 'UPDATE_PARTICIPANT', {
      participantId: participant._id,
      updates
    });

    res.status(200).json({
      success: true,
      message: '更新成功',
      data: participant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/signup/:id - 刪除報名（擁有者或 admin）
router.delete('/:id', protect, checkOwnerOrAdmin(Participant), async (req, res) => {
  try {
    await Participant.findByIdAndDelete(req.params.id);

    // 記錄操作（加分項目）
    await logAction(req.user._id, 'DELETE_PARTICIPANT', {
      participantId: req.params.id
    });

    res.status(200).json({
      success: true,
      message: '刪除成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
