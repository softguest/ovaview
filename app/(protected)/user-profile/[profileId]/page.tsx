import ProfileSubjects from "@/components/profilesSubjects/ProfileSubjects";

type Props = {
  params: {
    profileId: string;
  };
};

const UserProfile = ({ params }: Props) => {
  console.log("this is the user id " + params.profileId);
  return ( 
    <div>
        <ProfileSubjects profileId={params.profileId} />
    </div>
   );
}
 
export default UserProfile;