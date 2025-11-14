const navbar = () => {
  const title = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="left" style="padding: 0;"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 8.75rem; height: 3rem;">
            <tr>
              <td align="left" style="font-size: 0; line-height: 0;"> <img src="https://enegeol2017.wordpress.com/wp-content/uploads/2017/09/logolundinoficial.jpg"
                     alt="logo"
                     width="140"
                     height="48"
                     style="display: block; max-width: 100%; height: auto !important; width: auto !important;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="background-color: #e5e5e5; padding-top: 1rem; padding-bottom: 1rem;">
          <h1 style="margin: 0 auto; font-family: Verdana, Tahoma, sans-serif; font-size: 2.5rem; color: #bd0b21; line-height: 1;">
              Devnet
          </h1>
        </td>
      </tr>
    </table>
  `;
  return title;
};

module.exports = {
  navbar,
};