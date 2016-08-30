module.exports = function ( config ) {
    config.set( {
        frameworks : [ 'jasmine' ] ,
        files : [ '../../undash.js' , '../unit/*.js' ]
    } )
}
