import mongoose from 'mongoose';

const Connection=async(username,password)=>{
    const URL=`mongodb://${username}:${password}@ac-ygas7i1-shard-00-00.datmw20.mongodb.net:27017,ac-ygas7i1-shard-00-01.datmw20.mongodb.net:27017,ac-ygas7i1-shard-00-02.datmw20.mongodb.net:27017/?ssl=true&replicaSet=atlas-cor1yb-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL,{useNewUrlParser:true})
            console.log('Database connected successfully');
    }
    catch(error){
        console.log(error);
    }

}
export default Connection;