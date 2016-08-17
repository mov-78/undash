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

    _.isNull = _.pipe( _.tag , _.eq( 'null' ) )
    _.isUndefined = _.pipe( _.tag , _.eq( 'undefined' ) )
    _.isNumber = _.pipe( _.tag , _.eq( 'number' ) )
    _.isString = _.pipe( _.tag , _.eq( 'string' ) )
    _.isBoolean = _.pipe( _.tag , _.eq( 'boolean' ) )
    _.isSymbol = _.pipe( _.tag , _.eq( 'symbol' ) )
    _.isObject = _.pipe( _.tag , _.eq( 'object' ) )
    _.isArray = _.pipe( _.tag , _.eq( 'array' ) )
    _.isFunction = _.pipe( _.tag , _.eq( 'function' ) )
    _.isGenerator = _.pipe( _.tag , _.eq( 'generatorfunction' ) )
    _.isDate = _.pipe( _.tag , _.eq( 'date' ) )
    _.isRegex = _.pipe( _.tag , _.eq( 'regexp' ) )
    _.isSet = _.pipe( _.tag , _.eq( 'set' ) )
    _.isWeakSet = _.pipe( _.tag , _.eq( 'weakset' ) )
    _.isMap = _.pipe( _.tag , _.eq( 'map' ) )
    _.isWeakMap = _.pipe( _.tag , _.eq( 'weakmap' ) )

    return _

} )
