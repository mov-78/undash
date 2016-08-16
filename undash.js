( function ( root , factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define( function () {
            return root._ = root.U = factory( root ) // eslint-disable-line no-return-assign
        } )
    } else {
        root._ = root.U = factory( root )
    }
} )( this , function ( root ) {


    var _ = { VERSION : '0.0.1' }
    var prev = { _ : root._ , U : root.U }

    var toString = Object.prototype.toString

    _.noConflict = function noConflict( deep ) {
        root._ = prev._
        deep && ( root.U = prev.U )
        return _
    }

    _.tag = function tag( value ) {

        var _tag

        if ( value === null ) {
            return 'null'
        }
        if ( value === void 0 ) {
            return 'undefined'
        }

        _tag = toString.call( value )
        return _tag.substring( 8 , _tag.length - 1 ).toLowerCase()

    }

    _.isNull = _.flow( _.tag , _.equal( 'null' ) )
    _.isUndefined = _.flow( _.tag , _.equal( 'undefined' ) )
    _.isNumber = _.flow( _.tag , _.equal( 'number' ) )
    _.isString = _.flow( _.tag , _.equal( 'string' ) )
    _.isBoolean = _.flow( _.tag , _.equal( 'boolean' ) )
    _.isSymbol = _.flow( _.tag , _.equal( 'symbol' ) )
    _.isObject = _.flow( _.tag , _.equal( 'object' ) )
    _.isArray = _.flow( _.tag , _.equal( 'array' ) )
    _.isFunction = _.flow( _.tag , _.equal( 'function' ) )
    _.isGenerator = _.flow( _.tag , _.equal( 'generatorfunction' ) )
    _.isDate = _.flow( _.tag , _.equal( 'date' ) )
    _.isRegex = _.flow( _.tag , _.equal( 'regexp' ) )

    return _

} )
