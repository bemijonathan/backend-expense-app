// import bcrypt from "bcrypt"

export default (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "please enter title"
      },
      validate: {
        len: [2, 30]
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "please enter amount"
      },
      validate: {
        min: 0.00
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "please enter category"
      },
      validate: {
        isIn: [['food', 'electricity', 'transport']]
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "user must exist"
      },
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    }
  },
    {

    });

  // Expense.be
  Expense.associate = (models) => {
    // associations can be defined here
    Expense.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return Expense;
};
