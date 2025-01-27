import mongoose from 'mongoose';

export async function connectDB() {
    try{
        await mongoose.connect(
        'mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js', {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Conexión exitosa a MongoDB');
        

    } catch (error) {
        console.log('Error al conectar a MongoDB:', error);

        process.exit(1);
        
    }
}