const MysqlLib = require('../lib/mysql')

class ChatService{

    constructor(){
        this.db = new MysqlLib()
        this.table_name = "chats"
    }

    async getAll(){
        const sqlAll = `select id,name
                        from ${this.table_name}`
        const result = await this.db.querySql(sqlAll)
        return result
    }

    async create({data}){
        const sqlCreate = `insert into ${this.table_name}
                           (name) 
                           values('${data.name}')`
        
        await this.db.querySql(sqlCreate);
        const sqlLast = `select id,name
                        from ${this.table_name} order by id desc limit 1`
        const result = await this.db.querySql(sqlLast)
        return result
    }

    async getById(id){
        const sqlGetById =  `select id,
                             name
                             from ${this.table_name} where
                             id = ${id}`
        const result = await this.db.querySql(sqlGetById)
        return result
    }

}

module.exports = ChatService