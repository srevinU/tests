import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class News extends Model { }

    NewsModel.init({
        // Model attributes are defined here
        subject: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'news',
        modelName: 'news',
        freezeTableName: true,
        timestamps: false
    });
    return NewsModel;
}