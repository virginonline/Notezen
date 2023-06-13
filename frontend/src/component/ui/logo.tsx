import Image from 'next/image';
import NotezenLogo from '../../../public/Logo.svg'
export const Logo = () => {
    return (
        <Image src={NotezenLogo} alt={'Notezen'} className='mx-auto h-6 w-6'/>
    )
}