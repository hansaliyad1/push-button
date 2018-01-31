const allowedUsers = [
    {email: 'dharmangp25@gmail.com', password: 'Dharmang25'}
];

module.exports = (router) => {

    router.post('/pushButton', (req, res) => {

        let authorized_user = false;

        allowedUsers.forEach((allowedUser) => {
           if (allowedUser.email === req.body.email) {
               if (allowedUser.password === req.body.password) {
                   authorized_user = true;
               } else {
                   res.json({ success: false, message: 'Password is Incorrect. Cannot Push Button.' })
               }
           }
       });

        if (!authorized_user) {
            res.json({ success: false, message: 'User not found under given email address. Cannot Push Button.' })
        } else {
            res.json({ success: true, message: 'Button Pushed.' })
        }
    });

    return router;
};