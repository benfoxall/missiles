
// I think this is pretty much how real ones work
class Rocket {

  constructor(name, color) {
    this.name = name
    this.color = color

    this.altitude = 0;
    this.speed = 0;
    this.angle = 0;
    this.exploded = false;

    this.uuid = Math.random().toString(32).slice(2)
  }

  update(t) {
    this.altitude += this.speed * t;
  }

}

// where the rockets are at
const state = new Set()


var messages = require('./generated/protos/missile_pb');
var services = require('./generated/protos/missile_grpc_pb');

var grpc = require('grpc');

function build(call, callback) {

  const color = call.request.getColor()
  const name = call.request.getName()

  const rocket = new Rocket(name, color);

  console.log("CREATED", rocket);

  const uuid = rocket.uuid;

  var reply = new messages.MissileToken();
  reply.setUuid(uuid)

  callback(null, reply);
}

function launch(call, callback) {

  const uuid = call.request.getUuid()

  console.log("LOOK FOR Rocket:", uuid)

  var reply = new messages.Status();
  reply.setAltitude(10)
  reply.setExploded(false)

  callback(null, reply);
}

function control(call, callback) {

  if(call.request.hasToken()) {

    const token = call.request.getToken()
    const uuid = token.getUuid();

    console.log("LOOK FOR Rocket:", uuid)

    var reply = new messages.Status();
    reply.setAltitude(10)
    reply.setExploded(false)
  
    callback(null, reply);

  } else {
    callback(new Error('no token'))
  }
}

var server = new grpc.Server();
server.addService(services.MissileService, {build, launch, control});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();