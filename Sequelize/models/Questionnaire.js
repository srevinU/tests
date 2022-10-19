import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class Questionnaires extends Model { }

    questionnaireModel.init({
        // Model attributes are defined here
        subject: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'questionnaires',
        modelName: 'questionnaire',
        freezeTableName: true,
        timestamps: false
    });
    return questionnaireModel;
}