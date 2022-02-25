const db=require('../db/models');
const order=db.order;

exports.findAll=(req,resp)=>{
    order.findAll()
        .then(data=>resp.json(data))
        .catch(err=>{
            resp.status(500)
                .send({message:err.message||
                `Something went wrong`})
        });
};

// 2. seelct * from orders where id=?=>findByPK

exports.findByPk=(req,resp)=>{
    const id=parseInt(req.params.id);
    order.findByPk(id)
        .then(data=>resp.json(data))
        .catch(err=>{
            resp.status(500)
                .send({message:err.message||
                `Something went wrong`})
        });
};

//3. insert into users(firstName, lastName,createdAt, updatedAt)
exports.createOrder=(req,resp)=>{
    if(!req.body.username){
        resp.status(400)
            .send({message:"Order Id Name must be provided"});
        }
    
        const newOrder={
            customername:req.body.customername,
            customerphone:req.body.customerphone,
            grandtotal:req.body.grandtotal,
            orderstatus:req.body.orderstatus,
            createdAt:new Date(),
            updatedAt:new Date()
        }
        order.create(newOrder)
            .then(data=>resp.send(data))
            .catch(err=>{
                resp.status(500)
                    .send({message:err.message || `Cannot insert value in Order table`})
            })
    };
    
    //4. update users set firstName=?, lastName=?, ccreatedAt=?, updatedAt=?
    //where id=? =>update()
    exports.updateOrder=(req,resp)=>{
        const c_id = parseInt(req.params.id);
    
        order.update(req.body,{where:{id:c_id}})
            .then(num=>{
                if(num>1){
                    resp.send({message: `Order with id ${id} updated succeessfully.`})
                }
                else{
                    resp.send({message:`Cannot update Order with id=${id}. May be Order was not found or req.body is empty!`})
                }
            })
            .catch(err=>{
                resp.status(500)
                    .send({message:err.message})
            })
    };
    
    //5. Delete users where id=?=>delete()
    exports.delete=(req,resp)=>{
        const c_id = parseInt(req.params.id);
        order.destroy({where:{id:c_id}})
        .then(num=>{
            if(num==1){
                resp.send({message: `Order with id ${id} deleted succeessfully.`})
            }
            else{
                resp.send({message:`Cannot delete Order with id=${id}. May be Order was not found or req.body is empty!`})
            }
        })
        .catch(err=>{
            resp.status(500)
                .send({message:err.message || "Could not delete Order with id=" + id})
        })
    }
