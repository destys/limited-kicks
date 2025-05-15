import Button from "@/components/ui/button/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="flex items-center gap-5">
                <h1>404</h1>
                <div className="h-20 w-[1px] bg-add_2"></div>
                <div className="mb-5">Страница не найдена</div>
                <Link href={'/'}><Button styled="filled">На главную</Button></Link>
            </div>
        </div>
    )
}