import { Link, useLocation, useNavigate } from "react-router-dom";
import Image from "./Image";
import Logo from "/logo.svg";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const GNB = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user);

  const menus = [
    {
      label: "매출관리",
      path: "/sales",
    },
    {
      label: "매장관리",
      path: "/manage",
    },
  ];

  return (
    <nav className="border-b border-gray-300">
      <div className="w-[1280px] mx-auto flex justify-between items-center px-4 bg-white">
        <section className="flex items-center gap-12">
          <Link to="/">
            <Image src={Logo} alt="뽀득뽀득 사장님 페이지 로고" />
          </Link>

          <ul className="flex">
            {menus.map((menu, index) => {
              return (
                <Link key={index} to={menu.path}>
                  <li
                    className={`${
                      location.pathname === menu.path &&
                      "border-b-8 border-primary text-primary"
                    } text-xl p-8`}>
                    {menu.label}
                  </li>
                </Link>
              );
            })}
          </ul>
        </section>

        <section className="flex gap-6">
          <div className="text-right">
            <div className="text-xl">{userName} 사장님</div>
            <Button
              className="text-gray-500"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}>
              로그아웃
            </Button>
          </div>
          <Button
            style="cta"
            onClick={() => {
              navigate("/register");
            }}>
            입점하기
          </Button>
        </section>
      </div>
    </nav>
  );
};

export default GNB;
