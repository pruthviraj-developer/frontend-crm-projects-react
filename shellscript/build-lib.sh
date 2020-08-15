echo "=============Removing node_modules================="
rm -rf node_modules/
echo "==========Adding node and local dependencies================"
lerna bootstrap
echo "==============Starting Lerna build==============="
lerna run build