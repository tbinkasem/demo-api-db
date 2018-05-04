const express = require('express')
const router = express.Router()

module.exports = router

router.post('/login', async (req, res) => {
  // 1. check require
  if (!req.body.user || !req.body.pass) {
    return res.send({
      message: 'กรุณาตรวจสอบชื่อผู้ใช้งานและรหัสผ่าน',
      status: 'fail',
    })
  }
  let db = req.db
  // 2. check user
  let user = await db('user').where({
    username: req.body.user,
    status: 'active',
  }).then(rows => rows.length && rows[0])
  
  if (!user) {
    return res.send({
      message: 'กรุณาตรวจสอบชื่อผู้ใช้งานและรหัสผ่าน',
      status: 'fail',
    })
  }
  // TODO: 3. check pass


  // TODO: 4. $_SESSION['user'] = $result;
  req.session.data = user
  req.session.touch()
  res.send({
    'message':  'เข้าสู่ระบบสำเร็จ',
    'status': 'success',
  })
})
