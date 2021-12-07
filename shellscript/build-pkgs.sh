lerna bootstrap --ignore @hs-crm*/*
lerna run --parallel  --scope \"@hs/services\" --scope \"@hs/icons\" --scope \"@hs/utils\" build
lerna run   --scope \"@hs/components\" --scope \"@hs/containers\" --scope \"@hs/framework\" build
