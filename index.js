var EventEmitter = require( 'events' ).EventEmitter,
    _SN = require( 'spacemouse' ),
    util = require( 'util' ),
    fs   = require( 'fs' ),
    _    = require( 'lodash'),
    IS,

SN = {
  init: function() {
    var rate = IS.config.IO.spacenavigator.rate
    _SN.listen({ 'rate':rate })
    
    _SN.on( 'update', function( d ) {
      SN.emit( 'tx', d.tx )
      SN.emit( 'ty', d.ty )
      SN.emit( 'tz', d.tz )
      SN.emit( 'rx', d.rx )
      SN.emit( 'ry', d.ry )
      SN.emit( 'rz', d.rz )                              
    })
  }
}

SN.__proto__ = new EventEmitter()
  
module.exports = function( __IS ) { if( typeof IS === 'undefined' ) { IS = __IS; } return SN; }