import "./sectionVpn.css";

export function SectionVpn(props) {
  const usersNumber = props && props.usersNumber;
  const usersList = props && props.users;

  return (
    <section className="section-connected">
      <div className="title-container">
        <h1>FW {props.vpnNum}</h1>
        <h3>Número de usuarios: {usersNumber} </h3>
      </div>
      <div className="user-list-container">
        <table className="user-list">
          <thead>
            <tr>
              <th>USUARIO</th>
              <th>IP LAN</th>
              <th>IP ORIGEN</th>
              <th>TIEMPO</th>
            </tr>
            </thead>
            <tbody>
              {usersList && usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.ip_lan}</td>
                  <td>{user.ip_origin}</td>
                  <td>{user.duration} Min</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
