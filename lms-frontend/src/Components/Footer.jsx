import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter} from 'react-icons/bs';

const Footer = () => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return <>
        <footer className='relative left-0 bottom-0 min-h-[8vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20'>
            <section className='text-lg '>
                Copyright {currentYear} | All Rights Reserved.
            </section>
            <section className="flex items-center justify-center gap-5 text-2xl text-white">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsFacebook />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsInstagram />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsLinkedin />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsTwitter />
                </a>
            </section>
        </footer>
    </>
}

export default Footer