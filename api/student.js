const express = require('express')
const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  let db = req.db
  db('student as s')
    .join('province as p', 'p.province_id', 's.province_id')
    .join('province as p', function() {
      this.on('p.province_id', '=', 's.province_id')
    })
    .where('s.gender', '=', 'F')
    .where(db.raw('upper(s.gender)'), '=', 'F')
    .where({
      's.citizen_id': req.query.id,
      'upper(s.gender)': 'F',
    })
    .orderBy('id', 'asc')
    .select(['s.*', 'p.province_name'])
    .then(rows => {
      res.send({
        status: true,
        data: rows,
      })
    }).catch(error => {
      console.log('ERROR1', error)
      res.send({
        status: false,
        error: 'เกิดข้อผิดพลาด',
      })
    })
})
//   /student/save
router.post('/save', async (req, res) => {
  let db = req.db

  let list = []
  for (let i = 0; i < 5; i++) {
    list.push({province_code: 'code' + i, province_name: 'name' + i, zone_id: 0})
  }
  try {
    let ids = await db('province').insert(list, 'id')
    res.send({
      status: true,
    })
    console.log('ids=', ids)
  } catch (error) {
    res.send({
      status: false,
      error: 'เกิดข้อผิดพลาด',
    })
  }
})

router.delete('/:id', function (req, res) {
  req.db('student').where({id: req.params.id}).delete().then(() =>{
    res.send({status: true})
  }).catch(e => res.send({status: false, error: e.message}))
})
router.post('/save2', (req, res) => {
  let db = req.db  
  db('t1').insert({}).then(ids => {
    let id = ids[0]
    Promise.all([
      db('t2').insert({}).catch(),
      db('t3').insert({}).catch(),
    ]).then(() => {
      res.send({status: true})
    }).catch(err => {
      res.send({status: false})
    })    
  })
  console.log('ok')
})
router.get('/save3', async (req, res) => {
  try {
    let db = req.db  
    let ids = await db('t1').insert({})
    await Promise.all([
      db('t2').insert({}),
      db('t3').insert({})
    ])
    res.send({status: true})
  } catch (e) {
    res.send({status: false})
  }
})
router.get('/about', function (req, res) {
  res.send('About birds')
})

