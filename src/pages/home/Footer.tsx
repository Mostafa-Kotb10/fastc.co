import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="section-container py-3 flex justify-between text-sm ">
        <div>© 2025 FastAf. All rights reserved</div>
        <div className="flex space-x-2 divide-black divide-x">
          <div className="space-x-2 px-2">
            <Link to={"/sign-up"}>Sign up</Link>
            <Link to={"/sign-up"}>Sign in</Link>
          </div>
          <span>Privacy Policy Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
