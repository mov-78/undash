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

    var slice = Array.prototype.slice
    var toString = Object.prototype.toString

    _.noConflict = function noConflict( deep ) {
        root._ = prev._
        deep && ( root.U = prev.U )
        return _
    }

    _.tag = function tag( val ) {

        var raw

        if ( val === null ) {
            return 'null'
        }
        if ( val === void 0 ) {
            return 'undefined'
        }

        raw = toString.call( val )
        return raw.substring( 8 , raw.length - 1 ).toLowerCase()

    }

    _.placeholder = _

    _.nop = function nop() {} // eslint-disable-line no-empty-function
    _.identity = function identity( val ) { return val }

    _.curry = function curry( fn ) {

        var head
        var arity

        if ( typeof fn === 'number' ) {
            arity = fn
            fn = arguments[ 1 ]
            head = slice.call( arguments , 2 )
        } else {
            arity = fn.length
            head = slice.call( arguments , 1 )
        }

        return function next() {

            var idx
            var len
            var holes = []
            var current = head.concat( slice.call( arguments ) )

            for ( idx = 0 , len = current.length ; idx < len ; idx++ ) {
                current[ idx ] === _.placeholder && holes.push( idx )
            }

            if ( current.length - arity >= holes.length ) {
                for ( idx = 0 , len = holes.length ; idx < len ; idx++ ) {
                    current[ holes[ idx ] ] = current[ arity + idx ]
                }
                current.length = arity
                return fn.apply( null , current )
            } else {
                return curry.apply( null , [ arity , fn ].concat( current ) )
            }

        }

    }

    _.bind = _.curry( function bind( ctxt , fn ) {
        return function () {
            return fn.apply( ctxt , arguments )
        }
    } )

    _.stub = function stub( val ) {
        return _.curry( _.identity , val )
    }
    _.T = _.stub( true )
    _.F = _.stub( false )

    _.not = function not( val ) {
        return !val
    }
    _.and = _.curry( function and( val , oth ) {
        return !!( val && oth )
    } )
    _.or = _.curry( function or( val , oth ) {
        return !!( val || oth )
    } )

    _.eq = _.curry( function eq( val , oth ) {
        return val === oth
    } )

    _.isNull = _.pipe( _.tag , _.eq( 'null' ) )
    _.isUndefined = _.pipe( _.tag , _.eq( 'undefined' ) )
    _.isNumber = _.pipe( _.tag , _.eq( 'number' ) )
    _.isString = _.pipe( _.tag , _.eq( 'string' ) )
    _.isBoolean = _.pipe( _.tag , _.eq( 'boolean' ) )
    _.isObject = _.pipe( _.tag , _.eq( 'object' ) )
    _.isArray = _.pipe( _.tag , _.eq( 'array' ) )
    _.isFunction = _.pipe( _.tag , _.eq( 'function' ) )
    _.isDate = _.pipe( _.tag , _.eq( 'date' ) )
    _.isRegex = _.pipe( _.tag , _.eq( 'regexp' ) )

    return _

} )
