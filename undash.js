
( function ( root , factory ) {

  if ( typeof define === 'function' && define.amd ) {
    define( 'undash' , function () {
      return root._ = root.U = factory( root ) // eslint-disable-line no-return-assign
    } )
  } else {
    root._ = root.U = factory( root )
  }

} )( this , function ( root ) {

  var _ = { VERSION : '0.0.1' }
  var old = { _ : root._ , U : root.U }

  var slice = Array.prototype.slice

  _.noConflict = function noConflict( deep ) {
    root._ = old._
    deep && ( root.U = old.U )
    return _
  }

  _.curry = function curry( fn , arity , args ) {
    args = args || []
    typeof arity == 'number' || ( arity = fn.length )
    return function wrapper() {
      args = args.concat( slice.call( arguments ) )
      return args.length < arity ? curry( fn , arity , args ) : fn.apply( this , args )
    }
  }

  return _

} )
