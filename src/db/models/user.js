import bcrypt from "bcrypt"

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your name'
        }
      },
      auth: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          defaultValue: "local",
          msg: 'please spify auth type'
        },
        validate: {
          isIn: [['google', 'local']]
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your username'
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your email address'
        },
        unique: {
          args: true, msg: 'Email already exists'
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'Please enter a valid email address'
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          isNotShort: (value) => {
            if (value.length < 8) {
              throw new Error('Password should be at least 8 characters');
            }
          },
        },
      }
    }, {
    hooks: {
      beforeCreate: function (user) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.dataValues.password, salt);
        user.dataValues.password = hash
        console.log(user)
      }
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Expense, {
      foreignKey: 'userId'
    })
  }; return User;
};
