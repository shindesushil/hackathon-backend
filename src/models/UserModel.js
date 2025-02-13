const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require("bcryptjs"); 


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  signUpAs: {
    type: DataTypes.ENUM('User','Therapists'),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});


User.prototype.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

User.sync({ force: false , alter: true })
  .then(() => {
    // console.log('Users table created successfully.');
  })
  .catch(err => {
    console.error('Error creating USers table:', err);
  });


module.exports = User;
