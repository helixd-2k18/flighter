const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({ 
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
})

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    })
})

UserSchema.statics.authenticate = function (email, password) {
    return new Promise((resolve, reject)=>{
        User.findOne({ email: email }).exec(function (err, user) {
            if (err) {
                reject(err);
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                reject(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    resolve(user);
                } else {
                    resolve();
                }
            })
        });
    });
}
