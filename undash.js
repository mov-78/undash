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

    _.nop = function nop() {} // eslint-disable-line no-empty-function
    _.identity = function identity( value ) {
        return value
    }

    _.stub = function stub( value ) {
        return _.partial( _.identity , value )
    }

    _.T = _.stub( true )
    _.F = _.stub( false )

    _.isNull = _.pipe( _.tag , _.equal( 'null' ) )
    _.isUndefined = _.pipe( _.tag , _.equal( 'undefined' ) )
    _.isNumber = _.pipe( _.tag , _.equal( 'number' ) )
    _.isString = _.pipe( _.tag , _.equal( 'string' ) )
    _.isBoolean = _.pipe( _.tag , _.equal( 'boolean' ) )
    _.isSymbol = _.pipe( _.tag , _.equal( 'symbol' ) )
    _.isObject = _.pipe( _.tag , _.equal( 'object' ) )
    _.isArray = _.pipe( _.tag , _.equal( 'array' ) )
    _.isFunction = _.pipe( _.tag , _.equal( 'function' ) )
    _.isGenerator = _.pipe( _.tag , _.equal( 'generatorfunction' ) )
    _.isDate = _.pipe( _.tag , _.equal( 'date' ) )
    _.isRegex = _.pipe( _.tag , _.equal( 'regexp' ) )
    _.isSet = _.pipe( _.tag , _.equal( 'set' ) )
    _.isWeakSet = _.pipe( _.tag , _.equal( 'weakset' ) )
    _.isMap = _.pipe( _.tag , _.equal( 'map' ) )
    _.isWeakMap = _.pipe( _.tag , _.equal( 'weakmap' ) )

    return _

} )
