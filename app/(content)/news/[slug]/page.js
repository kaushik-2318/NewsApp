import { notFound } from "next/navigation"
import Link from "next/link";
import { getNewsItem } from "@/lib/news";

export default async function NewsDetailPage({ params }) {
    const newsSlug = params.slug;
    const newsitem = await getNewsItem(newsSlug)

    if (!newsitem) {
        notFound();
    }

    return (
        <article className="news-article">
            <header>
                <Link href={`/news/${newsitem.slug}/image`}>
                    <img src={`/images/news/${newsitem.image}`} alt={newsitem.title} />
                </Link>
                <h1>{newsitem.title}</h1>
                <time datetime={newsitem.date}>{newsitem.date}</time>
            </header>
            <p>{newsitem.content}</p>
        </article>
    )
}