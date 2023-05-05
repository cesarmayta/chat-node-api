const MysqlLib = require('../lib/mysql')

class MessageService{

    constructor(){
        this.db = new MysqlLib()
        this.table_name = "message"
    }

    async getByChatId(chatId){
        const sqlGetByChatId =  `select id,
                             message,sender_id
                             from ${this.table_name} where
                             chats_id = ${chatId}`
        const result = await this.db.querySql(sqlGetByChatId)
        return result
    }

    async create({data}){
        const sqlCreate = `insert into ${this.table_name}
                           (message,chats_id,sender_id) 
                           values('${data.message}','${data.chats_id}',
                           '${data.sender_id}')`
        
        await this.db.querySql(sqlCreate);
        const sqlLast = `select id,message,chats_id,sender_id
                        from ${this.table_name} order by id desc limit 1`
        const result = await this.db.querySql(sqlLast)
        return result
    }
}

module.exports = MessageService