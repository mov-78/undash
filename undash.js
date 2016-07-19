
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

  _.noConflict = function noConflict( deep ) {
    root._ = old._
    deep && ( root.U = old.U )
    return _
  }

  return _

} )
