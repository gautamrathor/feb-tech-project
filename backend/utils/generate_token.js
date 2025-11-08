import jwt from 'jsonwebtoken'

export const generateToken = async (data)=>{
     try {
            const{email,_id}=data
            const accessToken=jwt.sign({email,_id},process.env.JWT_SECRETS , {expiresIn:'7d'})

            const Options= {
                    httpOnly:true,
                    expires:new Date(Date.now()*7*24*60*60*1000),
                    
            } 
            return {accessToken , Options}

     } catch (error) {
        console.log(error);
        
     }
}

