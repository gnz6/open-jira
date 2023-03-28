import mongoose from "mongoose";

// Status Connections 
// 0 - Disconnected
// 1 - Connected
// 2 - Connecting

const mongoConnection = {
    isConnected : 0 
}

export const connect = async() => {
    if (mongoConnection.isConnected ){
        console.log("Connecting");
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if(mongoConnection.isConnected === 1 ){
            console.log("Using previous connection");
        }
        await disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || "");
    mongoConnection.isConnected = 1;
    console.log("Connected to MongoDB")
}

export const disconnect = async() => {

    if(process.env.NODE_ENV === "development") return;

    if(mongoConnection.isConnected !== 0) return;
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
}