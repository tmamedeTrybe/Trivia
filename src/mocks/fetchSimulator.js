export const ENDPOINTS = {
  USER: 'https://opentdb.com/api_token.php?command=request',
  QUESTIONS: 'ainda tem que colocar ',
};

export const userData = {
  response_code: '0',
  response_message: 'Token Generated Successfully!',
  token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
};

export const TIME_IN_MILLISECONDS = 200;

export const fetchSimulator = (url) => {
  if (typeof url === 'undefined' || url.endsWith('undefined')) {
    return Promise.reject(new Error('You must provide an url'));
  }
  const validUrl = Object.values(ENDPOINTS).includes(url);
  const status200 = 200;
  const status404 = 404;
  return Promise.resolve({
    status: validUrl ? status200 : status404,
    ok: validUrl,
    json: () => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === ENDPOINTS.USER) {
          return resolve(userData);
        }
        if (url === ENDPOINTS.QUESTIONS) {
          return resolve(search);
        }
        return reject(new Error('Wrong url'));
      }, TIME_IN_MILLISECONDS);
    }),
  });
};

window.fetch = jest.fn(fetchSimulator);
afterEach(jest.clearAllMocks);
