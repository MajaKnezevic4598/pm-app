import "./SingleEmployee.scss";
import { MdDeleteForever } from "react-icons/md";

const SingleEmployee = ({ name, setEmployees, id, employees }) => {
  const handleClick = () => {
    const filteredEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(filteredEmployees);
  };
  return (
    <div className="employee-conteiner">
      <div>{name}</div>
      <MdDeleteForever onClick={handleClick} />
    </div>
  );
};

export default SingleEmployee;
