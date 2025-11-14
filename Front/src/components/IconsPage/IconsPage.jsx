import { SiCisco } from "react-icons/si";
import { BiSolidTachometer } from "react-icons/bi";

export const IconsPage = () => {
  return (
    <div className="cisco-prtg-icons">
      <div>
        <SiCisco
          style={{ cursor: "help" }}
          title={"Estado Cisco Prime: OK"}
          size="2rem"
          color="green"
        />
      </div>
      <div>
        <BiSolidTachometer
          style={{ cursor: "help" }}
          title={"Estado PRTG: OK"}
          size="1.7rem"
          color="green"
        />
      </div>
    </div>
  );
};
