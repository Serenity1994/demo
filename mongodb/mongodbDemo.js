/*
    一些名词:
    database: 数据库名
    collection:类似数据库中某个具体的表
    使用cmd连接mongo数据库: 
        MongoDB安装位置\bin\mongo.exe
        显示所有数据库:show dbs;
        使用某个数据库: use TestDB; (如果TestDB不存在,则在执行insert语句时会自动创建)
        db.TestCollection.insert({name:'mike',age:13});
        执行完上面的语句,会在数据库中新建一个TestDB数据库,
        并在TestDB中新建一个名字是TestCollection的Collection,
        并在TestCollection中添加一条数据{}
    使用node连接mongo数据库:
        npm install mongodb
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://localhost:27017/TestDB',
                        (err, client) => {
                            //3.0版本之后,连接后返回的是一个client,
                            // 而不是以前的db
                            var db = client.db('dbName');
                            var collection = db.collection('collectionName');
                            // ... 增删改查
                            client.close();
                        }
                    );
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/TestDB";
// 测试连接,使用的数据库是TestDB,即使TestDB不存在也不会报错
MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  console.log('test Connected');
  client.close();
});

// 新建Collection
MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    console.log('test create Connected');
    // mongoDB 3.0版本以后需要先获得数据库
    var db = client.db('TestDB');
    // 使用TestCollection,相当于获得表TestCollection
    var collection = db.collection('TestCollection');
    console.log(collection,"collection");
    // 向表中插入数据
    var cursor = collection.insert({Employeeid:1,'Employee Name':'mike'});
    console.log(cursor);
    client.close();
})