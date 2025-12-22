import { getDBConnection } from "../db/db";


export async function meController(req,res) {
    try {
        const db = await getDBConnection();
        if (!req.session.userId) {
            return res.json({isLoggedIn:false});

        }
        const name =await db.get(`SELECT name FROM users WHERE id = ?`,[req.session.userId]);  //here we are retrieving the data of user based on his id
        return res.json({isLoggedIn:true,name})
    } catch (error) {
         console.error('getCurrentUser error:', err);
    res.status(500).json({ error: 'Internal server error' });
        
    }
    
}