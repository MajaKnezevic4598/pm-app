import "./SingleEmployee.scss";
import { MdDeleteForever } from "react-icons/md";

const SingleEmployee = ({
  name,
  setEmployees,
  id,
  employees,
  profilePhoto,
}) => {
  const handleClick = () => {
    const filteredEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(filteredEmployees);
  };
  console.log(profilePhoto);
  return (
    <div className="employee-conteiner">
      <div>{name}</div>
      <img
        src={`https://pm-app-bek.herokuapp.com${profilePhoto}`}
        alt="profilePhoto"
        className="profile-photo"
      />
      <MdDeleteForever onClick={handleClick} />
    </div>
  );
};

export default SingleEmployee;
