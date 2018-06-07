import {APP_CONSTANTS} from '../app-constants';
export const API_ROOT = APP_CONSTANTS.apiRoot;
const BASE_URL = `${API_ROOT}/oraculum`;

export const createOrUpdatePage = (data) => (graphQLMutation("createOrUpdatePage", "PageInput", data, `url tags comments { content author { name, picture } }`));
export const registerGoogleUser = (data) => (graphQLMutation("registerGoogleUser", "UserInput", data, `_id googleId email name picture`));
export const updateUser = (data) => (graphQLMutation("updateUser", "UpdateUserInput", data, `_id googleId email name picture`));
export const registerUser = (data) => (graphQLMutation("registerUser", "RegistrationInput", data, `token user { _id googleId email name }`));
export const loginUser = (data) => (graphQLMutation("loginUser", "LoginInput", data, `token user { _id googleId email name }`));
export const createComment = (data) => (graphQLMutation("createComment", "CommentInput", data, `_id content author { name, picture }`));
export const getPagesByUrls = (urls) => (graphQLQueryWithParams("pages", `_id url title author { _id picture name } comments { author { _id picture name } }`, 'urls', '[String]', urls));
export const getPageByUrl = (url) => (graphQLQueryWithParams("pageByUrl", `_id url title author { _id picture name } comments`, 'url', 'String', url));
export const getMyPages = (authorId) => (graphQLQueryWithParams("getMyPages", `_id url title author { _id picture name email }`, 'authorId', 'String', authorId));
export const getAllPages = () => (graphQLQuery("getAllPages", `_id url title author { _id picture name email }`));
export const getUser = userId => (graphQLQueryWithParams("user", `_id googleId email name picture`, '_id', 'String', userId));
export const getUserByGoogleId = googleId => (graphQLQueryWithParams("getUserByGoogleId", `_id googleId email name picture`, 'googleId', 'String', googleId));


function apiHttp(method, url, data) {
  return new Promise(function (resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        return resolve(this.response);
      }
    };

    xhttp.onerror = function () {
      console.log("** An error occurred during the transaction");
      return reject({
        error: "error"
      });
    };

    xhttp.responseType = 'json';
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Accept", "application/json");

    xhttp.send(data);
  });
}

function graphQLMutation(mutationName, mutationInput, data, mutationResult) {
  return apiHttp("POST", BASE_URL, JSON.stringify({
    query: `
            mutation ${mutationName}($input: ${mutationInput}) {
              ${mutationName}(input: $input) {
                _id
                ${mutationResult}
              }
            }`,
    variables: {
      input: data
    }
  })).then(response => ({
    data: response.data[mutationName],
    errors: response.errors
  }));
}

function graphQLQuery(queryName, queryResult) {
  return apiHttp("POST", BASE_URL, JSON.stringify({
    query: `
            query {
                ${queryName} {
                    ${queryResult}
                }
            }`,
    variables: {}
  })).then(response => {
    return response.data[queryName]
  });
}

function graphQLQueryWithParams(queryName, queryResult, inputName, inputType, data) {
  return apiHttp("POST", BASE_URL, JSON.stringify({
    query: `
            query ($data: ${inputType}){
                ${queryName} (data: $data){
                    ${queryResult}
                }
            }`,
    variables: {
      data: data
    }
  })).then(response => {
    return response.data[queryName]
  });
}
