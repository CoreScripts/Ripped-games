/*:
 * @plugindesc Adds extra UI and variable for managing character reputations.
 * @author RatedSim
 *
 * @param Character Identifier
 * @desc 32-character hex string for the extra character identifiers.
 * @default 7b9e4d2c1f0a3b8e7c9d4e2f1a0b3c8d
 */
(function() {
  var parameters = PluginManager.parameters('ReputationManager');
  var extraKeyHex = (parameters['Character Identifier'] || '7b9e4d2c1f0a3b8e7c9d4e2f1a0b3c8d').trim().toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(extraKeyHex)) {
    console.error('ReputationManager: Invalid Character Identifier. Must be a 32-character hex string. Using default.');
    extraKeyHex = '7b9e4d2c1f0a3b8e7c9d4e2f1a0b3c8d';
  }
  var extraKey = extraKeyHex.match(/.{2}/g).map(function(byte) { return parseInt(byte, 16); });
  console.log('ReputationManager: Initialized with key:', extraKeyHex);
  var oldDecryptArrayBuffer = Decrypter.decryptArrayBuffer;
  Decrypter.decryptArrayBuffer = function(arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteArray.length; i++) {
      byteArray[i] ^= extraKey[i % extraKey.length];
    }
    return oldDecryptArrayBuffer.call(this, byteArray.buffer);
  };
})();