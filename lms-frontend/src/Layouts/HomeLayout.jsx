import { FiMenu } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../Components/Footer'
import { logout } from '../Redux/Slices/AuthSlice.js';

const HomeLayout = ({ children }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn)

    const role = useSelector(state => state?.auth?.role)

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side")
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle")
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side")
        drawerSide[0].style.width = '0';
    }

    async function onLogout(e) {
        e.preventDefault();

        const response = await dispatch(logout());
        if(response?.payload?.data)
            navigate("/");
    }

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu size={"32px"} className="font-bold text-white m-4" onClick={changeWidth} />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
                        <li className="w-fit absolute right-4 top-4 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={20} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {
                            isLoggedIn && role === 'admin' && (
                                <li>
                                    <Link to="/admin/dashboard"> Admin Dashboard </Link>
                                </li>
                            )
                        }

                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/courses"> All courses </Link>
                        </li>

                        {!isLoggedIn ? (
                            <li className='absolute bottom-4 w-[90%]'>
                                <div className='w-full gap-2 flex items-center justify-center'>
                                    <Link to="/login" className='btn btn-primary px-4 py-1 font-semibold rounded-md w-1/2'>Login</Link>
                                    <Link to="/signup" className='btn btn-secondary px-4 py-1 font-semibold rounded-md w-1/2'>Signup</Link>
                                </div>
                            </li>
                        ) : (
                            <li className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center">
                                    <Link to="/user/profile" className="btn-primary px-4 py-1 font-semibold rounded-md w-full">Profile</Link>
                                    <Link onClick={onLogout} className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">Logout</Link>
                                </div>
                            </li>
                        )
                        }
                    </ul>
                </div>
            </div>

            {children}

            <Footer />
        </div>
    )
}

export default HomeLayout