
var messages = require('./generated/protos/missile_pb');
var services = require('./generated/protos/missile_grpc_pb');

var grpc = require('grpc');

var client = new services.MissileClient(
  'localhost:50051',grpc.credentials.createInsecure()
);

var request = new messages.MissileDescription();
request.setName('BEN 01')
request.setColor('#f09')

client.build(request, (err, token) => {
  if(err) { throw err }

  console.log("Built a rocket", token.getUuid())

  setTimeout(() => {

    client.launch(token, (err, response) => {
      console.log("LAUNCHED?", err, response && response.toObject())
    } )

  }, 500)



  setTimeout(() => {

    const command = new messages.MissileCommand();
    command.setToken(token)
    command.setSteer(42)
    command.setThrust(420)

    client.control(command, (err, response) => {
      console.log("COMMANDED?", err, response && response.toObject())
    } )

  }, 1000)


})
