const config = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB,
};

export default config;

// RedisModule.register({
//   port: 6379,
//   host: '127.0.0.1',
//   password: '',
//   db: 0,
// }),
