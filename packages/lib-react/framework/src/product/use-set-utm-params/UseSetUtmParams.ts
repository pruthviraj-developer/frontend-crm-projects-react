import { useRouter } from 'next/router';
import { productDetailsService } from '@hs/services';

export const useSetUtmParams = (): any => {
  let hasUtm = false;
  let postData: any = {};
  const router = useRouter();
  const getHostName = (url: string) => {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
  };

  const loadUtmFromLocation = () => {
    // var queryParams = this._$location.search() || {};
    const queryParams = router.query;

    var utmParams: any = {};
    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key) && key.indexOf('utm_') === 0) {
        const paramData = ((queryParams && queryParams[key]) ||
          '') as unknown as string;
        utmParams[key] = paramData.replace(/[%#–]/g, '_');
        hasUtm = true;
      }
    }
    if (typeof document != undefined && !hasUtm && document.referrer) {
      // no utm parameter set, check referrer
      let referrer = getHostName(document.referrer);
      if (referrer) {
        utmParams = {};
        utmParams['utm_source'] = referrer;
        utmParams['utm_medium'] = 'search';
        hasUtm = true;
      }
    }
    return utmParams;
  };

  const postUtmParams = () => {
    (async () => {
      try {
        let p = loadUtmFromLocation();
        let params: any = {};
        for (let key in p) {
          params[key] = Array.isArray(p[key])
            ? p[key][p[key].length - 1]
            : p[key];
        }
        postData = {
          utm_source: params['utm_source'] || '',
          utm_medium: params['utm_medium'] || '',
          utm_campaign: params['utm_campaign'] || '',
          deeplink: params['deeplink'] || '',
        };
        await productDetailsService.postUtmParams(postData);
      } catch (e) {}
    })();
  };

  return [postUtmParams];
};
