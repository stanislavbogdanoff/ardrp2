import { useAllUsers } from "../../hooks/useAllUsers";
import Section from "../../components/layout/Section";
import UserCard from "../../components/dashboard/users/UserCard";

const UsersTab = () => {
  // Get all users
  const { allUsers, usersIsFetching } = useAllUsers();

  console.log(allUsers, "all users");
  return (
    <>
      <Section ver>
        {usersIsFetching ? (
          <>Users are loading</>
        ) : (
          <>
            {Array.isArray(allUsers) &&
              allUsers.map((user) => (
                <UserCard key={String(user._id)} user={user} />
              ))}
          </>
        )}
      </Section>
    </>
  );
};

export default UsersTab;
