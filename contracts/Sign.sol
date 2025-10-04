// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error SignatureLengthError(uint sigLength);

contract Sign {

    function verify(address _signer, string memory _msg, bytes memory _sig) external pure returns(bool) {
        bytes32 msgHash = messageHash(_msg);
        bytes32 sigMsgHash = ethMsgHash(msgHash);
        return recover(sigMsgHash, _sig) == _signer;
    }

    function messageHash(string memory _msg) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(_msg));
    }

    function ethMsgHash(bytes32 _msgHash) public pure returns(bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _msgHash));
    }

    function recover(bytes32 _sigMsgHash, bytes memory _sig) public pure returns(address) {
        (bytes32 r, bytes32 s, uint8 v) = _splitSig(_sig);
        return ecrecover(_sigMsgHash, v, r, s);
    }

    function _splitSig(bytes memory _sig) internal pure returns(bytes32 r, bytes32 s, uint8 v) {
        require(_sig.length == 65, SignatureLengthError(_sig.length));
        assembly {
            r := mload(add(_sig, 32))
            s := mload(add(_sig, 64))
            v := byte(0,mload(add(_sig, 96)))
        }
    }

}