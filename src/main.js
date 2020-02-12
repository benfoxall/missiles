
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

var server = new grpc.Server();
server.addService(services.MissileService, {build});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();