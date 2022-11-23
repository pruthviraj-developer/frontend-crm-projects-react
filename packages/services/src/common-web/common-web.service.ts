import { httpService } from '../http';
import { cookiesService } from '../store/cookies.service';
let callLaunchAPI = true;
const EXPERIMENT_INFO_CLIENT = 'EXPERIMENT_INFO_CLIENT';
const EXPERIMENTS = {
  ON_NEW_PROMO: 'promotionvisibility_promovisibility',
};
// SHOW_RFYP: 'rfypcue_cues',
// GU_VARIATION: {
//   GUEST_USER: 'guestflow_guest',
//   REGULAR_USER: 'guestflow_baseline',
// },
// SEARCH_VISIBILITY: 'searchvisibility_searchbox',
// SHOW_RECOMMENDATAION: 'collaborativevisibility_collabvisibility',

const getExperimentInfoClient = () => {
  const clientExps: string = cookiesService.getCookies(
    EXPERIMENT_INFO_CLIENT
  ) as string;
  if (clientExps) {
    const EXPERIMENTSLIST = clientExps.split('$$');
    if (EXPERIMENTSLIST[0] === '""' || EXPERIMENTSLIST[0] === "''") {
      return [];
    }
    return EXPERIMENTSLIST;
  }
  return [];
};

const callLaunchApi = <R>(): Promise<R> => {
  const url = '/api/launch';
  return httpService.get<R>({ url });
};

const getVariations = () => {
  const clientExps: string = cookiesService.getCookies(
    EXPERIMENT_INFO_CLIENT
  ) as string;
  if (clientExps) {
    return clientExps.split('$$');
  } else if (callLaunchAPI) {
    callLaunchAPI = false;
    callLaunchApi().then(
      () => {
        callLaunchAPI = true;
      },
      () => {
        callLaunchAPI = true;
      }
    );
    return [];
  }
  return [];
};

const showPromoOnPlp = () => {
  const variations = getVariations();
  return (
    Array.isArray(variations) &&
    variations.indexOf(EXPERIMENTS.ON_NEW_PROMO) > -1
  );
};

export const commonWebService = {
  showPromoOnPlp,
  getExperimentInfoClient,
};
