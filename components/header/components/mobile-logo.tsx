import Image from "next/image"

const MobileLogo = () => {
    return (
        <div className="flex justify-center lg:hidden text-center fixed top-0 left-0 z-50 w-full bg-white">
            <Image
                src="/logo.svg"
                alt="logotype"
                width={151}
                height={68}
            />
        </div>
    )
}

export default MobileLogo