//import { isUserAdmin } from './roles';

const windowWithoutUser = {
  App: {},
};

const windowWithUser = {
  App: {
    user: {
      isAdmin: true,
    },
  },
};

const windowWithUserNoAdmin = {
  App: {
    user: {
      isAdmin: false,
    },
  },
};

const windowWithStorageAndUserAdmin = {
  App: {},
  sessionStorage: {
    getItem: () => '{"isAdmin": true}',
  },
};

const windowWithStorageAndUserNoAdmin = {
  App: {},
  sessionStorage: {
    getItem: () => '{"isAdmin": false}',
  },
};

const windowWithoutStorage = {
  App: {},
};

/*describe('isUserAdmin util', () => {
  it('should handle production env', () => {
    const NODE_ENV = 'production';

    expect(isUserAdmin(NODE_ENV, windowWithoutUser)).toBe(false);
    expect(isUserAdmin(NODE_ENV, windowWithUser)).toBe(true);
    expect(isUserAdmin(NODE_ENV, windowWithUserNoAdmin)).toBe(false);
  });

  it('should handle dev with window user', () => {
    const NODE_ENV = 'dev';

    expect(isUserAdmin(NODE_ENV, windowWithUser)).toBe(true);
    expect(isUserAdmin(NODE_ENV, windowWithUserNoAdmin)).toBe(false);
  });

  it('should handle dev without window user', () => {
    const NODE_ENV = 'dev';

    expect(isUserAdmin(NODE_ENV, windowWithStorageAndUserAdmin)).toBe(true);
    expect(isUserAdmin(NODE_ENV, windowWithStorageAndUserNoAdmin)).toBe(false);
  });

  it('should handle dev env without sessionStorage', () => {
    const NODE_ENV = 'dev';

    expect(isUserAdmin(NODE_ENV, windowWithoutStorage)).toBe(false);
  });
});*/
