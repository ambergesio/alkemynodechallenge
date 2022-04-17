const CrudContainer = require('../containers/container');
const User = require('../models/User');

class UserDao extends CrudContainer {
    constructor() {
        super(User);
    }
    async getByEmail (email){
        return await User.findOne({ where: { email: email }});
    }
};

const usersDao = new UserDao;

module.exports = usersDao;