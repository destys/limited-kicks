import Button from '@/components/ui/button/button'
import Link from 'next/link'
import React from 'react'

const SuccessPage = () => {
  return (
    <div className="flex justify-center items-center px-4 mt-32 mb-40">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="mb-4">Ваш заказ принят!</h1>
        <p className="mb-10">Наши менеджеры свяжутся с вами в ближайшее время</p>
        <Link href="/"><Button styled="filled" className="w-full">На главную</Button></Link>
      </div>
    </div>
  )
}

export default SuccessPage