import DeleteForm from "./forms/DeleteForm";
import UserForm from "./forms/UserForm";
import FormPage from "../pages/FormPage";
import Button from "react-bootstrap/esm/Button";
import { deleteUser } from "../firebaseUtils";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate()

  if (localStorage["flaskUser"]) {
    return (
      <div class="flask-settings">
        <FormPage>
            <UserForm edit={true} />
            <DeleteForm />
        </FormPage>
      </div>
    );
  }
  else {
    return (
        <div className="delete-acc-btn">
            <h2>Delete Account</h2>
            <Button variant="danger" size="lg" onClick={() => deleteUser().then(() => {navigate('/logout')})}>Delete Account</Button>
        </div>
    )
  }
};

export default Settings;
