import jwt from 'jsonwebtoken';

const authorization = async (resolve, params) => {
    const { obj, args, context } = params;

    const { req, res } = context;

    const token = req.cookies['client-token'];
    
    if (!token) {
        return null;
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded._id) {
        return null;
    }

    context.userId = decoded._id;

    return resolve(obj, args, context);
}

export { authorization };