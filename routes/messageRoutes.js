const express = require('express');
const MessageController = require('../controllers/MessageController');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');
const Message = require('../models/Message');

const socketapi = require('../socketapi');

// Send message
router.post('/', async function (req, res, next) {
  let io = socketapi.io;
    try{
        let message = new Message(req.body);
    
        let group_id = message.group;
        console.log('group_id: ' + group_id)
    
        let group = await Group.findById(group_id).exec();
        console.log('group: ' + JSON.stringify(group));
    
        let recipients = group.recipients
    
        for (let i = 0; i < recipients.length; i++) {
          // Look up recipient/socket_id
          console.log('Attempting to find ' + recipients[i]);
          let temp_user = await User.findOne({email: recipients[i]}).exec();
          
          // Check if user found
          console.log(JSON.stringify(temp_user));
    
          if (temp_user != null) {
            // NOTIFY SOCKET
            console.log('Notifying Socket');
            try {
              await io.to(temp_user.socket_id).emit('message', message);
            } catch(error) {
              console.error(error);
            }
            console.log('Socket notified');
          }

        }
    
        let savedMessage = await message.save()
        console.log('saved');
        res.send({success: true, recipients: recipients})
      }
      catch (error){
        res.sendStatus(500);
        return console.log('error',error);
      }
      finally{
        console.log('Message Posted')
      }

});

router.post('/all', async (req, res) => {
    try {
      let username = req.body.username;
      let results = [];
  
      let groups = await Group.find({recipients: username}).exec();
  
      for (let i = 0; i < groups.length; i++) {
        let group_messages = await Message.find({group: groups[i]._id}).exec();
        results.push({group: groups[i], messages: group_messages})
      }
  
      res.send({success: true, results: results});
    }
    catch(error) {
      console.log('error')
      res.send({success: false});
    }
  
  })


module.exports = router;
