import { join } from 'path';

const config = {
  type: process.env.DB_TYPE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database:
    process.env.NODE_ENV === 'production'
      ? process.env.MYSQL_DATABASE_PRO
      : process.env.MYSQL_DATABASE_DEV,
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')], //扫描匹配.entity.ts .entity.js文件
  synchronize: true, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
  timezone: '+08:00',
  cache: {
    duration: 60000, // 1分钟的缓存
  },
  extra: {
    poolMax: 32,
    poolMin: 16,
    queueTimeout: 60000,
    pollPingInterval: 60, // 每隔60秒连接
    pollTimeout: 60, // 连接有效60秒
  },
};

// const developmentConfig = {
//   type: process.env.MYSQL_TYPE,
//   host: process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT,
//   username: process.env.MYSQL_USERNAME,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE_DEV,
//   entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')], //扫描匹配.entity.ts .entity.js文件
//   synchronize: true, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
//   timezone: '+08:00',
//   cache: {
//     duration: 60000, // 1分钟的缓存
//   },
//   extra: {
//     poolMax: 32,
//     poolMin: 16,
//     queueTimeout: 60000,
//     pollPingInterval: 60, // 每隔60秒连接
//     pollTimeout: 60, // 连接有效60秒
//   },
// };

// const productionConfig = {
//   mysql: {
//     type: process.env.DB_TYPE,
//     host: process.env.MYSQL_HOST,
//     port: process.env.MYSQL_PORT,
//     username: process.env.MYSQL_USERNAME,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE_PRO,
//     entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
//     synchronize: true,
//     timezone: '+08:00',
//     cache: {
//       duration: 60000,
//     },
//     extra: {
//       poolMax: 32,
//       poolMin: 16,
//       queueTimeout: 60000,
//       pollPingInterval: 60,
//       pollTimeout: 60,
//     },
//   },
// };

// const config =
//   process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

// console.log(config);
// console.log(process.env.PORT);

export default config;
