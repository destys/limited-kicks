import Button from '@/components/ui/button/button'
import Link from 'next/link'
import React from 'react'

const FailPage = () => {
  return (
    <div className="flex justify-center items-center px-4 mt-32 mb-40">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="mb-4">Ошибка при оплате заказа!</h1>
        <p className="mb-10">Повторите попытку или свяжитесь с нами</p>
        <Link href="/"><Button styled="filled" className="w-full">Вернуться к оформлению заказа</Button></Link>
      </div>
    </div>
  )
}

export default FailPage