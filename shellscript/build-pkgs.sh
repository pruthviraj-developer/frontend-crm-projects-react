lerna bootstrap
lerna run --parallel  --scope \"@hs/services\" --scope \"@hs/icons\" --scope \"@hs/utils\"  --scope \"@hs/framework\" build
lerna run   --scope \"@hs/components\" --scope \"@hs/containers\" build
