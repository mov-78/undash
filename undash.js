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

    _.uid = ( function () {
        var cnt = 0
        return function uid() {
            return cnt++ // eslint-disable-line no-plusplus
        }
    } )()

    _.rest = function rest( fn ) {
        var at = Math.max( fn.length - 1 , 0 )
        return function () {
            var args = slice.call( arguments )
            args.length <= at && ( args.length = at + 1 )
            return fn.apply( this , args.slice( 0 , at ).concat( [ args.slice( at ) ] ) )
        }
    }

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
                return fn.apply( this , current )
            } else {
                return curry.apply( null , [ arity , fn ].concat( current ) )
            }

        }

    }

    _.pipe = _.rest( function ( pipeline ) {
        return function () {
            var ctxt = this
            return _.reduce(
                function ( prev , fn ) { return fn.call( ctxt , prev ) } ,
                pipeline[ 0 ].apply( ctxt , arguments ) ,
                pipeline.slice( 1 )
            )
        }
    } )

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

    _.both = _.curry( function both( f1 , f2 ) {
        return function () {
            return f1.apply( this , arguments ) && f2.apply( this , arguments )
        }
    } )
    _.either = _.curry( function either( f1 , f2 ) {
        return function () {
            return f1.apply( this , arguments ) || f2.apply( this , arguments )
        }
    } )
    _.negate = function negate( fn ) {
        return function () {
            return !fn.apply( this , arguments )
        }
    }

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

    _.isNil = _.either( _.isNull , _.isUndefined )

    _.intercept = _.curry( function intercept( interceptor , fn ) {
        return function () {
            return fn.apply( this , interceptor.apply( null , arguments ) )
        }
    } )

    _.arity = _.curry( function arity( n , fn ) {
        return _.intercept( _.rest( _.head( n ) ) )( fn )
    } )

    _.unary = _.arity( 1 )

    _.nth = function nth( n ) {
        return _.rest( _.at( n ) )
    }

    _.flip = function flip( fn ) {
        return function () {
            return fn.apply( this , slice.call( arguments ).reverse() )
        }
    }

    _.compose = _.flip( _.pipe )

    _.delay = _.curry( function delay( timeout , fn ) {
        return setTimeout( fn , timeout )
    } )

    _.defer = _.delay( 0 )

    _.attempt = function attempt( fn ) {
        try {
            return fn.apply( this , arguments )
        } catch ( error ) {
            return error
        }
    }

    _.memoize = _.curry( function memoize( fn , resolver ) {
        var cache = {}
        return function () {
            var key = resolver.apply( null , arguments )
            key in cache || ( cache[ key ] = fn.apply( this , arguments ) )
            return cache[ key ]
        }
    } )

    _.add = _.curry( function add( augend , addend ) {
        return augend + addend
    } )
    _.subtract = _.curry( function subtract( minuend , subtrahend ) {
        return minuend - subtrahend
    } )
    _.multiply = _.curry( function multiply( multiplier , multiplicand ) {
        return multiplier * multiplicand
    } )
    _.divide = _.curry( function divide( dividend , divisor ) {
        return dividend / divisor
    } )

    _.inc = function inc( val ) { return val + 1 }
    _.dec = function dec( val ) { return val - 1 }

    _.gt = _.curry( function gt( val , oth ) {
        return val > oth
    } )
    _.lt = _.curry( function lt( val , oth ) {
        return val < oth
    } )
    _.gte = _.curry( function gte( val , oth ) {
        return val >= oth
    } )
    _.lte = _.curry( function lte( val , oth ) {
        return val <= oth
    } )

    _.modulo = _.curry( function modulo( dividend , divisor ) {
        return dividend % divisor
    } )

    _.isOdd = _.pipe( _.modulo( _ , 2 ) , _.eq( 1 ) )
    _.isEven = _.pipe( _.modulo( _ , 2 ) , _.eq( 0 ) )

    _.cond = function cond( pairs ) {
        return function () {
            var idx
            var len
            for ( idx = 0 , len = pairs.length ; idx < len ; idx++ ) {
                if ( pairs[ idx ][ 0 ].apply( this , arguments ) ) {
                    return pairs[ idx ][ 1 ].apply( this , arguments )
                }
            }
        }
    }

    _.head = _.curry( function head( n , arr ) {
        return slice.call( arr , 0 , n )
    } )
    _.tail = _.curry( function tail( n , arr ) {
        return slice.call( arr , arr.length - n )
    } )

    _.at = _.curry( function at( idx , arr ) {
        return arr[ idx < 0 ? arr.length + idx : idx ]
    } )

    _.prop = _.curry( function prop( path , obj ) {
        var key
        var paths = path.split( '.' )
        while ( key = paths.shift() ) { // eslint-disable-line no-cond-assign
            try {
                obj = obj[ key ]
            } catch ( error ) {
                return void 0
            }
        }
        return obj
    } )

    return _

} )
