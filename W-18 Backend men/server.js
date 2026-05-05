const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/music')
.then(()=>{
    console.log("MongoDB Connected - Database: music");
})
.catch(error => {
    console.log("MongoDB COnnection Error",error);
})

const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_Director: String,
    Singer: String,
    Actor: String,
    Actress: String
});

const Song = mongoose.model('songdetail', songSchema);



const insertInitialData = async () => {
    try{
        const count = await Song.countDocuments();

        if(count === 0){
            const defaultSongs =[
                {Songname: "Song-1",Film: "Film-1",Music_Director: "MD-1",Singer: "Singer-1"},
                {Songname: "Song-2",Film: "Film-2",Music_Director: "MD-2",Singer: "Singer-2"},
                {Songname: "Song-3",Film: "Film-3",Music_Director: "MD-3",Singer: "Singer-3"},
                {Songname: "Song-4",Film: "Film-4",Music_Director: "MD-4",Singer: "Singer-4"},
                {Songname: "Song-5",Film: "Film-5",Music_Director: "MD-5",Singer: "Singer-5"}
            ];

            await Song.insertMany(defaultSongs);
            console.log("default songs added");
            
        }
        
    }catch(err){
        console.log("Error inserting data: ",err);
    }
};

insertInitialData();

app.get('/task-d',async (req,res) => {
    const count = await Song.countDocuments();
    const songs = await Song.find();
    res.json({Total_songs: count, Data: songs})
});

app.get('/task-e',async(req,res)=>{
    const songsbyMD1 = await Song.find({Music_Director:"MD-1"});
    res.json(songsbyMD1);
})

app.get('/task-f',async(req,res)=>{
    const output = await Song.find({Music_Director:"MD-1",Singer:"Singer-1"});
    res.json(output);
})

app.get('/task-g',async(req,res)=>{
    await Song.deleteOne({Songname: "Song-5"});
    res.send("Song deleted, verify at http://localhost:3000/task-d")
})

app.get('/task-h',async (req,res)=>{
    const newSong = new Song({
        Songname: "Apna Bana Le",
        Film: "Bhediya",
        Music_Director: "Sachin-Jigar",
        Singer: "Arijit Singh"
    });
    await newSong.save();
    res.send("New Song Added successfully!!")
});

app.get('/task-i',async(req,res)=>{
    const songs = await Song.find({Film: "Bhediya",Singer: "Arijit Singh"});
    res.json(songs);
})

app.get('/task-j',async(req,res)=>{
    await Song.updateOne(
        {Songname: "Apna Bana Le"},
        {$set:{Actor:"Varun Dhawan",Actress:"Kriti Sanon"}}
    
    );
    res.send("Actor and Actress added!")
});

app.get('/task-k',async(req,res)=>{
    const songs = await Song.find();

    let html = `
        <h2 style="color: blue;">Music Database</h2>
        <table border="1" cellpadding="10" style="border-collapse: collapse;">
            <tr style="background-color: #f2f2f2;">
                <th>Song Name</th>
                <th>Film</th>
                <th>Music Director</th>
                <th>Singer</th>
                <th>Actor</th>
                <th>Actress</th>
            </tr>

    `;
    songs.forEach(song => {
        html+=`
            <tr>
                <td>${song.Songname || '-'}</td>
                <td>${song.Film || '-'}</td>
                <td>${song.Music_Director || '-'}</td>
                <td>${song.Singer || '-'}</td>
                <td>${song.Actor || '-'}</td>
                <td>${song.Actress || '-'}</td>
            </tr>
        
        `;

        
    });

    html+='</table>'

    res.send(html);
})






app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
});




