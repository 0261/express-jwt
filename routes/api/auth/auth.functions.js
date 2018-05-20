const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt-nodejs');
const {user} = require("../../../models"); // require Users Table

// 비밀번호 암호화
const generateHash = (password) => {
    return bCrypt.hashSync(password, null, null);
};
// # 사용자 입력 패스워드와 데이터베이스에 암호화된 패스워드를 비교
const compareHash = (password, userPassword) => {
    return bCrypt.compareSync(password, userPassword);
}

module.exports = {

    /**
     * 
     * @param {*} req (email,password)
     * @param {*} res 
     */
    async signup(req,res){
        try{
            const email = req.body.email;
            const password = await generateHash(req.body.password);
            const getParams = {
                where: { email: email }
            }
            const User = await user.findOne(getParams);
            if (User) {
                throw new Error('아이디 중복');
            }
            const createParams = {
                email: email,
                password: password
            };
            const createdUser = await user.create(createParams);
            res.send('회원가입성공');
        }catch(error){
            return res.json({
                statusCode:400,
                result: `(오류) 회원가입 실패 ${error.message}`
            });
        }
    },
    /**
     * 
     * @param {*} req (email, password)
     * @param {*} res 
     */
    async signin(req, res) {
        try{
            const email = req.body.email;
            const password = req.body.password;
            const getParams = {
                where: { email: email }
            }
            const User = await user.findOne(getParams);
            if (!User) {
                throw new Error('조회된 아이디가 없습니다.');
            }
            const authorization = await compareHash(password, User.password);
            if (authorization) {
                // # 쓸모없는 값 삭제.
                delete User.get().password

                const token = jwt.sign({
                    User: User.get()
                }, `padascretkey`);
                res.json({
                    statusCode:200,
                    result:token
                })
            } else {
                throw new Error('치명적인 오류입니다. 비밀번호가 틀렸습니다.');
            }
            console.log('POST /api/auth/signin')
        }catch(error){
            return res.json({
                statusCode:400,
                result:`(오류) 로그인 실패 ${error.message}`
            })
        }

    }
}