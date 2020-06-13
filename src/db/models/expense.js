export default (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "please enter title"
      },
      validate: {
        len: [2, 10]
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
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    }
  }, {});
  Expense.associate = (models) => {
    // associations can be defined here
    Expense.belongsTo(models.User, { foriegnKey: 'userId', onDelete: 'CASCADE' })
  };
  return Expense;
};