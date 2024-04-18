import React from 'react'
import Input from '../ui/input/input'
import Button from '../ui/button/button'

type Props = {}

const Promocode = (props: Props) => {
    return (
        <form className='flex gap-2 w-full items-end mb-8'>
            <div className="flex-auto">
                <Input type="text" name='promocode' label="Промокод" placeholder="Введите промокод" />
            </div>
            <Button type="submit" styled="filled">Применить</Button>
        </form>
    )
}

export default Promocode