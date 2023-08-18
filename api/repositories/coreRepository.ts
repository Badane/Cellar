import db from "../firebaseConfig.js";

export default class Repo {

    collection:string

    constructor(collection:string){
        this.collection = collection;
    }

    getAll = async function(): Promise<Array<Object>> {
        return await db.search(this.collection).end();
    }

    create = async function(data:Object): Promise<any>{
        const id = crypto.randomUUID();
        return await db.create(this.collection, data).identifier(id).end();
    }
}