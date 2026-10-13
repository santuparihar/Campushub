
function checknormal(user){
    if(user.typr_id === 0){
        next();
    }

    return res.status(401).send("UNAUTHORIZED");
}

function checkadmin(user){
    if(user.type_id === 1){
        next();
    }

    return res.status(401).send("UNAUTHORIZED");
}

module.exports = {
    checknormal , 
    checkadmin,
}