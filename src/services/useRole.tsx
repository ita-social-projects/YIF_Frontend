import { store } from '../store/store';

const useRole = () => {
  const pathToRedirect = () => {
    const { currentRole } = store.getState();
    let path = '';
    switch (currentRole.role) {
      case 'Graduate':
        path = '/cabinet';
        break;
      case 'SuperAdmin':
        path = '/superAdminAccount';
        break;
      case 'InstitutionOfEducationAdmin':
        path = '/institutionOfEducationAccount';
        break;
      case 'InstitutionOfEducationModerator':
        path = '/IoEModeratorAccount';
        break;
    }

    return path;
  };

  return {
    pathToRedirect,
  };
};

export default useRole;
