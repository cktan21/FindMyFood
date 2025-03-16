require('dotenv').config();
const { supabase } = require('../util/db');
const creditTable = 'Credit';

async function getCredit(uuid) {

    const { data, error } = await supabase
    .from(creditTable)
    .select('credit')
    .eq('uuid', uuid)

    if (error) {
        throw new Error(error.message);
    }
    
    return data;

}

async function addCredit(uuid, creditAmount) {

    const { data, error } = await supabase
    .from(creditTable)
    .insert([
        { uuid: uuid, credit: creditAmount,  }
    ])

    if (error) {
        throw new Error(error.message);
    }

    return data;

}


module.exports = {
    getCredit,
    addCredit
};






