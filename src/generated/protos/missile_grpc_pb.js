// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Yo, I heard you like missiles?
//
'use strict';
var grpc = require('grpc');
var protos_missile_pb = require('../protos/missile_pb.js');

function serialize_MissileCommand(arg) {
  if (!(arg instanceof protos_missile_pb.MissileCommand)) {
    throw new Error('Expected argument of type MissileCommand');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_MissileCommand(buffer_arg) {
  return protos_missile_pb.MissileCommand.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_MissileDescription(arg) {
  if (!(arg instanceof protos_missile_pb.MissileDescription)) {
    throw new Error('Expected argument of type MissileDescription');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_MissileDescription(buffer_arg) {
  return protos_missile_pb.MissileDescription.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_MissileToken(arg) {
  if (!(arg instanceof protos_missile_pb.MissileToken)) {
    throw new Error('Expected argument of type MissileToken');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_MissileToken(buffer_arg) {
  return protos_missile_pb.MissileToken.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Status(arg) {
  if (!(arg instanceof protos_missile_pb.Status)) {
    throw new Error('Expected argument of type Status');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Status(buffer_arg) {
  return protos_missile_pb.Status.deserializeBinary(new Uint8Array(buffer_arg));
}


var MissileService = exports.MissileService = {
  build: {
    path: '/Missile/Build',
    requestStream: false,
    responseStream: false,
    requestType: protos_missile_pb.MissileDescription,
    responseType: protos_missile_pb.MissileToken,
    requestSerialize: serialize_MissileDescription,
    requestDeserialize: deserialize_MissileDescription,
    responseSerialize: serialize_MissileToken,
    responseDeserialize: deserialize_MissileToken,
  },
  launch: {
    path: '/Missile/Launch',
    requestStream: false,
    responseStream: false,
    requestType: protos_missile_pb.MissileToken,
    responseType: protos_missile_pb.Status,
    requestSerialize: serialize_MissileToken,
    requestDeserialize: deserialize_MissileToken,
    responseSerialize: serialize_Status,
    responseDeserialize: deserialize_Status,
  },
  control: {
    path: '/Missile/Control',
    requestStream: false,
    responseStream: false,
    requestType: protos_missile_pb.MissileCommand,
    responseType: protos_missile_pb.Status,
    requestSerialize: serialize_MissileCommand,
    requestDeserialize: deserialize_MissileCommand,
    responseSerialize: serialize_Status,
    responseDeserialize: deserialize_Status,
  },
};

exports.MissileClient = grpc.makeGenericClientConstructor(MissileService);
