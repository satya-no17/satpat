import React from 'react'
import { Button } from './button'
import  Image  from 'next/image';

const Navbar = () => {
  return (<>
    {/* <div className=''>
      <div className='flex items-center'>
        <Image className='' src={'/logo.svg'} alt="logo" width={40} height={40} />
        <h2 className='pl-2 pr-2'>SatPat Build</h2>
      </div>
      <div className='hidden sm:flex items-center '>
        {menuOption.map((menu, index) => (
          <Button className='ml-2' variant={'secondary'} key={index}>{menu.name}</Button>
        ))}
      </div>
      <div>{!UserDetail?( <SignInButton mode='modal' forceRedirectUrl='/workspace'>
          <Link href={'/workspace'}>
            <Button className='hidden sm:inline-flex' size='lg'>Build Now<ArrowRight /></Button>
          </Link>
        </SignInButton>):
        (
 <Link href={'/workspace'}>
            <Button className='hidden sm:inline-flex' size='lg'>Build Now<ArrowRight /></Button>
          </Link>
        )}
      </div>
    </div> */}




    <div className='flex items-center p-3 shadow justify-between'>
        <div>
       <Image className='' src={'/logo.svg'} alt="logo" width={40} height={40}/>
        </div>
        <div>
            <ul className='flex justify-evenly'>
                <li>about</li>
                <li>pricing</li>
                <li></li>
            </ul>
        </div>
        <div>
            <Button>Log in</Button>
            <Button>Get started</Button>
        </div>
    </div></>
  )
}

export default Navbar
