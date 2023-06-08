import { Button } from "@material-ui/core";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
        <Button>Contact: mymailforabhi@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
