import Button from '@/components/ui/button/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FailPage = () => {
  return (
    <div className="flex justify-center items-center px-4 mt-32 mb-40">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 2xl:gap-20 items-center max-w-[1119px] mx-auto text-center">
        <div className="relative">
          <Image src={'/fail.jpg'} width={559} height={559} alt='success' className='size-full aspect-square object-cover' />
        </div>
        <div>
          <h2 className="mb-6 font-medium text-[26px]">ОКАК, что-то пошло не так!</h2>
          <p className="mb-10 text-xs text-add_4">К сожалению, ваша оплата не прошла. Пожалуйста, проверьте данные вашей карты и попробуйте снова. Если проблема не исчезает, вы можете попробовать использовать другую карту или обратиться в службу поддержки для получения помощи. Мы готовы помочь вам завершить покупку!</p>
          <Link href="/checkout" className='text-center block'><Button styled="filled" className="mx-auto">Попробовать еще раз</Button></Link>
        </div>

      </div>
    </div>
  )
}

export default FailPage