// commands


const _cmdBase = 10000;

export const cmdAddUpdatePage               = _cmdBase + 0;
export const cmdOpenGooglePage              = _cmdBase + 1;
export const cmdOpenOraculumPage            = _cmdBase + 2;
export const cmdOpenOraculumSettingsPage    = _cmdBase + 3;
export const cmdGetUserData                 = _cmdBase + 4;
export const cmdGetPagesByUrls              = _cmdBase + 5;
export const cmdGetPageByUrl                = _cmdBase + 6;
export const cmdAddComment                  = _cmdBase + 7;

export const cmdLoginUserWithGoogle         = _cmdBase + 100;
export const cmdLogoutUser                  = _cmdBase + 101;
export const cmdRegisterUser                = _cmdBase + 102;
