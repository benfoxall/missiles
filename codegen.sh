PROTOC=./node_modules/.bin/grpc_tools_node_protoc
GRPC_PLUGIN=./node_modules/.bin/grpc_tools_node_protoc_plugin

mkdir -p src/generated
rm -rf src/generated/*

$PROTOC \
  --js_out=import_style=commonjs,binary:./src/generated/ \
  --grpc_out=./src/generated \
  --plugin=protoc-gen-grpc=$GRPC_PLUGIN \
  protos/missile.proto


echo "Generated: "
find src/generated -name '*.js'