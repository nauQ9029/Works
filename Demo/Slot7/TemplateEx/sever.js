// khởi tạo thư viện trong nodejs express
const express = require("express");
const app= express();
const file = require("fs");
const bodyparser = require("body-parser");

//khai báo một middleware
app.use(bodyparser.urlencoded({extended:true}));
// khai báo port chưa có ứng dụng nào sử dụng
const port = 3003;
    app.set("view engine","ejs");
    app.set("views",__dirname+"/views");
    const students =[
        {code:1, name: "fu", gender:true},
        {code:2, name: "tam", gender:false}
    ]

    app.get("/", (req, res)=>{
        res.render("list",{students}); 
    })
   
    app.get("/create",(req,res)=>{
        res.render("create");
    })

    app.post("/create",(req, res)=>{
        console.log(req.body);
        let {code, name, gender} = req.body;
        code = +code;
        let genderTemp= false;
        if(gender==1){
            genderTemp = true;
        }
        students.push({code, name, gender:genderTemp});
        res.redirect("/");
    })

    app.get("/update",(req, res)=>{
        res.render("update");
    })
    
    //sử dụng param
    app.get("/detail/:code",(req, res)=>{
        const code = req.params.code;
        const student = students.find(student=>student.code==code);
        res.render("detail", {student});
    })

    //sử dụng Query String
    app.get("/search",(req, res)=>{
        const nameSearch= req.query.nameSearch;
        const result = students.filter(student => student.name.toLowerCase().includes(nameSearch.toLowerCase()));
        res.render("list",{students:result});
    })

    app.get("*",(req, res)=>{
        res.render("notfound");
    })
    
app.listen(port, () => {
    console.log('server đang chạy!');

})