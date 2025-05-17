import Button from "@/components/ui/button/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center gap-8 h-[60vh]">
            <div className="flex items-center gap-5">
                <h1>404</h1>
                <div className="h-20 w-[1px] bg-add_2"></div>
                <div>Страница не найдена</div>
            </div>
            <Link href={'/'}><Button styled="filled">На главную</Button></Link>
        </div>
    )
}