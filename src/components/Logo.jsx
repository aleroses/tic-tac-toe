import logo from "../assets/logo.png";

export const Logo = () => {
  return (
    <div className="logo-wrapper">
      <img className="logo" src={logo} alt="Tic Tac Toe Logo" loading="eager" />
    </div>
  );
};
