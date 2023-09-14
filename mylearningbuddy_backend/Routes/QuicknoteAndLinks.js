const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/addquicknote', async (req, res) => {
   console.log(req.body);
   try {
      const myUser = await User.findOne({ authorizeToken: req.body.authToken });
      const myObj = {
         quicknotemodifiedDate: req.body.dateandtimeadded,
         quicknote: req.body.quicknote,
         quicknoteTag: req.body.quicktag,
      };
      myUser.quickNotes.push(myObj);
      await myUser.save();
      res.json({success: true});

   } catch (error) {
      console.log("Error while saving quick note in the backend--", error);
      res.json({success: false});
   }
})


router.post("/addlinks", async (req, res)=>{
   try {
      const myUser = await User.findOne({ authorizeToken: req.body.authToken });
      const myObj = {
         link: req.body.link,
         linkmodifiedDate: req.body.dateandtimeadded,
         linkDesc: req.body.linkdesc
      };
      myUser.links.push(myObj);
      await myUser.save();
      res.send({success: true});
   } catch (error) {
      console.log("Errir while saving the link in the backend---", error);
      res.send({success: false});
   }
})

router.delete("/delete/link", async (req, res)=>{
   try {
      const myUser = await User.findOne({ authorizeToken: req.body.authToken });
      myUser.links.remove({_id: req.body.lnID})
      await myUser.save();
      res.send({success: true});
   } catch (error) {
      console.log("Error while deleting the link in the backend---", error);
      res.send({success: false});
   }
});


router.delete("/delete/quick-note", async (req, res)=>{
   try {
      const myUser = await User.findOne({ authorizeToken: req.body.authToken });
      myUser.quickNotes.remove({_id: req.body.qnID})
      await myUser.save();
      res.send({success: true});
   } catch (error) {
      console.log("Error while deleting the quick note in the backend---", error);
      res.send({success: false});
   }
});

router.put("/edit/link", async(req, res)=>{
   try {
      const {newData} = req.body;
      const myUser = await User.findOne({ authorizeToken: req.body.authToken });
      const myLink = myUser.links.find(item => item._id == req.body.lnID);
      myLink.link = newData.link;
      myLink.linkDesc = newData.linkcontext;
      await myUser.save();
      res.send({success: true});
   } catch (error) {
      console.log("Link editing failed in the backend---", error);
      res.send({success: false});
   }
});

router.put("/edit/quick-note", async(req, res)=>{
   try {
      const {newData} = req.body;
      const myUser = await User.findOne({ authorizeToken: req.body.authToken });
      const myQN = myUser.quickNotes.find(item => item._id == req.body.qnID);
      myQN.quicknote = newData.quicknote;
      myQN.quicknoteTag = newData.quicktag;

      await myUser.save();
      res.send({success: true});

   } catch (error) {
      console.log("Quick note editing failed in the backend---", error);
      res.send({success: false});
   }
});


module.exports = router;