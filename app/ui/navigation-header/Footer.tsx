import Link from "next/link"


export default function Footer() {
    return (
        <footer>
            <div className="bg-[#F9EFE5] px-80">
            <ul>
                <li>
                    <Link href="/">Chi siamo</Link>
                </li>
                <li>
                    <Link href="/">Privacy</Link>
                </li>
                <li>
                    <Link href="/">Link utili</Link>
                </li>
                <li>
                    <Link href="/">Aiuto</Link>
                </li>
            </ul>
            </div>
        </footer>
    )
}