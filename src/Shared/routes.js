import R from 'ramda';

export const COMPONENT_NAMES = {
  /*DASHBOARD_AREA: 'DashboardArea',*/
    JOURNEYS_AREA: 'JourneysArea',
  PAGES_AREA: 'PagesArea',
  ALL_PAGES_AREA: 'AllPagesArea',
  PAGE_AREA: 'PageArea',
  ACCOUNT_AREA: 'AccountArea',
  /*SEGMENTS_AREA: 'SegmentsArea',*/
  //INSIGHTS_AREA: 'InsightsArea',
  /*ADMIN_AREA: 'AdminArea',
  JOURNEY_BUILDER_AREA: 'JourneyBuilderArea',
  COMMUNICATION_AREA: 'CommunicationArea',*/
};

export const ROUTES_LIST = [
/*  {
    exact: true,
    path: '/',
    componentName: COMPONENT_NAMES.DASHBOARD_AREA,
  },
  {
    exact: false,
    path: '/journey',
    componentName: COMPONENT_NAMES.JOURNEYS_AREA,
  },*/
  {
    exact: true,
    path: '/',
    componentName: COMPONENT_NAMES.PAGES_AREA,
  },
  {
    exact: true,
    path: '/allpages',
    componentName: COMPONENT_NAMES.ALL_PAGES_AREA,
  },
  {
    exact: false,
    path: '/page/:id',
    componentName: COMPONENT_NAMES.PAGE_AREA,
  },
  {
    exact: true,
    path: '/account',
    componentName: COMPONENT_NAMES.ACCOUNT_AREA,
  },
  /*{
    exact: false,
    path: '/communication',
    componentName: COMPONENT_NAMES.COMMUNICATION_AREA,
  },*/
  /*{
    exact: false,
    path: '/',
    componentName: COMPONENT_NAMES.INSIGHTS_AREA,
  },*/
];

/*export const JOURNEY_BUILDER_ROUTE = {
  exact: false,
  path: '/journeybuilder/:activityType/',
  componentName: COMPONENT_NAMES.JOURNEY_BUILDER_AREA,
};

export const ADMIN_ROUTE = {
  exact: false,
  path: '/admin',
  componentName: COMPONENT_NAMES.ADMIN_AREA,
};

export const ADMIN_SUB_ROUTES = {
  TOPICS: 'topics',
  BENCHMARKS: 'benchmarks',
  CONSENT_DEFAULTS: 'consent',
  PREFERENCE_CENTER: 'preference-center',
  FTP_CONFIG: 'ftp-config',
  FILE_LAYOUT: 'file-layout',
};*/

// returns array of options to initialize root router in Root.js
export const getRoutes = () => {
  let routes = ROUTES_LIST.slice();
  return routes.map(route => R.pick(['exact', 'path', 'componentName'], route));
};
