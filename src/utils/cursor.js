function encodedCursor(value){
    return Buffer.from(value.toString()).toString('base64')

}
function decodedCursor(cursor){
    return Buffer.from(cursor,'base64').toString('utf-8')

}
module.exports = {encodedCursor,decodedCursor}