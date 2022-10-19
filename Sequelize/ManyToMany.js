import { DataTypes, Op, Sequelize } from 'sequelize';

/*
* To drop table with stromng association:
* DROP TABLE if exists tableName cascade;
*/

const myDb = new Sequelize(`postgres://postgres:@localhost:5432/db_react_app_1`);

// Table questionnaires
const Questionnaires = myDb.define('questionnaires', {
    sys_id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    subject: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

// Table tags
const Tags = myDb.define('tags', {
    sys_id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    label: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

// Table news
const News = myDb.define('news', {
    sys_id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    subject: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

// Table itemTags
const ItemTags = myDb.define('itemtags', {
    itemtagId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},{
    timestamps: false
})

// Table test without any associations
const Test = myDb.define('test', {
    testId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},{
    timestamps: false
})

// Items associassions
Questionnaires.belongsToMany(Tags, { through: 'itemtags' });
News.belongsToMany(Tags, { through: 'itemtags' });
// Tag associassions
Tags.belongsToMany(Questionnaires, { through: 'itemtags' });
Tags.belongsToMany(News, { through: 'itemtags' });

// Tags.belongsTo(Questionnaires);
let questionnaire, news, tag;
console.info('Questionnaires associations:', Questionnaires.associations);
console.info('News associations:', News.associations);
console.info('Tags associations:', Tags.associations);

myDb.sync({ alter: true }).then(() => {

    /*
    Queries generate data
    */

    Questionnaires.bulkCreate(
        [{
            sys_id: 1,
            subject: 'Subject 1',
        }, {
            sys_id: 2,
            subject: 'Subject 2',
        }, {
            sys_id: 3,
            subject: 'Subject 3',
        }]
    );

    News.bulkCreate(
        [{
            sys_id: 1,
            subject: 'subject 1'
        }, {
            sys_id: 2,
            subject: 'subject 2'
        }, {
            sys_id: 3,
            subject: 'subject 3'
        }]
    )

    Tags.bulkCreate(
        [{
            sys_id: 1,
            label: 'Label 1'
        }, {
            sys_id: 2,
            label: 'Label 2'
        }, {
            sys_id: 3,
            label: 'Label 3'
        }]
    )

    return News.findOne({ where: { sys_id: 1 } });

})
.then((data) => {
    news = data;
    return Tags.findOne({where: { id: 2 }})
})
.then((data) => {
    tag=data;
    news.addTags(tag)
})
.catch((error) => {
    console.error(error);
})
// ------------------------------------------------------------------------------------------------------------------
// const model = Questionnaires;
// Questionnaires.create(data);
