var express = require('express');
var router = express.Router();
var Worker = require('../models/Worker');



router.get('/',(req,res)=>{
    Worker.find((err, workerList) =>{
        if (err){res.send(err)}
        else{res.send(workerList)}
    })

})
router.post('/',(req,res)=>{
    const worker = new Worker({
        worker_name : req.body.name,
        worker_address : req.body.address,
        worker_id : req.body.id,
        worker_password : req.body.password,
        worker_mobile:req.body.mobile
    })
    worker.save((err) =>{
        if (err) {res.send(err)}
        else res.send ('Successfully saved a new worker in local MongoDB!')
    })

})
router.delete('/',(req,res)=>{
    Worker.deleteMany((err) =>{
        if (err) {res.send(err)}
        else {res.send('Successfully deleted all workers!')}
    })
})

router.get('/:id',(req,res)=>{
    Worker.findOne({worker_id: req.params.id}, (err, foundWorker)=>{
        if (foundWorker) (res.send(foundWorker))
        else res.send("No Matched Worker Found!")
    })
})

router.put('/:id',(req,res)=>{
    Worker.update(
        {worker_id: req.params.id},
        {$set:{worker_password: req.body.password}},
        {overwrite:true}, 
        (err)=>{
            if (err) {res.send(err)}
            else {res.send('Successfully updated!')}
        }
    )
})

router.patch('/:id',(req,res)=>{
    Worker.update(
        {worker_id: req.params.id},
        {$set: {worker_address: req.body.address, worker_mobile: req.body.mobile}},
        {overwrite:true}, 
        (err)=>{
            if (!err) {res.send('Successfully updated! (usually used in address and telephone)')}
            else res.send(err)
        }
    )
})


module.exports = router;