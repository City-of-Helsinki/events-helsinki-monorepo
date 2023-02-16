import { ClientFunction } from 'testcafe';

const useRoleAndNavigateBack = async (role: Role, t: TestController) => {
  const getCurrentLocation = ClientFunction(() => window.location.href);
  const location = await getCurrentLocation();
  await t
    .useRole(role)
    .navigateTo(location)
    .wait(1000)
    .expect(getCurrentLocation())
    .eql(location);
};

export default useRoleAndNavigateBack;
