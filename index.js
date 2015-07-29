var EventEmitter = require( 'events' ).EventEmitter,
    _SN,
    util = require( 'util' ),
    fs   = require( 'fs' ),
    IS,

SN = {
  inputs: {},
  name:'spacenavigator',
  initialized: false,
  outputs:{
    tx: { min:-.3, max:.3, value: 0 },
    ty: { min:-.3, max:.3, value: 0 },
    tz: { min:-.3, max:.3, value: 0 },
    rx: { min:-.3, max:.3, value: 0 },
    ry: { min:-.3, max:.3, value: 0 },
    rz: { min:-.3, max:.3, value: 0 },
  },
  connected: false,
  init: function() {
    var rate = IS.config.IO.spacenavigator.rate
    _SN = require( './node_modules/spacemouse/spacemouse.js' ).listen({ 'rate':rate })
    
    _SN.on( 'update', function( d ) {
      SN.emit( 'tx', d.tx )
      SN.emit( 'ty', d.ty )
      SN.emit( 'tz', d.tz )
      SN.emit( 'rx', d.rx )
      SN.emit( 'ry', d.ry )
      SN.emit( 'rz', d.rz )                              
    })
      
    
    _SN.on( 'connect', function() {
      if( SN.initialized && !SN.connected ) {
        SN.connected = true
        SN.emit( 'new device', 'spacenavigator', SN )
      }
    })
    
    _SN.on( 'disconnect', function() {
      if( SN.connected ) {
        SN.connected = false
        console.log( "SpaceNavigator disconnected." )
      }
    })
    
    SN.initalized = true
  }
}

SN.__proto__ = new EventEmitter()
  
module.exports = function( __IS ) { if( typeof IS === 'undefined' ) { IS = __IS; } return SN; }