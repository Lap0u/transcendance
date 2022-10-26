import axios from 'axios';

export default async function handleErrors(error: any, nav: any) {
  const BACK_URL = 'http://localhost:4000';

  if (error.response.status === 401 || error.response.status === 403) {
    await axios
      .get(`${BACK_URL}/auth/status`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.twoFaEnabled && !res.data.emailVerified) {
          nav('/emailverify');
          return;
        }
        if (res.data.twoFaEnabled && res.data.emailVerified) {
          nav('/2fa');
          return;
        } else {
          nav('/forbidden');
          return;
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          nav('/error403');
          return;
        } else nav('/error500');
      });
  } else if (error.response.status === 400) nav('/error400');
  else if (error.response.status === 404) nav('/error404');
  else {
    nav('/error500');
  }
}
