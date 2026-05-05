const mongoose = require('mongoose');
const express = require('express');

app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/student')
.then(()=>{
    console.log("Database Connected! Database: student")
})
.catch(error=>{
    console.log("Error Connecting DB: ",error);
    
});


const schema = new mongoose.Schema({
    Name:String,
    Roll_no:Number,
    WAD_Marks:Number,
    CC_Marks:Number,
    DSBDA_Marks:Number,
    CNS_Marks:Number,
    AI_Marks:Number,
    Maths_Marks:Number,
    Science_Marks:Number
});

const Student = mongoose.model('studentmark',schema);

const insertInitialData = async () => {
    try{
        const count = await Student.countDocuments();

        if(count === 0){
            const defaultStudents = [
                {
                    Name:"Sarthak",
                    Roll_no:1,
                    WAD_Marks:30,
                    CC_Marks:30,
                    DSBDA_Marks:30,
                    CNS_Marks:30,
                    AI_Marks:30,
                    Maths_Marks:30,
                    Science_Marks:30
                },
                {
                    Name:"Sawanee",
                    Roll_no:2,
                    WAD_Marks:35,
                    CC_Marks:35,
                    DSBDA_Marks:35,
                    CNS_Marks:35,
                    AI_Marks:35,
                    Maths_Marks:35,
                    Science_Marks:35
                },
                {
                    Name:"Vedant",
                    Roll_no:3,
                    WAD_Marks:45,
                    CC_Marks:45,
                    DSBDA_Marks:45,
                    CNS_Marks:45,
                    AI_Marks:45,
                    Maths_Marks:45,
                    Science_Marks:45
                },
                {
                    Name:"Sagar",
                    Roll_no:4,
                    WAD_Marks:35,
                    CC_Marks:30,
                    DSBDA_Marks:40,
                    CNS_Marks:34,
                    AI_Marks:45,
                    Maths_Marks:20,
                    Science_Marks:20
                },
                {
                    Name:"Sanavi",
                    Roll_no:5,
                    WAD_Marks:36,
                    CC_Marks:55,
                    DSBDA_Marks:55,
                    CNS_Marks:32,
                    AI_Marks:20,
                    Maths_Marks:30,
                    Science_Marks:35
                },
                {
                    Name:"Jyot",
                    Roll_no:6,
                    WAD_Marks:20,
                    CC_Marks:20,
                    DSBDA_Marks:20,
                    CNS_Marks:20,
                    AI_Marks:20,
                    Maths_Marks:50,
                    Science_Marks:30
                }
            ];

            await Student.insertMany(defaultStudents);
            console.log("Default Students added!!");
        }

    }catch(error){
        console.log("Error in inserting data: ",error);
        
    }
};

insertInitialData();

app.get('/task-d',async (req,res)=>{
    const count = await Student.countDocuments();
    const data = await Student.find();

    res.json({Count: count,Data:data});
});

app.get('/task-e',async(req,res)=>{
    const studs = await Student.find({DSBDA_Marks:{$gt : 20}});
    res.json(studs);
});

app.get('/update/:name', async (req,res)=>{
    const targetStudent = req.params.name;
    await Student.updateOne(
        {Name:targetStudent},
        {$inc: {WAD_Marks:10,
                    CC_Marks:10,
                    DSBDA_Marks:10,
                    CNS_Marks:10,
                    AI_Marks:10,
                    Maths_Marks:10,
                    Science_Marks:10}}
    );

    res.send('Updation Successful! verify at http://localhost:3000/task-d')
});

app.get('/task-g',async(req,res)=>{
    const studs = await Student.find({
        WAD_Marks:{$gt:25},
        CC_Marks:{$gt:25},
        DSBDA_Marks:{$gt:25},
        CNS_Marks:{$gt:25},
        AI_Marks:{$gt:25},
        Maths_Marks:{$gt:25},
        Science_Marks:{$gt:25}

    });

    res.json(studs);
});

app.get('/task-h',async(req,res)=>{
    const studs = await Student.find({
        Maths_Marks:{$lt:40},
        Science_Marks:{$lt:40}
    });

    res.json(studs);
});


app.get('/remove/:name',async(req,res)=>{
    const targetStudent = req.params.name;
    await Student.deleteOne({Name:targetStudent});
    res.send('Deletion Successful! verify at http://localhost:3000/task-d')
});

app.get('/task-j',async (req,res)=>{
    let html = `
         <h2>Student Marks Table</h2>
    <table border="1" cellpadding="10" style="border-collapse: collapse;">
        <tr style="background-color: #f2f2f2">
            <th>Name</th>
            <th>Roll No</th>
            <th>WAD</th>
            <th>CC</th>
            <th>DSBDA</th>
            <th>CNS</th>
            <th>AL</th>
            <th>Maths</th>
            <th>Science</th>
        </tr>
        
        
    `;

    let data = await Student.find();

    // Name:String,
    // Roll_no:Number,
    // WAD_Marks:Number,
    // CC_Marks:Number,
    // DSBDA_Marks:Number,
    // CNS_Marks:Number,
    // AI_Marks:Number,
    // Maths_Marks:Number,
    // Science_Marks:Number

    data.forEach(element => {
        html+=`
            <tr>
                <td>${element.Name || '-'}</td>
                <td>${element.Roll_no || '-'}</td>
                <td>${element.WAD_Marks || '-'}</td>
                <td>${element.CC_Marks || '-'}</td>
                <td>${element.DSBDA_Marks || '-'}</td>
                <td>${element.CNS_Marks || '-'}</td>
                <td>${element.AI_Marks || '-'}</td>
                <td>${element.Maths_Marks || '-'}</td>
                <td>${element.Science_Marks || '-'}</td>
                
            </tr>
        `
    });

    html+= `</table>`;

    res.send(html);


})




app.listen(3000,()=>{
    console.log("Server Started at http://localhost:3000");
    
});









