import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps { }
const Logo: React.FC<HeaderProps> = () => {
    return (
        <Link href="/" className='flex items-center'>
            <Image
                src="/logos/Logo_light.png"
                alt="Ronminco Logo"
                width={80}
                height={32}
                style={{ width: 'auto', height: '32px', maxHeight: '32px' }}
                quality={100}
                priority={true}
                className='dark:hidden'
            />
            <Image
                src="/logos/Logo_dark.png"
                alt="Ronminco Logo"
                width={80}
                height={32}
                style={{ width: 'auto', height: '32px', maxHeight: '32px' }}
                quality={100}
                priority={true}
                className='dark:block hidden'
            />
        </Link>
    );
};

export default Logo;
