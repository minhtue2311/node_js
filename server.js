
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json()); // Cho phép đọc JSON từ body request

let users = [
    { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com" },
    { id: 2, name: "Trần Thị B", email: "b@gmail.com" }
];

//Get Method
app.get("/users", (req, res) => {
    res.json(users);
});

//Post Method
app.post("/users/:id", (req,res)=>{
    const userId = parseInt(req.params.id)
    const index = users.findIndex(user => user.id == userId);
    if(index == -1) return res.status(404).json({message : "User không tồn tại"});
    users[index] = {...users[index], ...req.body}
    res.json(users[index]);
})

//Put Method
app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);

    if (index === -1) return res.status(404).json({ message: "User không tồn tại" });

    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
});

//Delete Method
app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json({ message: "User đã bị xóa" });
});

app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});

