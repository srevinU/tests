import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class TagModel extends Model { }

    TagModel.init({
        // Model attributes are defined here
        label: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'tags',
        modelName: 'tag',
        freezeTableName: true,
        timestamps: false
    });
    return TagModel;
}