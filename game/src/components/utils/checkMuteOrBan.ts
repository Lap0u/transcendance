import moment from 'moment';
import { MuteOrBanUser } from '../Chat/const';

const checkMuteOrBan = (muteOrBanUser: MuteOrBanUser | undefined) => {
  if (!muteOrBanUser) return false;

  const now = moment();
  const until = moment(muteOrBanUser.until);
  // if until > now return < 0
  const diff = now.diff(until);
  return diff < 0;
};

export default checkMuteOrBan;
