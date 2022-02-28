echo "=============Removing node_modules================="
lerna clean --yes
rm -rf node_modules/
echo "==========Adding node and local dependencies================"
lerna bootstrap
echo "==============Starting Lerna build==============="
lerna run --parallel  --scope \"@hs/services\" --scope \"@hs/icons\" --scope \"@hs/utils\" build
lerna run --scope "@hs-crm/*" build
lerna  run --parallel --scope  "@hs-crm-app/react-carousel-crm" build