export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || 'kupipodariday',
    user: process.env.DB_USER || 'student',
    password: process.env.DB_PASSWORD || 'student',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: process.env.TTL || '1h',
  },
});
