import { DataTypes, Sequelize } from 'sequelize';

const myDb = new Sequelize(`postgres://postgres:@localhost:5432/db_react_app_1`);

const Questionnaires = myDb.define('questionnaires', {
    subject: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false
})

const Tags = myDb.define('tags', {
    label: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

Questionnaires.hasMany(Tags, { onDelete: 'CASCADE' });
Tags.belongsTo(Questionnaires, { onDelete: 'CASCADE' });
// Tags.belongsTo(Questionnaires);
let questionnaire, tags;
console.info('Info to check:', Questionnaires.associations);
myDb.sync({ alter: true }).then(() => {

    /*
    Queries generate data
    Questionnaires.bulkCreate(
        [{
            title: 'Title 1',
            subject: 'Subject 1',
        },
        {
            title: 'Title 2',
            subject: 'Subject 2',
        }, 
        {
            title: 'Title 3',
            subject: 'Subject 3',
        }]
    );

    Tags.bulkCreate(
        [{
            label: 'Label 1'
        },
        {
            label: 'Label 2'
        }, 
        {
            label: 'Label 3'
        }]
    )
    */

    return Questionnaires.findOne({where: {  id: '2'}});

}).then((data) => {
    questionnaire = data;
    return Tags.findOne({where: {  id: '1'}});
})
.then((data) => {
    tags = data;
    return questionnaire.addTags(tags);
})
.then((data) => {
    console.log(data)
})
.catch((error) => {
    console.error(error);
})

