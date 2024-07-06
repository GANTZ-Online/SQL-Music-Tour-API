// DEPENDENCIES
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.PG_URI);

// MODEL
class Band extends Model {}

// EXPORT
module.exports = Band;

Band.init({
    band_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    available_start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize, // Pass the sequelize connection
    modelName: 'Band', // Set model name explicitly
    tableName: 'band', // Set the table name explicitly
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
});

// Further code or associations can be added here as needed

