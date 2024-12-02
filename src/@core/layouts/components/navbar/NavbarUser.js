// ** Dropdowns Imports
import { getProfile } from "@core/services/api/header";
import UserDropdown from "./UserDropdown";
import { useQuery } from "@tanstack/react-query";

const NavbarUser = () => {
  const { data:myProfile, isLoading:profileLoading, isError:profileError}= useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  })
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <UserDropdown profileData={myProfile} profileLoading={profileLoading}  />
    </ul>
  );
};
export default NavbarUser;
