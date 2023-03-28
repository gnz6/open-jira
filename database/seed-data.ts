import { Entry } from '../interfaces/entry';

interface SeedData {
    entries : seedEntry[]
}



interface seedEntry{
    description: string,
    status: string,
    createdAt : number
}


export const seedData : SeedData = {
    entries : [
        {
            description: "asdasd",
            status: "pending",
            createdAt : Date.now()
        },
        {
            description: "qweqweqwe",
            status: "completed",
            createdAt : Date.now()-100000
        },
        {
            description: "zxczxc",
            status: "in-progress",
            createdAt : Date.now() -100000000
        }
    ]
}