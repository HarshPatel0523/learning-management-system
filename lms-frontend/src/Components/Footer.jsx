import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='relative left-0 bottom-0 w-full min-h-[8vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20 px-4'>
            <small className='text-lg'>&copy; {currentYear} | All Rights Reserved.</small>
            <div className="flex items-center justify-center gap-5 text-2xl text-white mt-4 sm:mt-0">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsFacebook />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsInstagram />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsLinkedin />
                </a>
                <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsTwitter />
                </a>
            </div>
        </footer>
    );
};

export default Footer;