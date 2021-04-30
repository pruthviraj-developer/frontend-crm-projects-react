# echo "=============Removing node_modules================="
# lerna clean --yes
# rm -rf node_modules/
echo "==========Adding node and local dependencies================"
lerna bootstrap
echo "==============Starting Lerna build==============="
lerna run build