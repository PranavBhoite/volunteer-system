import { useParams } from "react-router-dom";
const Profile = () => {
  const {uid} = useParams();

  return <>
    <h1>User ID : ${uid}</h1> 
  </>;
}

export default Profile;