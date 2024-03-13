const { getJestProjects } = require('@nx/jest');

export default {
  projects: getJestProjects(),
  coverageDirectory: '../../coverage/apps',
};
