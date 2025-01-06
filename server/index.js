const express =require('express')
const mongoose =require("mongoose")
const cors =require('cors')
const UserModel =require('./models/users')
const app= express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://vijaydurairaj2005:vijay2005@cluster0.x5jay.mongodb.net/Library')

app.get("/", async (req, res) => {
    try {
      const users = await UserModel.find({});
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

app.post("/createUser",(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))

})
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    UserModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => res.status(500).json({ message: 'Server Error', error: err }));
});
app.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    UserModel.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(err => res.status(500).json({ message: 'Error updating user', error: err }));
});
// DELETE user by ID
app.delete("/deleteuser/:id", (req, res) => {
    const { id } = req.params;

    UserModel.findByIdAndDelete(id)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully', user: deletedUser });
        })
        .catch(err => res.status(500).json({ message: 'Error deleting user', error: err }));
});



app.listen(3000,()=>{
    console.log('server is running {port}')
})