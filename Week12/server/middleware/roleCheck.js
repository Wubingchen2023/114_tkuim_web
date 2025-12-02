// 角色權限檢查中介層
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: '請先登入'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `角色 '${req.user.role}' 無權執行此操作`
      });
    }

    next();
  };
};

// 檢查是否為資料擁有者或管理員
exports.checkOwnerOrAdmin = (Model) => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          error: '找不到資料'
        });
      }

      // admin 可以操作所有資料
      if (req.user.role === 'admin') {
        return next();
      }

      // 一般使用者只能操作自己的資料
      if (resource.ownerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          error: '您無權操作此資料'
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
};
