import { DUMMY_NEWS } from "@/dummy-news"
import { notFound } from "next/navigation"
import Link from "next/link";

export default function NewsDetailPage({ params }) {
    const newsitem = DUMMY_NEWS.find(newsItem => newsItem.slug === params.slug)

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