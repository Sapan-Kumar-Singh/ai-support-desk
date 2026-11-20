import { DataTypes } from "sequelize";
import { sequelize } from "../database/prisma/connection.js";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, {
    defaultScope: {
        attributes: {
            exclude: ["password", 'refreshToken']
        }
    },
    hooks: {
        // Runs automatically before User.create()
        beforeCreate: async (user) => {
            if (user.password) {
                const saltRounds = 10;
                user.password = await bcrypt.hash(user.password, saltRounds);
            }
        },
        // Runs automatically before user.save() or User.update()
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const saltRounds = 10;
                user.password = await bcrypt.hash(user.password, saltRounds);
            }
        },
    }
});

User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}
export default User;