// Create mock response for testing
export const makeMockResponse = (
  response,
  status = 200,
  statusText = 'OK',
  headers = { 'Content-Type': 'application/json' }
) => {
  const init = {
    status,
    statusText,
    headers,
  };
  return new window.Response(JSON.stringify(response), init);
};

export const jsonParseError = () => {
  try {
    JSON.parse('+data+');
  } catch (err) {
    return err;
  }
};

export const makeFakeError = (
  response = null,
  status = 400,
  statusText = 'Bad Request'
) => {
  const error = new Error('Error');
  error.response = makeMockResponse(response, status, statusText);
  return error;
};
