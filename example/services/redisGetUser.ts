// import { getCache, setCache} from '../../src/utils/redisConnect';
// import db from '../../src/db'; // Your database module

// const getUser = (userId: string, callback: { (err: any, user: any): void; (arg0: null, arg1: undefined): any; }) => {
//   const cacheKey = `user:${userId}`;

//   getCache(cacheKey, (err: any, data: string) => {
//     if (err) {
//       return callback(err);
//     }

//     if (data) {
//       return callback(null, JSON.parse(data));
//     }

//     // If cakey: string, p0: (err: any, data: string) => any, p0: (err: any, data: string) => any, p0: (err: any, data: string) => anyetch from database
//     db.getUserById(userId, (err: any, user: any) => {
//       if (err) {
//         return callback(err);
//       }

//       // Store the result in cache
//       setCache(cacheKey, JSON.stringify(user), 3600); // Cache for 1 hour
//       return callback(null, user);
//     });
//   });
// };

// // Example usage
// getUser('123', (err: any, user: any) => {
//   if (err) {
//     console.error('Error fetching user:', err);
//   } else {
//     console.log('User data:', user);
//   }
// });
