
var messages = require('./generated/protos/missile_pb');
var services = require('./generated/protos/missile_grpc_pb');

var grpc = require('grpc');

var client = new services.MissileClient(
  'localhost:50051',grpc.credentials.createInsecure()
);

var request = new messages.MissileDescription();
request.setName('BEN 01')
request.setColor('#f09')

client.build(request, (err, response) => {
  if(err) { throw err }


  console.log("Built a rocket", response.toObject())
})
