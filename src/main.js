
// I think this is pretty much how real ones work
class Rocket {

  constructor(name, color) {
    this.name = new String(name).slice(0, 20)
    this.color = new String(color).slice(0, 20)

    this.thrust = 0;
    this.steer = 0;

    this.altitude = 0;
    this.speed = 0;
    this.angle = 0;
    this.exploded = false;

    this.uuid = Math.random().toString(32).slice(2)
    this.start = performance.now()
  }

  update(t) {
    this.speed += this.thrust * t / 1000;
    this.speed *= 0.94; // damp

    this.altitude += this.speed * t / 1000;
  }

}

// where the rockets are at
const state = new Map()
const {performance} = require('perf_hooks')

let last = performance.now()
setInterval(() => {
  let now = performance.now()

  for(const rocket of state.values()) {
    rocket.update(now - last)
  }

  last = now;
}, 10);


var messages = require('./generated/protos/missile_pb');
var services = require('./generated/protos/missile_grpc_pb');

var grpc = require('grpc');

function build(call, callback) {

  const color = call.request.getColor()
  const name = call.request.getName()

  const rocket = new Rocket(name, color);

  console.log("CREATED", rocket);

  const uuid = rocket.uuid;

  state.set(uuid, rocket)

  var reply = new messages.MissileToken();
  reply.setUuid(uuid)

  callback(null, reply);
}

function launch(call, callback) {

  const uuid = call.request.getUuid()

  console.log("LOOK FOR Rocket:", uuid)

  const rocket = state.get(uuid)
  if(!rocket) {
    callback(new Error("No Rocket"))
  } else {

    rocket.thrust = 10;

    var reply = new messages.Status();
    reply.setAltitude(rocket.altitude)
    reply.setExploded(rocket.exploded)
  
    callback(null, reply);
  }

}

function control(call, callback) {

  if(call.request.hasToken()) {

    const token = call.request.getToken()
    const uuid = token.getUuid();

    console.log("LOOK FOR Rocket:", uuid)
      
    const rocket = state.get(uuid)
    if(!rocket) {
      callback(new Error("No Rocket"))
    } else {

      rocket.thrust = call.request.getThrust()
      rocket.steer = call.request.getSteer()

      var reply = new messages.Status();
      reply.setAltitude(rocket.altitude)
      reply.setExploded(rocket.exploded)
    
      callback(null, reply);
    }


  } else {
    callback(new Error('no token'))
  }
}

var server = new grpc.Server();
server.addService(services.MissileService, {build, launch, control});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();