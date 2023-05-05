const MysqlLib = require('../lib/mysql')
const bcrypt = require('bcryptjs')

class UserService{

    constructor(){
        this.db = new MysqlLib()
    }

    async create({user}){
        const passwordEncriptado = await bcrypt.hash(user.password,10)

        const sqlCreate = `insert into users(name,
                           password)
                           values('${user.username}',
                           '${passwordEncriptado}')`
        
        await this.db.querySql(sqlCreate)

        const sqlLastInsert = `select id,name
                               from users order by id
                               desc limit 1`
        const result = await this.db.querySql(sqlLastInsert)

        return result
    }

    async authenticate({user}){
        try{
            const sqlAuth = `select id,
                             password as pwd
                             from users
                             where name = '${user.username}'`
            const result = await this.db.querySql(sqlAuth)
            if(await bcrypt.compare(user.password,result[0].pwd)){
                const usuarioFound = {
                    id:result[0].id,
                    username:user.username
                }
                return usuarioFound;
            }else{
                const usuarioNotFound = {
                    id:0,
                    username:'none'
                }
                return usuarioNotFound
            }

        }catch(err){
            console.log(err)
        }
    }
}

module.exports = UserService